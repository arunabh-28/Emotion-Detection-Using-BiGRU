# Emotion Detection Using BiGRU

A Deep Learning-based **Emotion Detection** web application that analyzes text and predicts the emotion expressed in it using a **Bidirectional GRU (BiGRU)** model.

The project combines **Natural Language Processing (NLP)**, **TensorFlow/Keras**, **FastAPI**, and a simple web frontend to provide real-time emotion predictions.

---

## 🚀 Features

* Detects emotions from user-provided text.
* Uses a trained **Bidirectional GRU (BiGRU)** deep learning model.
* Text preprocessing and tokenization before prediction.
* Returns the predicted emotion along with its confidence score.
* Provides probabilities for all supported emotions.
* FastAPI backend for serving the trained model.
* Interactive API documentation using Swagger UI.
* Simple HTML/CSS/JavaScript frontend.
* Health-check endpoint to verify server and model status.

---

## 🧠 Supported Emotions

The model predicts one of the following six emotions:

| Emotion  | Emoji |
| -------- | ----- |
| Sadness  | 😢    |
| Joy      | 😄    |
| Love     | ❤️    |
| Anger    | 😠    |
| Fear     | 😨    |
| Surprise | 😲    |

---

## 🏗️ Project Architecture

```text
User
 │
 ▼
Frontend
HTML / CSS / JavaScript
 │
 │ POST /predict
 ▼
FastAPI Backend
 │
 ▼
Text Preprocessing
 │
 ▼
Tokenizer
 │
 ▼
Padding
 │
 ▼
BiGRU Model
 │
 ▼
Emotion Prediction
 │
 ▼
Frontend
```

---

## 📂 Project Structure

```text
Emotion-Detection-Using-BiGRU/
│
├── Artifacts/
│   ├── BiGRU_Model.keras
│   └── tokenizer.pkl
│
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── main.py
├── requirements.txt
├── runtime.txt
├── .gitignore
└── README.md
```

---

## 🛠️ Technologies Used

### Machine Learning / Deep Learning

* Python
* TensorFlow
* Keras
* NumPy
* Scikit-learn
* NLP
* BiGRU (Bidirectional Gated Recurrent Unit)

### Backend

* FastAPI
* Uvicorn
* Pydantic

### Frontend

* HTML
* CSS
* JavaScript

### Other Tools

* Git
* GitHub
* Pickle

---

## 🔄 How It Works

### 1. User Input

The user enters a sentence through the web interface.

Example:

```text
I am so happy and excited today!
```

### 2. Text Preprocessing

The backend cleans the input text by:

* Converting text to lowercase.
* Removing apostrophes.
* Removing unwanted characters.
* Removing extra spaces.

### 3. Tokenization

The cleaned text is converted into numerical sequences using the trained tokenizer.

### 4. Padding

The sequence is padded/truncated to a maximum length of:

```text
50 tokens
```

### 5. BiGRU Prediction

The processed sequence is passed to the trained BiGRU model.

The model produces probabilities for the six emotion classes.

### 6. Final Prediction

The emotion with the highest probability is selected as the predicted emotion.

The API returns:

```json
{
    "text": "I am so happy and excited today!",
    "predicted_emotion": "joy",
    "confidence": 0.95,
    "all_probabilites": {
        "sadness": 0.01,
        "joy": 0.95,
        "love": 0.01,
        "anger": 0.01,
        "fear": 0.01,
        "surprise": 0.01
    }
}
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/arunabh-28/Emotion-Detection-Using-BiGRU.git
```

Go into the project directory:

```bash
cd Emotion-Detection-Using-BiGRU
```

---

### 2. Create a virtual environment

Windows:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.\.venv\Scripts\Activate.ps1
```

---

### 3. Install dependencies

```powershell
python -m pip install -r requirements.txt
```

---

## ▶️ Running the Application

Start the FastAPI server:

```powershell
python -m uvicorn main:app --reload
```

The application will be available at:

```text
http://127.0.0.1:8000
```

Open this URL in your browser to access the frontend.

---

## 📚 API Documentation

FastAPI automatically provides interactive API documentation.

Open:

```text
http://127.0.0.1:8000/docs
```

You can test the `/predict` endpoint directly from Swagger UI.

---

## 🔌 API Endpoints

### `GET /`

Serves the frontend application.

---

### `GET /health`

Checks whether the server is running and whether the model and tokenizer have been loaded.

Example response:

```json
{
    "status": "Server is running",
    "model_loaded": true
}
```

---

### `POST /predict`

Predicts the emotion of the provided text.

Request:

```json
{
    "text": "I am extremely happy today!"
}
```

Response:

```json
{
    "text": "I am extremely happy today!",
    "predicted_emotion": "joy",
    "confidence": 0.92,
    "all_probabilites": {
        "sadness": 0.01,
        "joy": 0.92,
        "love": 0.02,
        "anger": 0.01,
        "fear": 0.02,
        "surprise": 0.02
    }
}
```

---

## 🧪 Example Inputs

Try sentences such as:

```text
I am so happy that I finally got the job!
```

```text
I feel completely alone and miserable.
```

```text
I love my family more than anything.
```

```text
This situation is making me extremely angry.
```

```text
I am terrified of what might happen next.
```

```text
I can't believe this happened!
```

The model will return its predicted emotion and confidence.

---

## 📦 Model Artifacts

The `Artifacts` directory contains the files required for prediction:

```text
Artifacts/
├── BiGRU_Model.keras
└── tokenizer.pkl
```

### `BiGRU_Model.keras`

The trained Bidirectional GRU deep learning model used for emotion classification.

### `tokenizer.pkl`

The trained tokenizer used to convert input text into numerical sequences in the same format used during model training.

Both are required for the FastAPI prediction pipeline.

---

## 🔐 Environment

The project includes a `runtime.txt` file specifying:

```text
python-3.11.9
```

The `.venv` directory is excluded from Git using `.gitignore`.

Dependencies are listed in:

```text
requirements.txt
```

---

## 📌 Future Improvements

Possible improvements include:

* Improve model accuracy through additional training and tuning.
* Add confidence visualization for all emotions.
* Improve the frontend UI/UX.
* Add emotion-specific animations and emojis.
* Add prediction history.
* Deploy the application online.
* Add authentication and user accounts.
* Add support for larger text inputs.
* Experiment with other NLP architectures such as LSTM, Transformer, or BERT-based models.

---

## 👨‍💻 Author

**Arunabh Maurya**

B.Tech – Computer Science & Engineering

KIIT Deemed to be University

---

## ⭐ Project

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**GitHub Repository:**
https://github.com/arunabh-28/Emotion-Detection-Using-BiGRU
