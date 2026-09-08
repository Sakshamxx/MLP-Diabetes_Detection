export interface PredictionInput {
  Pregnancies: number;
  Glucose: number;
  BloodPressure: number;
  SkinThickness: number;
  Insulin: number;
  BMI: number;
  DiabetesPedigreeFunction: number;
  Age: number;
}

export interface PredictionResponse {
  prediction: number;
  prediction_probability: number;
  class_probabilities: {
    "0": number;
    "1": number;
  };
}

export interface HistoryItem {
  id: number;
  timestamp: string;
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree_function: number;
  age: number;
  prediction: number;
  prediction_probability: number;
}

export interface ActivityItem {
  id: number;
  timestamp: string;
  action: string;
  details: string;
}

export interface ApiError {
  detail: string;
}
