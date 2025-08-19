
# 👥 Mentorship Matching Platform

A fully functional mentorship platform that connects mentors and mentees based on skills and interests. Built using **Node JS** backend for a lightweight and responsive UI, with a **non-relational database backend** (MongoDB) for secure data management.

---

## 🔧 Features

- 🔐 **User Authentication:** Secure registration, login, and logout with input validation. Email validations via DNS lookups.
- 👤 **Profile Setup:** Users can create/edit profiles as either a mentor or mentee, including skills, interests.
- 🔍 **User Discovery:** Browse and filter other users by role, skills, or interests.
- 🤝 **Connection Requests:** Send, receive, accept, or decline mentorship requests.
- 🔒 **Security:** Passwords hashed using bcrypt, input validation to prevent injection

---

## 🛠 Tech Stack

- **Frontend:** Tailwind CSS, EJS 
- **Backend:** Node.js with Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Uses express-session to manage login state on the server, with optional JWT support for secure token-based flows.
- **Security:** Bcrypt for user-password hashing, input sanitization
---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shelby-garrison/MentorMatch.git
cd MentorMatch
```

### 2. Environment Setup

Create a `.env` file in the root or backend folder:

```env
JWT_KEY=your_jwt_key
NODE_ENV=your_node_env
EXPRESS_SESSION_SECRET=your_express_session_secret
BASE_URL=http://localhost:3000
PORT=3000
MONGODB_URI= your_mongodb_uri
```

### 3. Install Backend Dependencies

```bash
npm install
```

### 4. Set Up the Database

This app uses MongoDB with Mongoose to store user and product data. To get started:

Run MongoDB locally using MongoDB Compass or through the MongoDB command-line tools. If you prefer a GUI, MongoDB Compass is a good option for managing your local MongoDB instance.

OR connect to a cloud instance using MongoDB Atlas, which provides a fully managed cloud database service for MongoDB. You'll need to create a MongoDB Atlas account and set up a cluster, then update the connection string in your .env file.






### 5. Run the Server

```bash
node app.js
```
Your service would be live on [http://localhost:3000](http://localhost:3000)



## 🔐 Security Best Practices

- Passwords are hashed using bcrypt.
- Inputs are validated and sanitized to prevent XSS Injection.
- Duplicate profiles and requests are restricted.

---

## 🧪 Testing

Use Postman to test endpoints during development.

---

