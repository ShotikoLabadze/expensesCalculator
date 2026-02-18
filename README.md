# Full Stack Finance App (React + Node.js)

A personal finance dashboard built with React (TypeScript) and Node.js (Express + MongoDB).
Users can register, log in, and manage personal finances including income and expenses, with a modern, clean UI.

---

## Screenshots

### Login Page

![Login Page](screenshots/LoginPage.png.png)

### Notes Page

![Personal Dashboard](screenshots/PersonalDashboard.png.png)

---

## Features

- User registration (username, email, password)
- JWT login authentication
- Add / delete financial records (income and expenses)
- Monthly summary and balance calculation
- Protected routes for logged-in users
- Responsive layout

---

## Getting Started

### Prerequisites

- Node.js + npm
- MongoDB database (local or hosted)

---

### Backend Setup

# 1. Install dependencies

npm install

# 2. Create a .env file in backend/

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret

# 3. Start Backend Server

npm run dev

### Frontend Setup

# 1. Navigate to the frontend folder

cd frontend

# 2. Install dependencies

npm install

# 3. Start the development server

npm start
