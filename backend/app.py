from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
import os


# ============================================
# FastAPI Application
# ============================================

app = FastAPI(
    title="Customer Churn Prediction API",
    description="Machine Learning API for predicting telecom customer churn.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# Load trained model
# ============================================

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "saved_model",
    "churn_logistic_regression.pkl"
)

model = joblib.load(MODEL_PATH)


# ============================================
# Input Schema
# ============================================

class CustomerData(BaseModel):

    SeniorCitizen: int
    tenure: int
    MonthlyCharges: float
    TotalCharges: float

    gender: str
    Partner: str
    Dependents: str
    PhoneService: str
    MultipleLines: str
    InternetService: str
    OnlineSecurity: str
    OnlineBackup: str
    DeviceProtection: str
    TechSupport: str
    StreamingTV: str
    StreamingMovies: str
    Contract: str
    PaperlessBilling: str
    PaymentMethod: str


# ============================================
# Root Endpoint
# ============================================

@app.get("/")
def home():

    return {
        "message": "Customer Churn Prediction API",
        "status": "running"
    }


# ============================================
# Prediction Endpoint
# ============================================

@app.post("/predict")
def predict_churn(customer: CustomerData):

    customer_data = customer.model_dump()

    input_data = pd.DataFrame([customer_data])

    prediction = model.predict(input_data)[0]

    probability = model.predict_proba(input_data)[0][1]

    return {
        "prediction": int(prediction),
        "churn_prediction": "Yes" if prediction == 1 else "No",
        "churn_probability": round(float(probability), 4)
    }