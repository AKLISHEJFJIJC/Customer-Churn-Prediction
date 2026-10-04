# Customer Churn Prediction

An end-to-end Machine Learning project for predicting whether a telecom customer is likely to churn. The project covers data preprocessing, exploratory analysis, model training, cross-validation, hyperparameter tuning, model interpretation, model persistence, and deployment through a FastAPI REST API.

## 🚀 Project Overview

Customer churn prediction helps organizations identify customers who may discontinue their services.

This project builds and evaluates multiple classification models and deploys a trained Logistic Regression pipeline through a REST API.

The API accepts customer information and returns:

* Churn prediction
* Churn probability

### Example

```json
{
  "prediction": 1,
  "churn_prediction": "Yes",
  "churn_probability": 0.8978
}
```

For this example, the model predicted **Yes**, with an estimated churn probability of **89.78%**.

---

## 🎯 Objectives

* Analyze customer churn patterns
* Prepare numerical and categorical features for machine learning
* Train multiple classification models
* Compare model performance using several evaluation metrics
* Apply cross-validation
* Perform hyperparameter tuning
* Interpret important model features
* Save trained ML pipelines
* Build a production-style prediction API using FastAPI

---

## 🧠 Machine Learning Workflow

```text
Raw Customer Data
        ↓
Data Preprocessing
        ↓
Feature Engineering
        ↓
Train/Test Split
        ↓
Multiple ML Models
        ↓
Cross-Validation
        ↓
Hyperparameter Tuning
        ↓
Model Evaluation
        ↓
Model Interpretation
        ↓
Model Serialization
        ↓
FastAPI Deployment
        ↓
REST API Prediction
```

---

## 🛠️ Technologies Used

### Programming

* Python
* Pandas
* NumPy

### Machine Learning

* Scikit-learn
* XGBoost
* Logistic Regression
* Decision Tree
* Random Forest
* Support Vector Machine

### Data Processing

* StandardScaler
* OneHotEncoder
* ColumnTransformer
* Pipeline

### Model Evaluation

* Accuracy
* Precision
* Recall
* F1-Score
* ROC-AUC
* Confusion Matrix
* Stratified K-Fold Cross-Validation

### Deployment

* FastAPI
* Uvicorn
* Pydantic
* Joblib

### Development

* Jupyter Notebook
* VS Code
* Git/GitHub

---

## 📊 Models Evaluated

The following classification models were evaluated:

1. Logistic Regression
2. Decision Tree
3. Random Forest
4. XGBoost
5. Support Vector Machine

The evaluation focused on multiple metrics rather than relying only on accuracy.

---

## 📈 Baseline Model Results

| Model               | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
| ------------------- | -------: | --------: | -----: | -------: | ------: |
| Logistic Regression |   0.8055 |    0.6572 | 0.5588 |   0.6040 |  0.8421 |
| XGBoost             |   0.8006 |    0.6535 | 0.5294 |   0.5849 |  0.8439 |
| SVM                 |   0.7913 |    0.6418 | 0.4840 |   0.5518 |  0.7902 |
| Random Forest       |   0.7835 |    0.6186 | 0.4813 |   0.5414 |  0.8206 |
| Decision Tree       |   0.7211 |    0.4755 | 0.4920 |   0.4836 |  0.6477 |

---

## 🔄 Cross-Validation

Stratified 5-Fold Cross-Validation was used to evaluate model stability.

| Model               | CV Accuracy | CV Precision | CV Recall |  CV F1 | CV ROC-AUC |
| ------------------- | ----------: | -----------: | --------: | -----: | ---------: |
| Logistic Regression |      0.8021 |       0.6529 |    0.5431 | 0.5923 |     0.8462 |
| Decision Tree       |      0.7267 |       0.4855 |    0.4970 | 0.4909 |     0.6534 |
| Random Forest       |      0.7838 |       0.6222 |    0.4736 | 0.5374 |     0.8199 |
| XGBoost             |      0.8044 |       0.6660 |    0.5291 | 0.5894 |     0.8470 |
| SVM                 |      0.8035 |       0.6772 |    0.4977 | 0.5735 |     0.7998 |

---

## ⚙️ Hyperparameter Tuning

### Logistic Regression

Grid search was performed over:

* Regularization strength (`C`)
* Solver
* Class weighting

Best configuration:

```text
C = 0.1
solver = liblinear
class_weight = balanced
```

Best cross-validation F1-score:

```text
0.6295
```

The class-weighted configuration increased recall, resulting in a different precision/recall trade-off compared with the baseline model.

### XGBoost

Hyperparameter tuning included:

* Number of estimators
* Maximum tree depth
* Learning rate
* Subsampling
* Column subsampling

Best configuration:

```text
n_estimators = 200
max_depth = 3
learning_rate = 0.05
subsample = 0.8
colsample_bytree = 1.0
```

Best cross-validation F1-score:

```text
0.5927
```

---

## 🏁 Tuned Model Results

| Model                     |   Accuracy |  Precision |     Recall |   F1-Score |    ROC-AUC |
| ------------------------- | ---------: | ---------: | ---------: | ---------: | ---------: |
| Tuned Logistic Regression |     0.7410 |     0.5078 | **0.7861** | **0.6170** |     0.8410 |
| Tuned XGBoost             | **0.8020** | **0.6610** |     0.5214 |     0.5830 | **0.8456** |

The models demonstrate different precision/recall trade-offs.

The tuned Logistic Regression model identifies a larger proportion of actual churn cases, while the tuned XGBoost model provides higher accuracy and precision on the held-out test set.

The appropriate model can therefore depend on the business objective and the relative cost of false positives versus false negatives.

---

## 🔍 Model Interpretation

Feature coefficients from the tuned Logistic Regression model were examined to understand which transformed features were most strongly associated with the model's predictions.

Some of the strongest coefficients included:

| Feature                          | Coefficient |
| -------------------------------- | ----------: |
| tenure                           |     -0.9803 |
| Contract — Two year              |     -0.6923 |
| Contract — Month-to-month        |     +0.6295 |
| InternetService — DSL            |     -0.3580 |
| InternetService — Fiber optic    |     +0.3311 |
| TotalCharges                     |     +0.2931 |
| PaymentMethod — Electronic check |     +0.2476 |
| OnlineSecurity — Yes             |     -0.2311 |
| TechSupport — Yes                |     -0.1990 |
| MonthlyCharges                   |     +0.1349 |

These coefficients describe associations learned by the model and should not be interpreted as causal effects.

---

## 🌐 FastAPI Deployment

The trained Logistic Regression pipeline was saved using Joblib and exposed through a FastAPI REST API.

### API Endpoint

```text
POST /predict
```

### Input

The API accepts customer information including:

* SeniorCitizen
* tenure
* MonthlyCharges
* TotalCharges
* Contract
* InternetService
* PaymentMethod
* TechSupport
* OnlineSecurity
* and other customer service attributes

### Example Request

```json
{
  "SeniorCitizen": 0,
  "tenure": 2,
  "MonthlyCharges": 70.0,
  "TotalCharges": 140.0,
  "gender": "Female",
  "Partner": "No",
  "Dependents": "No",
  "PhoneService": "Yes",
  "MultipleLines": "No",
  "InternetService": "Fiber optic",
  "OnlineSecurity": "No",
  "OnlineBackup": "No",
  "DeviceProtection": "No",
  "TechSupport": "No",
  "StreamingTV": "Yes",
  "StreamingMovies": "Yes",
  "Contract": "Month-to-month",
  "PaperlessBilling": "Yes",
  "PaymentMethod": "Electronic check"
}
```

### Example Response

```json
{
  "prediction": 1,
  "churn_prediction": "Yes",
  "churn_probability": 0.8978
}
```

---

## 📚 API Documentation

After starting the FastAPI server, interactive Swagger documentation is available at:

```text
http://127.0.0.1:8000/docs
```

The Swagger interface can be used to test the `/predict` endpoint directly from the browser.

---

## 📁 Project Structure

```text
Customer-Churn-Prediction/
│
├── README.md
│
└── notebooks/
    │
    ├── Customer_Churn_Prediction.ipynb
    ├── requirements.txt
    │
    ├── saved_model/
    │   ├── churn_logistic_regression.pkl
    │   └── churn_xgboost.pkl
    │
    └── backend/
        └── app.py
```

---

## ▶️ How to Run

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Customer-Churn-Prediction
```

### 2. Install dependencies

```bash
pip install -r notebooks/requirements.txt
```

### 3. Start the FastAPI server

```bash
cd notebooks
uvicorn backend.app:app --reload
```

### 4. Open Swagger

Visit:

```text
http://127.0.0.1:8000/docs
```

### 5. Test the prediction endpoint

Open:

```text
POST /predict
```

Click **Try it out**, enter customer information, and execute the request.

---

## 🔮 Future Improvements

Possible future extensions include:

* Interactive web frontend
* Customer risk dashboard
* Probability-based churn risk categories
* SHAP-based model explanations
* Automated model monitoring
* Docker containerization
* Cloud deployment
* CI/CD pipeline
* Model versioning
* Database integration
* Batch prediction for multiple customers

---

## 💡 Key Learning Outcomes

This project demonstrates practical experience with:

* End-to-end machine learning workflows
* Classification algorithms
* Imbalanced classification
* Feature preprocessing pipelines
* Cross-validation
* Hyperparameter optimization
* Model interpretation
* Model serialization
* REST API development
* ML model deployment

---

## 👩‍💻 Author

**Alisha Khan**

Master's in Artificial Intelligence
Software Engineering / Machine Learning

---

## 📌 Project Status

**Completed:** Machine Learning + Model Evaluation + FastAPI Deployment

**Next planned stage:** Interactive frontend and portfolio-ready deployment.
