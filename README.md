
# 🧪 Chemical Visualizer – Full Stack Application (React + Django)

## 📌 Overview
Chemical Visualizer is a full-stack web application that allows users to upload CSV datasets and visualize the results using interactive Bar, Line, and Pie charts.  
It also maintains upload history and displays statistical summaries processed on the backend.

---

## 🚀 Features

### Frontend
- Upload CSV files  
- Display summary (total count, averages, distribution)  
- Show Bar Chart, Line Chart, and Pie Chart  
- View upload history  
- Responsive modern UI  

### Backend
- CSV processing using Pandas  
- REST APIs using Django REST Framework  
- CORS-enabled Django server  
- CSV validation  
- Basic authentication  

---

## 🛠 Tech Stack

### Frontend
- React.js  
- Axios  
- Chart.js  
- react-chartjs-2  

### Backend
- Python 3.10+  
- Django  
- Django REST Framework  
- Pandas  
- django-cors-headers  
- SQLite  

---

## 📁 Directory Structure
```

chemical-visualizer/
│
├── backend/
│   ├── api/
│   ├── backend/
│   ├── db.sqlite3
│   ├── manage.py
│   └── env/
│
└── frontend/
├── src/
├── public/
├── package.json
└── node_modules/

````

---

# ⚙️ Installation & Setup Guide

## 1️⃣ Clone the Project
```bash
git clone https://github.com/yourusername/chemical-visualizer.git
cd chemical-visualizer
````

---

# 🖥 Backend Setup (Django)

## 2️⃣ Go to backend

```bash
cd backend
```

## 3️⃣ Create Virtual Environment

```bash
python -m venv env
```

## 4️⃣ Activate Virtual Environment

### Windows

```bash
.\env\Scripts\activate
```

### Mac/Linux

```bash
source env/bin/activate
```

## 5️⃣ Install Required Packages

```bash
pip install django djangorestframework pandas django-cors-headers
```

## 6️⃣ Run Migrations

```bash
python manage.py migrate
```

## 7️⃣ Start Backend Server

```bash
python manage.py runserver
```

Backend URL:

```
http://127.0.0.1:8000/
```

API Base:

```
http://127.0.0.1:8000/api/
```

---

# 🌐 Frontend Setup (React)

## 1️⃣ Go to frontend

```bash
cd frontend
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Start React App

```bash
npm start
```

Frontend URL:

```
http://localhost:3000
```

---

# 🔗 API Endpoints

## 📌 Upload CSV

```
POST /api/upload/
Content-Type: multipart/form-data
Auth: Basic (username + password)
```

## 📌 Get Upload History

```
GET /api/history/
```

### Sample Response

```json
[
  {
    "id": 1,
    "file_name": "data.csv",
    "upload_time": "2026-01-30T12:00:00Z"
  }
]
```

---

# 🧩 Environment Notes

* Backend must run on **127.0.0.1:8000**
* Frontend must run on **localhost:3000**
* Authentication uses Django's default User model

---

# 🛠 Troubleshooting

### ❗ Backend not starting?

```bash
.\env\Scripts\activate
python manage.py runserver
```

If Django missing:

```bash
pip install django
```

---

### ❗ 500 Error on CSV Upload?

Check backend terminal.
Reasons:

* Wrong column names
* Empty CSV file
* Pandas cannot parse file

---

### ❗ CORS Error?

Ensure this exists in `settings.py`:

```python
INSTALLED_APPS = [
   "corsheaders",
   "rest_framework",
]

MIDDLEWARE = [
   "corsheaders.middleware.CorsMiddleware",
]

CORS_ALLOW_ALL_ORIGINS = True
```

---

# 📸 Screenshots

(Place your screenshots in a `/screenshots` folder.)

```
/screenshots/
  upload_page.png
  charts.png
  history.png
```

## 📬 Contact

**Aditya Jain**
📎 LinkedIn: *[https://www.linkedin.com/in/adddijain/](https://www.linkedin.com/in/adddijain/)*
📧 Email: *adijain1106@gmail.com*

Project Link:
[https://github.com/AdityaJain1106/chemical-visualizer](https://github.com/AdityaJain1106/chemical-visualizer)

---
