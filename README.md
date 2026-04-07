---

# 🚀 Full-Stack Portfolio Generator (Based on Docker)

This project is a **full-stack portfolio generator** built using **Node.js, Express, MongoDB, and Docker**, where users can generate and store portfolio data that is fetched dynamically from a backend API and persisted in a MongoDB database.

The backend and database are fully **containerized using Docker and Docker Compose**, allowing the entire backend stack to be started with a single command.

---

## 🧠 What This Project Does

* Accepts portfolio data from the frontend UI
* Sends data to a Node.js + Express backend
* Stores portfolio information in MongoDB using Mongoose
* Fetches and displays stored portfolio data dynamically
* Runs backend and database inside Docker containers

In short:
**UI → Backend → MongoDB → Backend → UI**
(yes, it actually works — not a tutorial illusion)

---

## 🛠️ Tech Stack

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**

### DevOps / Infrastructure

* **Docker**
* **Docker Compose**
* MongoDB official Docker image

### Frontend

* HTML, CSS, JavaScript
  (frontend currently runs separately outside Docker)

---

## 🐳 Docker Setup (Backend + Database)

The project uses **Docker Compose** to orchestrate:

* A backend container (Node.js + Express)
* A MongoDB container with persistent volumes

Both services can be started together using a single command:

```bash
docker-compose up --build
```

This ensures:

* Consistent environment
* No local MongoDB installation required
* Clean startup and teardown of services

---

## 📁 Project Structure

```
WPL proj/
│
├── docker-compose.yaml
│
├── portfolio-backend/
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
│   └── models/
│
└── portfolio-frontend/
    └── (static frontend files)
```

---

## 🟢 Current Status

✅ Backend fully Dockerized
✅ MongoDB containerized with persistent storage
✅ API connected to database
✅ Data successfully saved and fetched from MongoDB
⚠️ Frontend not yet containerized (planned)

---

## 🔮 Planned Improvements

* Dockerize frontend and include it in Docker Compose
* Environment variable support using `.env`
* Improved API validation and error handling
* Production-ready Nginx setup
* Deployment to cloud (AWS / Azure / GCP)

---

## 💡 Why This Project?

This project was built to:

* Understand real backend–database communication
* Learn Docker and Docker Compose in a **real-world scenario**
* Avoid “hello world” DevOps setups
* Build a scalable full-stack foundation

---

## 🧑‍💻 Author

Built by **Mayur Joshi**
(With patience, debugging stamina, and way too many Docker rebuilds)

---

