# 🎉 Event Finder

A full-stack web application to discover and create events. Built with React, Node.js, Express, and MongoDB.

## ✨ Features

- Browse all events
- Search events by location
- Create new events
- View event details
- Real-time participant tracking
- Responsive design for all devices

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Tools:** Git, npm

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas account)
- Git

### Setup Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd event-finder
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../client
npm install
```

4. **Configure Environment Variables**

Create `server/.env` file:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/DATABASE?retryWrites=true&w=majority
```

## 🚀 Running the Application

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

Then open: http://localhost:5173

### Option 2: Run with One Command

In root directory:
```bash
npm install concurrently
npm run dev
```

## 📁 Project Structure

```
event-finder/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API calls
│   │   └── utils/       # Helper functions
│   └── package.json
│
├── server/              # Node.js backend
│   ├── config/          # Database config
│   ├── controllers/     # Business logic
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   └── package.json
│
└── README.md
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | Get all events |
| GET | `/api/events?location=Mumbai` | Filter by location |
| GET | `/api/events/:id` | Get single event |
| POST | `/api/events` | Create new event |

## 🎯 Features Implemented

- ✅ Event listing with search
- ✅ Event creation form
- ✅ Event detail page
- ✅ Location-based filtering
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design
- ✅ Form validation
- ✅ Debounced search

## 🚧 Challenges Faced

### 1. MongoDB Connection
**Problem:** Connection errors during setup  
**Solution:** Implemented proper error handling and used MongoDB Atlas with correct connection string

### 2. Search Performance
**Problem:** Too many API calls while typing  
**Solution:** Added debouncing (300ms delay) to reduce server load

### 3. CORS Issues
**Problem:** Frontend couldn't connect to backend  
**Solution:** Configured CORS properly and used Vite proxy for development

## 🤖 AI Tools Used

- **Claude AI:** Code structure, API design, problem solving
- **GitHub Copilot:** Boilerplate code and auto-completion
- **ChatGPT:** Debugging and optimization suggestions

I used AI to generate initial code but reviewed and customized everything to fit the project requirements.

## 🚀 Deployment

**Frontend:** Deployed on Render
**Backend:** Deployed on Render  
**Database:** MongoDB Atlas


## 🔮 Future Enhancements

- User authentication
- Event registration system
- Image uploads
- Map integration
- Email notifications
- Calendar sync

## 👨‍💻 Author

**Your Name**  
GitHub: [Atul Yadav](https://github.com/Atul-Yadav15)  
Email: yatul8181@gmail.com

## 📝 License

This project was created for educational purposes as part of an internship selection process.

---

**Made with ❤️ for Slanup Internship**