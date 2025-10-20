# 🔐 Full-Stack Authentication System

Live Demo 👉 [Here](https://accessifywasiq.netlify.app/)

A sleek, dark-themed full-stack authentication system built with **React + Vite + Tailwind CSS** for the frontend and **Node.js + Express + MongoDB** for the backend. Users can register, log in, and access a protected dashboard with persistent sessions.

---

## ✨ Features

- 🔒 User registration & login with session handling
- 🚫 Protected dashboard route
- 🎨 Clean dark mode UI with TailwindCSS
- 🍞 Toast notifications using React Hot Toast
- ⏳ Loading indicators using React Spinners
- 📦 API integration using Axios
- 🔁 Prevent back navigation after login
- 🌐 Hosted frontend on **Vercel**
- 🛠️ Backend deployed to **Render**

---

## 🛠 Tech Stack

### Frontend:
- [React.js](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [React Spinners](https://www.davidhu.io/react-spinners/)

### Backend:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB + Mongoose](https://mongoosejs.com/)
- [CORS & Cookie-parser](https://www.npmjs.com/package/cookie-parser)

---

## 🔧 How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Set up environment variables

Create `.env` files in both the frontend and backend folders.

**Frontend (`.env`):**
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

**Backend (`.env`):**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
CLIENT_URL=https://authwasiq.onrender.com
```

### 3. Install & Run Frontend

```bash
cd frontend
npm install
npm run dev
```

### 4. Install & Run Backend

```bash
cd backend
npm install
npm run dev
```

---

## 📁 Folder Structure

```
/frontend
  ├── src/
  │   ├── components/
  │   ├── pages/
  │   └── App.jsx
  └── .env

/backend
  ├── routes/
  ├── controllers/
  ├── models/
  └── index.js
```

---

## 📸 Screenshots

> Login Page  
> ![Login](https://via.placeholder.com/700x400?text=Login+Page+Screenshot)

> Signup Page  
> ![Signup](https://via.placeholder.com/700x400?text=Signup+Page+Screenshot)

> Dashboard  
> ![Dashboard](https://via.placeholder.com/700x400?text=Dashboard+Page+Screenshot)

---

## 🙋‍♂️ About the Developer

👨‍💻 **Wasiq Afnan Ansari**  
Passionate about building clean, scalable, and modern full-stack applications.  
Let’s connect: [LinkedIn](https://www.linkedin.com/) | [GitHub](https://github.com/your-username)

---

## ⭐️ Show Some Love

If you like this project, don’t forget to ⭐ the repo and share it with others!