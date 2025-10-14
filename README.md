# 📰 Blog App

A **full-stack blogging platform** where the **author** can log in to create and edit posts, and **visitors** can browse and read them freely.  
Registered users can also **add comments**, fostering an interactive reading experience.

---

## 🚀 Live Demo

👉 [Visit the live site for read and comment version](https://blog-app-1-2fcm.onrender.com/)



---

## 🧩 Features

### 👤 Authentication
- Secure login and registration system.
- Session handling with **JWT**.
- Role-based access: **Author/Admin** vs. **User/Visitor**.

### ✍️ Posts
- Authors can **create**, **edit**, and **delete** posts.
- Posts are displayed publicly for everyone.
- Responsive design and clean layout.

### 💬 Comments
- Publicly visible comments under each post.
- Only registered users can **add comments**.
- Comments are associated with user accounts for moderation.

### ⚙️ Backend
- Built with **Node.js** and **Express**.
- **Prisma ORM** manages database operations.
- **JWT authentication** ensures secure routes.
- RESTful API architecture.

### 🖥️ Frontend
- **React** for dynamic rendering and component-based UI.
- **React Router** for client-side navigation.
- **Axios** for API communication.

---

## ⚡ Environment Variables

Create a `.env` file in the `/Backend` directory and include:

```env
DATABASE_URL=<your_prisma_database_url>
JWT_SECRET=<your_secret_key>
```

⚠️ These values are not included in the repository.
Anyone cloning the project must provide their own .env file.

## Usage Overview
User Type	            Capabilities
Visitor (unregistered)	View blog posts
Registered user	View + comment on posts
Author/Admin	Create, edit, and delete posts


## 👨‍💻 Tech Stack

Frontend: React, React Router, Axios
Backend: Node.js, Express
Database: Prisma ORM (connected to a SQL or PostgreSQL database)
Authentication: JSON Web Tokens (JWT)
Styling: Tailwind CSS / CSS Modules


## 🤝 Contributing

Fork this repository

Create a feature branch (git checkout -b feature-name)

Commit your changes (git commit -m 'Add new feature')

Push to your fork (git push origin feature-name)

Open a Pull Request

<!-- Please follow good commit message conventions and explain your changes clearly. -->

## 🪪 License

This project is released under the MIT License — you can freely use and modify it for your own learning or projects.

## 🙌 Credits

Developed by Eduardo D. Negri

🌍 GitHub

💼 LinkedIn

Special thanks to the open-source communities behind React, Express, and Prisma.