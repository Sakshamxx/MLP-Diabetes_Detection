<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFFFFF,100:E5383B&height=200&section=header&text=Diabetes%20Detector&fontSize=54&fontColor=1A1A1A&fontAlignY=38&animation=fadeIn&desc=MLP-Based%20Diabetes%20Prediction%20System&descAlignY=58&descColor=E5383B&descSize=18" width="100%"/>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=E5383B&center=true&vCenter=true&width=560&lines=Neural+Network+Inference+on+Tabular+Health+Data;StandardScaler+%2B+MLPClassifier+%2B+FastAPI;Educational+%2F+Research+Project" alt="Typing SVG" />

<br/>

<img src="https://img.shields.io/badge/Model-MLPClassifier-E5383B?style=for-the-badge&labelColor=FFFFFF&color=E5383B"/>
<img src="https://img.shields.io/badge/Test%20Accuracy-86.36%25-E5383B?style=for-the-badge&labelColor=FFFFFF&color=E5383B"/>
<img src="https://img.shields.io/badge/Backend-FastAPI-E5383B?style=for-the-badge&labelColor=FFFFFF&color=E5383B"/>
<img src="https://img.shields.io/badge/Frontend-React%20%2B%20Vite-E5383B?style=for-the-badge&labelColor=FFFFFF&color=E5383B"/>

<br/><br/>

<a href="https://frontendmlp.vercel.app/">
  <img src="https://img.shields.io/badge/Live%20Demo-frontendmlp.vercel.app-1A1A1A?style=for-the-badge&logo=vercel&logoColor=E5383B&labelColor=FFFFFF"/>
</a>
&nbsp;
<a href="https://github.com/Sakshamxx/MLP-Diabetes_Detection">
  <img src="https://img.shields.io/badge/Repository-GitHub-1A1A1A?style=for-the-badge&logo=github&logoColor=E5383B&labelColor=FFFFFF"/>
</a>

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:FFFFFF,100:E5383B&height=2&width=1000"/>

<div align="center">

## Interface Preview

<img src="Frontend/src/assets/preview.png" width="85%" style="border-radius:14px; border:1px solid #E5383B;"/>

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:FFFFFF,100:E5383B&height=2&width=1000"/>

<div align="center">

## Tech Stack

<div align="center">
<img src="https://img.shields.io/badge/Python-141414?style=for-the-badge&logo=python&logoColor=3776AB&labelColor=000000"/>
<img src="https://img.shields.io/badge/Scikit--learn-141414?style=for-the-badge&logo=scikitlearn&logoColor=F7931E&labelColor=000000"/>
<img src="https://img.shields.io/badge/FastAPI-141414?style=for-the-badge&logo=fastapi&logoColor=009688&labelColor=000000"/>
<img src="https://img.shields.io/badge/Uvicorn-141414?style=for-the-badge&logo=gunicorn&logoColor=E5383B&labelColor=000000"/>
<img src="https://img.shields.io/badge/Pydantic-141414?style=for-the-badge&logo=pydantic&logoColor=E92063&labelColor=000000"/>
<img src="https://img.shields.io/badge/React-141414?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=000000"/>
<img src="https://img.shields.io/badge/TypeScript-141414?style=for-the-badge&logo=typescript&logoColor=3178C6&labelColor=000000"/>
<img src="https://img.shields.io/badge/Vite-141414?style=for-the-badge&logo=vite&logoColor=646CFF&labelColor=000000"/>
<img src="https://img.shields.io/badge/npm-141414?style=for-the-badge&logo=npm&logoColor=CB3837&labelColor=000000"/>
<img src="https://img.shields.io/badge/Git-141414?style=for-the-badge&logo=git&logoColor=F05032&labelColor=000000"/>
<img src="https://img.shields.io/badge/GitHub-141414?style=for-the-badge&logo=github&logoColor=FFFFFF&labelColor=000000"/>
<img src="https://img.shields.io/badge/Vercel-141414?style=for-the-badge&logo=vercel&logoColor=FFFFFF&labelColor=000000"/>
</div>

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:FFFFFF,100:E5383B&height=2&width=1000"/>

<div align="center">

## Pipeline & Architecture

<table>
<tr><td align="center" style="background-color:#1A1A1A; color:#FFFFFF; padding:14px 28px; border-radius:10px; font-weight:600;">User Input <sub>(React + Vite)</sub></td></tr>
<tr><td align="center" style="color:#E5383B; font-size:20px;">↓</td></tr>
<tr><td align="center" style="background-color:#E5383B; color:#FFFFFF; padding:14px 28px; border-radius:10px; font-weight:600;">FastAPI Backend</td></tr>
<tr><td align="center" style="color:#E5383B; font-size:20px;">↓</td></tr>
<tr><td align="center" style="background-color:#1A1A1A; color:#FFFFFF; padding:14px 28px; border-radius:10px; font-weight:600;">StandardScaler <sub>(fit on X_train)</sub></td></tr>
<tr><td align="center" style="color:#E5383B; font-size:20px;">↓</td></tr>
<tr><td align="center" style="background-color:#E5383B; color:#FFFFFF; padding:14px 28px; border-radius:10px; font-weight:600;">MLPClassifier <sub>16 neurons · ReLU · Adam</sub></td></tr>
<tr><td align="center" style="color:#E5383B; font-size:20px;">↓</td></tr>
<tr><td align="center" style="background-color:#1A1A1A; color:#FFFFFF; padding:14px 28px; border-radius:10px; font-weight:600;">Prediction <sub>Diabetic / Non-diabetic</sub></td></tr>
</table>

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:FFFFFF,100:E5383B&height=2&width=1000"/>

<div align="center">

## Installation

</div>

```bash
git clone https://github.com/Sakshamxx/MLP-Diabetes_Detection.git
cd MLP-Diabetes_Detection

# Backend
cd Backend && python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload

# Frontend (new terminal)
cd Frontend && npm install && npm run dev
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=0:FFFFFF,100:E5383B&height=2&width=1000"/>

<div align="center">

## Author

<img src="https://github.com/Sakshamxx.png" width="80" style="border-radius:50%; border:2px solid #E5383B;"/>

**Saksham Chauhan**

[![GitHub](https://img.shields.io/badge/GitHub-Sakshamxx-1A1A1A?style=for-the-badge&logo=github&logoColor=E5383B&labelColor=FFFFFF)](https://github.com/Sakshamxx)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Saksham%20Chauhan-1A1A1A?style=for-the-badge&logo=linkedin&logoColor=E5383B&labelColor=FFFFFF)](https://www.linkedin.com/in/saksham-chauhan-b18bb5277/)
[![Gmail](https://img.shields.io/badge/Email-sakshamchauhan003%40gmail.com-1A1A1A?style=for-the-badge&logo=gmail&logoColor=E5383B&labelColor=FFFFFF)](mailto:sakshamchauhan003@gmail.com)

</div>

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:FFFFFF,100:E5383B&height=120&section=footer" width="100%"/>
</div>
