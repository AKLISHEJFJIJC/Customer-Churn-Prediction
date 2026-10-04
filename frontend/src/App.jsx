import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    SeniorCitizen: 0,
    tenure: 2,
    MonthlyCharges: 70,
    TotalCharges: 140,
    gender: "Female",
    Partner: "No",
    Dependents: "No",
    PhoneService: "Yes",
    MultipleLines: "No",
    InternetService: "Fiber optic",
    OnlineSecurity: "No",
    OnlineBackup: "No",
    DeviceProtection: "No",
    TechSupport: "No",
    StreamingTV: "Yes",
    StreamingMovies: "Yes",
    Contract: "Month-to-month",
    PaperlessBilling: "Yes",
    PaymentMethod: "Electronic check",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        name === "SeniorCitizen" ||
        name === "tenure" ||
        name === "MonthlyCharges" ||
        name === "TotalCharges"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const result = await response.json();

      setPrediction(result);
    } catch (error) {
      console.error("Prediction error:", error);

      setError(
        "Unable to connect to the prediction API. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (probability) => {
    if (probability >= 0.7) {
      return {
        label: "High Risk",
        className: "high-risk",
      };
    }

    if (probability >= 0.4) {
      return {
        label: "Moderate Risk",
        className: "moderate-risk",
      };
    }

    return {
      label: "Low Risk",
      className: "low-risk",
    };
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">MACHINE LEARNING APPLICATION</p>
          <h1>Customer Churn Prediction</h1>
          <p className="subtitle">
            Predict customer churn probability using a trained machine learning
            model.
          </p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          API Ready
        </div>
      </header>

      <main className="dashboard">
        <section className="form-card">
          <div className="card-heading">
            <div>
              <h2>Customer Information</h2>
              <p>Enter the customer's service and account details.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="section-title">Account Details</div>

            <div className="form-grid">
              <div className="field">
                <label>Senior Citizen</label>
                <select
                  name="SeniorCitizen"
                  value={formData.SeniorCitizen}
                  onChange={handleChange}
                >
                  <option value={0}>No</option>
                  <option value={1}>Yes</option>
                </select>
              </div>

              <div className="field">
                <label>Tenure (months)</label>
                <input
                  type="number"
                  name="tenure"
                  min="0"
                  value={formData.tenure}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Monthly Charges</label>
                <input
                  type="number"
                  step="0.01"
                  name="MonthlyCharges"
                  value={formData.MonthlyCharges}
                  onChange={handleChange}
                />
              </div>

              <div className="field">
                <label>Total Charges</label>
                <input
                  type="number"
                  step="0.01"
                  name="TotalCharges"
                  value={formData.TotalCharges}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="section-title">Customer Profile</div>

            <div className="form-grid">
              <div className="field">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option>Female</option>
                  <option>Male</option>
                </select>
              </div>

              <div className="field">
                <label>Partner</label>
                <select
                  name="Partner"
                  value={formData.Partner}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="field">
                <label>Dependents</label>
                <select
                  name="Dependents"
                  value={formData.Dependents}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="field">
                <label>Phone Service</label>
                <select
                  name="PhoneService"
                  value={formData.PhoneService}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="field">
                <label>Multiple Lines</label>
                <select
                  name="MultipleLines"
                  value={formData.MultipleLines}
                  onChange={handleChange}
                >
                  <option>No</option>
                  <option>Yes</option>
                  <option>No phone service</option>
                </select>
              </div>

              <div className="field">
                <label>Internet Service</label>
                <select
                  name="InternetService"
                  value={formData.InternetService}
                  onChange={handleChange}
                >
                  <option>Fiber optic</option>
                  <option>DSL</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="section-title">Services</div>

            <div className="form-grid">
              <div className="field">
                <label>Online Security</label>
                <select
                  name="OnlineSecurity"
                  value={formData.OnlineSecurity}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="field">
                <label>Online Backup</label>
                <select
                  name="OnlineBackup"
                  value={formData.OnlineBackup}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="field">
                <label>Device Protection</label>
                <select
                  name="DeviceProtection"
                  value={formData.DeviceProtection}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="field">
                <label>Tech Support</label>
                <select
                  name="TechSupport"
                  value={formData.TechSupport}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="field">
                <label>Streaming TV</label>
                <select
                  name="StreamingTV"
                  value={formData.StreamingTV}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>

              <div className="field">
                <label>Streaming Movies</label>
                <select
                  name="StreamingMovies"
                  value={formData.StreamingMovies}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                  <option>No internet service</option>
                </select>
              </div>
            </div>

            <div className="section-title">Contract & Billing</div>

            <div className="form-grid">
              <div className="field">
                <label>Contract</label>
                <select
                  name="Contract"
                  value={formData.Contract}
                  onChange={handleChange}
                >
                  <option>Month-to-month</option>
                  <option>One year</option>
                  <option>Two year</option>
                </select>
              </div>

              <div className="field">
                <label>Paperless Billing</label>
                <select
                  name="PaperlessBilling"
                  value={formData.PaperlessBilling}
                  onChange={handleChange}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>

              <div className="field">
                <label>Payment Method</label>
                <select
                  name="PaymentMethod"
                  value={formData.PaymentMethod}
                  onChange={handleChange}
                >
                  <option>Electronic check</option>
                  <option>Credit card (automatic)</option>
                  <option>Bank transfer (automatic)</option>
                  <option>Mailed check</option>
                </select>
              </div>
            </div>

            <button
              className="predict-button"
              type="submit"
              disabled={loading}
            >
              {loading ? "Analyzing Customer..." : "Predict Customer Churn"}
            </button>
          </form>
        </section>

        <aside className="result-card">
          <div className="result-header">
            <span>Prediction Result</span>
            <span className="model-badge">Logistic Regression</span>
          </div>

          {error && (
            <div className="api-error">
              <strong>Prediction Error</strong>
              <p>{error}</p>
            </div>
          )}

          {!prediction ? (
            <div className="empty-result">
              <div className="empty-icon">📊</div>
              <h3>Ready for Prediction</h3>
              <p>
                Enter customer information and click the prediction button to
                analyze churn risk.
              </p>
            </div>
          ) : (
            <div className="prediction-result">
              <div
                className={`prediction-status ${
                  prediction.prediction === 1 ? "danger" : "safe"
                }`}
              >
                <span className="result-icon">
                  {prediction.prediction === 1 ? "⚠" : "✓"}
                </span>

                <div>
                  <span className="result-label">Churn Prediction</span>
                  <strong>{prediction.churn_prediction}</strong>
                </div>
              </div>

              <div className="risk-row">
                <span>Risk Level</span>

                <span
                  className={`risk-badge ${
                    getRiskLevel(prediction.churn_probability).className
                  }`}
                >
                  {getRiskLevel(prediction.churn_probability).label}
                </span>
              </div>

              <div className="probability">
                <div className="probability-top">
                  <span>Churn Probability</span>

                  <strong>
                    {(prediction.churn_probability * 100).toFixed(2)}%
                  </strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${prediction.churn_probability * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="prediction-note">
                This probability is the model's estimated likelihood of churn
                based on the customer information provided. It is not a
                guarantee of future behavior.
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}

export default App;