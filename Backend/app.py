from pathlib import Path
import pickle

import sqlite3
from datetime import datetime
# pyrefly: ignore [missing-import]
from fastapi import FastAPI, HTTPException
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent

try:
    with open(BASE_DIR / "model.pkl", "rb") as model_file:
        model = pickle.load(model_file)

    with open(BASE_DIR / "scaler.pkl", "rb") as scaler_file:
        scaler = pickle.load(scaler_file)
except FileNotFoundError as exc:
    raise RuntimeError("model.pkl or scaler.pkl was not found in the backend folder.") from exc
except Exception as exc:
    raise RuntimeError(f"Failed to load model or scaler: {exc}") from exc

app = FastAPI(title="Diabetes Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = BASE_DIR / "database.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            pregnancies INTEGER,
            glucose REAL,
            blood_pressure REAL,
            skin_thickness REAL,
            insulin REAL,
            bmi REAL,
            diabetes_pedigree_function REAL,
            age INTEGER,
            prediction INTEGER,
            prediction_probability REAL
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS activity (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            action TEXT,
            details TEXT
        )
    ''')
    
    conn.commit()
    conn.close()

init_db()

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    SkinThickness: float
    Insulin: float
    BMI: float
    DiabetesPedigreeFunction: float
    Age: int


@app.get("/")
def home():
    return {"message": "Diabetes prediction API is running"}


@app.post("/predict")
def predict_diabetes(data: DiabetesInput):
    try:
        feature_order = [
            data.Pregnancies,
            data.Glucose,
            data.BloodPressure,
            data.SkinThickness,
            data.Insulin,
            data.BMI,
            data.DiabetesPedigreeFunction,
            data.Age,
        ]

        scaled_features = scaler.transform([feature_order])
        prediction = model.predict(scaled_features)[0]
        probabilities = model.predict_proba(scaled_features)[0]

        pred_val = int(prediction)
        prob_val = float(probabilities[1]) if len(probabilities) > 1 else float(probabilities[0])
        timestamp = datetime.utcnow().isoformat()
        
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            
            cursor.execute('''
                INSERT INTO history (
                    timestamp, pregnancies, glucose, blood_pressure, skin_thickness,
                    insulin, bmi, diabetes_pedigree_function, age,
                    prediction, prediction_probability
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                timestamp, data.Pregnancies, data.Glucose, data.BloodPressure,
                data.SkinThickness, data.Insulin, data.BMI, data.DiabetesPedigreeFunction,
                data.Age, pred_val, prob_val
            ))
            
            cursor.execute('''
                INSERT INTO activity (timestamp, action, details)
                VALUES (?, ?, ?)
            ''', (
                timestamp,
                "Prediction Request",
                f"Generated prediction: {pred_val} (Prob: {prob_val:.2f})"
            ))
            
            conn.commit()
        except Exception as e:
            print(f"Database logging failed: {e}")
        finally:
            if 'conn' in locals():
                conn.close()

        return {
            "prediction": int(prediction),
            "prediction_probability": float(probabilities[1]) if len(probabilities) > 1 else float(probabilities[0]),
            "class_probabilities": {
                "0": float(probabilities[0]),
                "1": float(probabilities[1]) if len(probabilities) > 1 else 0.0,
            },
        }
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {exc}",
        ) from exc


@app.get("/history")
def get_history():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM history ORDER BY id DESC LIMIT 50")
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.get("/activity")
def get_activity():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM activity ORDER BY id DESC LIMIT 50")
        rows = cursor.fetchall()
        conn.close()
        return [dict(row) for row in rows]
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
