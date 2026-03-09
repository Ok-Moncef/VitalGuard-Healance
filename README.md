# VitalGuard-Healance
A Flask-based backend for a healthcare monitoring system that supports authentication, doctor verification, live heart rate streaming, and AI-powered chat assistance.

## 🚀 Features

* 🔐 **JWT Authentication**

  * Secure login and protected routes
  * Token validation and blocklist support

* 👨‍⚕️ **Doctor Management**

  * Doctors can request verification
  * Admin can approve doctor requests

* ❤️ **Live Heart Rate Streaming**

  * Real-time patient heart rate updates using SocketIO

* 🤖 **AI Chat Assistant**

  * Medical assistant powered by a RAG AI agent

* 📊 **Admin Tools**

  * View doctor verification requests
  * Approve doctors

* 📝 **Centralized Logging**

  * All system events stored in `logs/app.log`

---

# 📂 Project Structure

```+---app
|   |   config.py
|   |   extensions.py
|   |   __init__.py
|   |   
|   +---ai
|   |   |   medguard_rag_agent.py
|   |   |   medical_knowledge_base.json
|   |   |   
|   |           
|   +---Models
|   |   |   Doctor.py
|   |   |   DoctorRequest.py
|   |   |   Hero.py
|   |   |   Patient.py
|   |   |   Tokens.py
|   |   |   User.py
|   |   |   __init__.py
|   |   |   
|   |           
|   +---routes
|   |   |   chat_with_bot.py
|   |   |   
|   |   +---controllers
|   |   |   |   auth.py
|   |   |   |   checkDoctors.py
|   |   |   |   liveHeartRate.py
|   |   |   |   
|   |   |           
|   |   +---doctor
|   |   |   |   dashboard.py
|   |   |   |   patient_manag.py
|   |   |   |   __init__.py
|   |   |   |   
|   |   |           
|   |           
|           
\---logs
        app.log
```

---

# ⚙️ Installation

## 1️⃣ Clone the repository

```
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

## 2️⃣ Create virtual environment

```
python -m venv venv
```

Activate it:

**Windows**

```
venv\Scripts\activate
```

**Linux / Mac**

```
source venv/bin/activate
```

## 3️⃣ Install dependencies

```
pip install -r requirements.txt
```

---

# 🔑 Environment Variables

Create a `.env` file in the root directory:

```
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret
DATABASE_URI=sqlite:///database.db
```

---

# ▶️ Run the Application

```
flask run
```

or if using SocketIO:

```
python run.py
```

---

# 🔐 API Endpoints

## Authentication

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/auth/register` | Register a new user   |
| POST   | `/auth/login`    | Login and receive JWT |

---

## Doctor Management

| Method | Endpoint                       | Description                       |
| ------ | ------------------------------ | --------------------------------- |
| GET    | `/admin/lst_Requested_doctors` | List doctor verification requests |
| POST   | `/admin/approve_doctor`        | Approve doctor request            |

---

## Chat Assistant

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| POST   | `/chat/message` | Send message to AI assistant |
| GET    | `/chat/message` | Test endpoint                |

---

## Live Heart Rate

| Method | Endpoint             | Description          |
| ------ | -------------------- | -------------------- |
| POST   | `/api/liveHeartRate` | Send heart rate data |

Example request:

```
{
  "patient_id": "123",
  "bpm": 85
}
```

---

# 📊 Logging

All logs are stored in:

```
logs/app.log
```

Logs include:

* authentication events
* admin actions
* doctor approvals
* system errors
* heart rate emissions

---

# 🛠 Technologies Used

* **Flask**
* **Flask-JWT-Extended**
* **Flask-SQLAlchemy**
* **Flask-SocketIO**
* **Python Logging**
* **CORS**

