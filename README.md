<div align="center">
  
![Header](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=250&section=header&text=CodeMentor%20AI&fontSize=70&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Your%20AI%20Coding%20Partner%20🧠&descSize=20&descAlignY=55)

  <p align="center">
    <img src="https://img.shields.io/badge/CodeMentor-AI-667EEA?style=for-the-badge&labelColor=764BA2&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJzNC40OCAxMCAxMCAxMCAxMC00LjQ4IDEwLTEwUzE3LjUyIDIgMTIgMnptMCAxOGMtNC40MSAwLTgtMy41OS04LThzMy41OS04IDgtOCA4IDMuNTkgOCA4LTMuNTkgOC04IDh6IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==" alt="CodeMentor AI Badge" />
  </p>

  <h3>🚀 AI-Powered LeetCode Problem Solver & Learning Companion</h3>
  <p><em>Master Data Structures & Algorithms with AI-Driven Insights</em></p>

  <p align="center">
    <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
    <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
    <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  </p>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-endpoints">API Documentation</a> •
    <a href="#-contributing">Contributing</a>
  </p>
</div>

---

## 📖 About The Project

**CodeMentor AI** is an intelligent coding assistant that revolutionizes how you learn and solve LeetCode problems. Powered by Google's Gemini AI, it provides:

- 🎯 **Comprehensive Problem Analysis** - Deep dive into problem statements with AI-powered insights
- 🧠 **Intelligent Learning Path** - Step-by-step guidance tailored to your learning style
- ⚡ **Optimized Solutions** - Industry-standard code with best practices
- 📊 **Performance Metrics** - Detailed time and space complexity analysis
- 🎓 **Interview Preparation** - Real-world problem-solving techniques

Whether you're preparing for FAANG interviews, strengthening your DSA fundamentals, or exploring algorithmic thinking, **CodeMentor AI** is your ultimate learning companion!

---

## ✨ Features

### 🤖 AI-Powered Intelligence

- **Smart Problem Breakdown** - Gemini AI analyzes and explains problems in simple terms
- **Multiple Approaches** - Learn different solutions from brute force to optimal
- **Code Explanation** - Line-by-line breakdown of the solution

### 📚 Comprehensive Learning

- **Step-by-Step Guidance** - Clear progression from problem understanding to implementation
- **Pattern Recognition** - Identify common problem-solving patterns
- **Complexity Analysis** - Detailed Big-O notation for time and space

### 🔐 User Management

- **Secure Authentication** - JWT-based login system
- **Problem History** - Access previously solved problems

### 💾 Robust Backend

- **MongoDB Integration** - Scalable data persistence
- **RESTful API** - Clean and documented endpoints
- **Error Handling** - Comprehensive error management

---

## 🏗️ System Architecture

<div align="center">

```
┌──────────────────────────────────────────────────────────────┐
│                    Frontend (Coming Soon)                    │
│           React.js + Tailwind CSS + TypeScript               │
└────────────────────────┬─────────────────────────────────────┘
                         │ REST API
                         ▼
┌──────────────────────────────────────────────────────────────┐
│                    Express.js Backend                        │
│                                                              │
│  ┌────────────┐   ┌──────────────┐   ┌─────────────────┐   │
│  │  Routes    │──▶│ Controllers  │──▶│  Middleware     │   │
│  │  Layer     │   │  (Business   │   │  (Auth/Logging) │   │
│  └────────────┘   │   Logic)     │   └─────────────────┘   │
│                   └──────┬───────┘                          │
│                          │                                  │
│                   ┌──────▼───────┐                          │
│                   │    Models    │                          │
│                   │   (Schemas)  │                          │
│                   └──────────────┘                          │
└──────────┬────────────────────────────┬─────────────────────┘
           │                            │
           ▼                            ▼
┌──────────────────────┐    ┌──────────────────────────┐
│   Gemini AI API      │    │   MongoDB Atlas/Local    │
│                      │    │                          │
│ • Problem Analysis   │    │ • User Authentication    │
│ • Solution Generation│    │ • Problem Storage        │
│ • Code Explanation   │    │ • Progress Tracking      │
└──────────────────────┘    └──────────────────────────┘
```

</div>

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v14.x or higher) - [Download](https://nodejs.org/)
- **npm** (v6.x or higher) or **yarn** (v1.22.x or higher)
- **MongoDB** - [Local Installation](https://www.mongodb.com/try/download/community) or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Google Gemini API Key** - [Get your free API key](https://makersuite.google.com/app/apikey)
- **Git** - [Download](https://git-scm.com/downloads)

### Quick Start Guide

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/nikhilxagr/Code-Mentor-AI.git
cd Code-Mentor-AI
```

#### 2️⃣ Install Dependencies

```bash
cd backend
npm install
```

#### 3️⃣ Environment Configuration

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/codementor
# For MongoDB Atlas: mongodb+srv://<username>:<password>@cluster.mongodb.net/codementor

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS Settings
CORS_ORIGIN=http://localhost:3000
```

#### 4️⃣ Start MongoDB

**Local MongoDB:**

```bash
mongod
```

**MongoDB Atlas:**

- Copy your connection string from Atlas dashboard
- Update `MONGO_URI` in `.env`

#### 5️⃣ Run the Development Server

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

Your server should now be running on `http://localhost:5000` 🚀

---

## 🛠️ Tech Stack

### Backend Technologies

| Technology           | Version | Purpose                             |
| -------------------- | ------- | ----------------------------------- |
| **Node.js**          | v14+    | JavaScript runtime environment      |
| **Express.js**       | v4.18+  | Fast, unopinionated web framework   |
| **MongoDB**          | v5.0+   | NoSQL database for data persistence |
| **Mongoose**         | v7.0+   | Elegant MongoDB object modeling     |
| **Google Gemini AI** | Latest  | Advanced AI for problem solving     |
| **bcryptjs**         | v2.4+   | Secure password hashing             |
| **jsonwebtoken**     | v9.0+   | JWT-based authentication            |
| **dotenv**           | v16.0+  | Environment variable management     |
| **cors**             | v2.8+   | Enable cross-origin requests        |

---

## 📡 API Endpoints

### 🧠 Problem Solving Endpoints

#### Get AI Solution

```http
POST /api/solve
Content-Type: application/json

{
  "problemNumber": 1
}
```

**Response:**

```json
{
  "success": true,
  "problem": {
    "number": 1,
    "title": "Two Sum",
    "difficulty": "Easy"
  },
  "answer": {
    "explanation": "Detailed problem breakdown...",
    "approach": "Step-by-step solution approach...",
    "solution": "Code implementation with explanation...",
    "complexity": {
      "time": "O(n)",
      "space": "O(n)"
    }
  }
}
```

### 📊 Utility Endpoints

#### Health Check

```http
GET /api/health
```

**Response:**

```json
{
  "status": "success",
  "message": "CodeMentor AI is running!",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🗂️ Project Structure

```
Code-Mentor-AI/
│
├── backend/
│   ├── config/
│   │   ├── db.js                      # MongoDB connection configuration
│   │   └── gemini.js                  # Gemini AI initialization
│   │
│   ├── controllers/
│   │   ├── auth.controller.js         # Authentication logic
│   │   └── solve.controller.js        # Problem solving logic
│   │
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT verification
│   │   └── error.middleware.js        # Error handling
│   │
│   ├── models/
│   │   ├── User.model.js              # User schema
│   │   └── Problem.model.js           # Problem schema
│   │
│   ├── routes/
│   │   ├── auth.routes.js             # Authentication routes
│   │   └── solve.routes.js            # Problem solving routes
│   │
│   ├── .env                           # Environment variables (gitignored)
│   ├── .env.example                   # Example environment file
│   ├── .gitignore                     # Git ignore rules
│   ├── server.js                      # Entry point
│   ├── package.json                   # Dependencies
│   └── package-lock.json              # Dependency lock file
│
├── frontend/                          # (Coming Soon)
│   └── README.md
│
├── .gitignore                         # Root git ignore
├── LICENSE                            # MIT License
└── README.md                          # This file
```

---

## 🎯 How It Works

### Problem Solving Flow

```
1. User Submits Problem Number
   ↓
2. Problem Validation
   ↓
3. Gemini AI Processing
   ├── Problem Analysis
   ├── Solution Generation
   ├── Code Optimization
   └── Complexity Calculation
   ↓
4. Response Formatting
   ↓
5. Return to User
```

---

## 🔧 Configuration

### Environment Variables

| Variable         | Description               | Default     | Required |
| ---------------- | ------------------------- | ----------- | -------- |
| `PORT`           | Server port               | 5000        | No       |
| `MONGO_URI`      | MongoDB connection string | -           | Yes      |
| `GEMINI_API_KEY` | Google Gemini API key     | -           | Yes      |
| `JWT_SECRET`     | Secret for JWT signing    | -           | Yes      |
| `JWT_EXPIRE`     | JWT token expiration      | 7d          | No       |
| `NODE_ENV`       | Environment mode          | development | No       |
| `CORS_ORIGIN`    | Allowed CORS origins      | \*          | No       |

---

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error

```bash
Error: MongoNetworkError: failed to connect to server
```

**Solution:**

- Check if MongoDB is running: `mongod --version`
- Verify `MONGO_URI` in `.env`
- Ensure IP whitelist in MongoDB Atlas

#### Gemini API Error

```bash
Error: Invalid API key
```

**Solution:**

- Verify API key in `.env`
- Check API quota at [Google AI Studio](https://makersuite.google.com)

#### Port Already in Use

```bash
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution:**

```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9
```

---

## 🤝 Contributing

Contributions make the open-source community thrive! We welcome contributions of all kinds.

### How to Contribute

1. **Fork the Project**

   ```bash
   git clone https://github.com/nikhilxagr/Code-Mentor-AI.git
   ```

2. **Create Feature Branch**

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Changes**
   - Write clean, documented code
   - Follow existing code style

4. **Commit Changes**

   ```bash
   git commit -m 'Add: Amazing new feature'
   ```

5. **Push to Branch**

   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open Pull Request**

---

## 📋 Roadmap

- [x] Backend API with Express.js
- [x] MongoDB Integration
- [x] Gemini AI Integration
- [ ] User Authentication System
- [ ] Frontend Development (React.js)
- [ ] User Dashboard
- [ ] Progress Tracking
- [ ] Problem Recommendation System

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Authors & Contributors

<div align="center">

### Project Collaborators

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/nikhilxagr">
        <img src="https://github.com/nikhilxagr.png" width="100px;" alt="Nikhil Agrawal"/><br />
        <sub><b>Nikhil Agrawal</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub><br />
      <a href="https://github.com/nikhilxagr">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub" />
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/ggauravky">
        <img src="https://github.com/ggauravky.png" width="100px;" alt="Gaurav Kumar Yadav"/><br />
        <sub><b>Gaurav Kumar Yadav</b></sub>
      </a><br />
      <sub>Full Stack Developer</sub><br />
      <a href="https://github.com/ggauravky">
        <img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub" />
      </a>
    </td>
  </tr>
</table>

</div>

---

## 🙏 Acknowledgments

Special thanks to:

- [Google Gemini AI](https://deepmind.google/technologies/gemini/) - For powerful AI capabilities
- [LeetCode](https://leetcode.com/) - For the amazing problem database
- [MongoDB](https://www.mongodb.com/) - For robust database solutions
- [Express.js](https://expressjs.com/) - For the excellent web framework
- Open Source Community - For continuous inspiration

---

## 📞 Support

Need help? We're here for you!

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/nikhilxagr/Code-Mentor-AI/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/nikhilxagr/Code-Mentor-AI/discussions)

---

## 🌟 Show Your Support

If **CodeMentor AI** helped you ace your interviews or improve your coding skills, give it a ⭐️!

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/nikhilxagr/Code-Mentor-AI?style=social)
![GitHub forks](https://img.shields.io/github/forks/nikhilxagr/Code-Mentor-AI?style=social)
![GitHub contributors](https://img.shields.io/github/contributors/nikhilxagr/Code-Mentor-AI)
![GitHub issues](https://img.shields.io/github/issues/nikhilxagr/Code-Mentor-AI)
![GitHub license](https://img.shields.io/github/license/nikhilxagr/Code-Mentor-AI)

</div>

---

<div align="center">

### Made with 💜 by Nikhil Agrawal & Gaurav Kumar Yadav

**Happy Coding! 🚀**

<img src="https://forthebadge.com/images/badges/built-with-love.svg" alt="Built with Love" />
<img src="https://forthebadge.com/images/badges/powered-by-coffee.svg" alt="Powered by Coffee" />

![Footer](https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=100&section=footer)

---

_"The only way to learn a new programming language is by writing programs in it."_ - Dennis Ritchie

</div>
