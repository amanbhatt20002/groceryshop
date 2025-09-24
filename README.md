# MERN Stack Fullstack Project

This is a full-featured MERN (MongoDB, Express.js, React, Node.js) stack application that includes both frontend and backend development. It showcases a complete workflow from client-side UI to server-side API and database integration.

---

## 📁 Folder Structure

```
project-root/
├── client/         # React frontend
├── server/         # Node.js + Express backend
├── .env            # Environment variables (not committed)
├── .gitignore
├── README.md
```

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 🌐 RESTful API Integration
- 💾 MongoDB Database (Mongoose ORM)
- 📦 State Management using React Context 
- 🎨 Responsive UI with modern CSS
- ✅ Protected Routes
- 📄 Form Handling and Validation

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios for API calls
- React Router for navigation
- Context API or Redux (if used)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs for password hashing
- jsonwebtoken (JWT) for auth

---

## 🧪 Prerequisites

- Node.js & npm
- MongoDB installed locally 

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-fullstack-project.git
cd mern-fullstack-project
```

---

### 2. Set up Environment Variables

Create a `.env` file in the `server/` folder with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

### 3. Run the Server

```bash
cd server
npm install
npm start
```

Server will run on [http://localhost:5000](http://localhost:5000)

---

### 4. Run the Client

```bash
cd client
npm install
npm start
```

Client will run on [http://localhost:3000](http://localhost:3000)

---

## 🔒 Authentication Flow

- Register and Login with email and password
- Receive JWT token from backend
- Store token in localStorage
- Access protected routes using token

---

## 📸 Screenshots

> _Add screenshots of your app UI here to showcase design and features._

---

## 🙌 Author

- [Aman Bhatt](https://github.com/amanbhatt20002)

---

## 📄 License

This project is licensed under the MIT License.
