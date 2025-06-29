# Laplace's Chatbot 🤖

A full-stack AI-powered chatbot application built with React.js and Node.js, featuring advanced vision capabilities, real-time communication, and comprehensive user authentication. This project was developed as part of the Inter IIT Bootcamp Dev Task.

## 🌟 Live Demo

🚀 **Frontend**: [laplacechatbot.vercel.app](https://laplacechatbot.vercel.app)  
🔧 **Backend**: [laplacechatbot.onrender.com](https://laplacechatbot.onrender.com)

## ✨ Key Features

### 🧠 AI-Powered Conversations
- **Groq API Integration**: Powered by Meta's Llama 3.2 11B Vision model
- **Vision Capabilities**: Upload and analyze images, charts, documents, and visual content
- **Natural Language Processing**: Advanced text understanding and generation
- **Real-time Responses**: Streaming responses with typing effects

### 🎨 Enhanced User Experience
- **Typing Animation**: Character-by-character response display
- **Speech Integration**: 
  - 🎤 Speech-to-text input
  - 🔊 Text-to-speech output (optional)
- **Code Highlighting**: Syntax highlighting for code blocks with copy functionality
- **File Upload**: Support for image and document uploads
- **Responsive Design**: Mobile and desktop optimized interface

### 🔐 Security & Authentication
- **JWT Authentication**: Secure user authentication with JSON Web Tokens
- **Password Encryption**: Bcrypt hashing for secure password storage
- **Session Management**: Persistent login with cookie-based sessions
- **Route Protection**: Secured API endpoints with middleware validation

### 💾 Data Management
- **MongoDB Integration**: Persistent data storage
- **Chat History**: Complete conversation history per user
- **User Management**: Registration, login, and profile management
- **File Processing**: Secure file upload and processing with Multer

## 🛠️ Technology Stack

### Frontend
- **React.js** (18.3.1) - UI framework
- **Axios** - HTTP client for API requests
- **React Router DOM** - Client-side routing
- **React Syntax Highlighter** - Code syntax highlighting
- **Prism.js** - Additional syntax highlighting
- **JS Cookie** - Cookie management
- **File Saver** - File download functionality

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Groq SDK** - AI model integration
- **Multer** - File upload middleware
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### AI & APIs
- **Groq API** - Fast LLM inference
- **Llama 3.2 11B Vision** - Multimodal AI model
- **Speech Recognition API** - Browser speech-to-text
- **Speech Synthesis API** - Browser text-to-speech

## 📦 Installation & Setup

### Prerequisites
```bash
Node.js (v14 or higher)
npm or yarn
MongoDB database
Groq API key
```

### 1. Clone the Repository
```bash
git clone https://github.com/laladwesh/laplacechatbot.git
cd laplacechatbot
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/laplacechatbot
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/laplacechatbot

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Groq API Configuration
GROQ_API_KEY=your-groq-api-key-here

# Server Configuration
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup
```bash
cd client
npm install
```

Create a `.env` file in the client directory:
```env
# Backend API URL
REACT_APP_BACKEND_URL=http://localhost:5000
# For production: https://your-backend-domain.com
```

### 4. Start the Application

**Backend (Terminal 1):**
```bash
cd server
npm install
npx nodemon index.js
```

**Frontend (Terminal 2):**
```bash
cd client
npm install
npm start
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 🔑 API Keys Setup

### Groq API Key
1. Visit [Groq Console](https://console.groq.com/)
2. Create an account or sign in
3. Navigate to API Keys section
4. Generate a new API key
5. Add it to your `.env` file as `GROQ_API_KEY`

### MongoDB Setup
**Option 1: Local MongoDB**
```bash
# Install MongoDB locally
# Start MongoDB service
mongod

# Use connection string: mongodb://localhost:27017/laplacechatbot
```

**Option 2: MongoDB Atlas (Cloud)**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Replace `MONGODB_URI` in `.env` file

## 🚀 Deployment

### Frontend Deployment (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel

# Follow prompts for configuration
```

### Backend Deployment (Render/Railway/Heroku)
1. Push code to GitHub repository
2. Connect repository to deployment platform
3. Set environment variables in platform dashboard
4. Deploy backend service

### Environment Variables for Production
```env
# Backend (.env)
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
GROQ_API_KEY=your-groq-api-key
PORT=5000
NODE_ENV=production

# Frontend (.env)
REACT_APP_BACKEND_URL=https://your-backend-domain.com
```

## 📁 Project Structure

```
laplacechatbot/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source code
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Styling
│   │   └── index.js       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── .env              # Frontend environment variables
│
├── server/                # Node.js backend
│   ├── models/           # MongoDB schemas
│   │   ├── User.js       # User model
│   │   └── ChatHistory.js # Chat history model
│   ├── uploads/          # File upload directory
│   ├── index.js          # Main server file
│   ├── package.json      # Backend dependencies
│   └── .env             # Backend environment variables
│
└── README.md            # Project documentation
```

## 🔧 API Endpoints

### Authentication
```
POST /register          # User registration
POST /login            # User login
```

### Chat
```
POST /chat             # Send message & get AI response
                      # Supports text and file uploads
```

### Health Check
```
GET /                  # Server status check
```

## 🎯 Usage Examples

### Basic Chat
1. Register a new account or login
2. Type your message in the chat input
3. Press Enter or click Send
4. Watch the AI respond with typing animation

### Image Analysis
1. Click the file upload button
2. Select an image file
3. Add a text prompt about the image
4. Send the message
5. AI will analyze and describe the image

### Voice Interaction
1. Click the microphone button
2. Speak your message
3. Text will be converted from speech
4. Enable text-to-speech for audio responses

### Code Assistance
1. Ask coding questions
2. Request code examples
3. Copy code blocks with the copy button
4. Syntax highlighting automatically applied

## 🔍 Features Deep Dive

### Llama 3.2 Vision Capabilities
- **Document Understanding**: Analyze charts, graphs, and documents
- **Image Captioning**: Generate descriptions of uploaded images
- **Visual Question Answering**: Answer questions about image content
- **Object Detection**: Identify and locate objects in images

### Security Implementation
- **JWT Tokens**: Secure authentication with 1-hour expiration
- **Password Hashing**: Bcrypt with salt rounds for secure storage
- **CORS Protection**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs

### Performance Optimizations
- **Lazy Loading**: Components loaded on demand
- **Caching**: Browser caching for static assets
- **Compression**: Gzip compression for API responses
- **CDN**: Vercel CDN for fast global delivery

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes and commit**: `git commit -m 'Add new feature'`
4. **Push to branch**: `git push origin feature/new-feature`
5. **Create a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Add comments for complex functionality
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**1. Backend Connection Failed**
```bash
# Check if backend is running
curl http://localhost:5000

# Verify environment variables
echo $MONGODB_URI
echo $GROQ_API_KEY
```

**2. Frontend Build Errors**
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Database Connection Issues**
```bash
# Check MongoDB status
mongod --dbpath /path/to/db

# Verify connection string format
mongodb://[username:password@]host1[:port1][/database]
```

**4. API Key Issues**
- Verify Groq API key is valid and active
- Check API key permissions and quota
- Ensure proper environment variable setup

## 📊 Performance Metrics

- **Response Time**: Average AI response in <2 seconds
- **Uptime**: 99.9% availability target
- **Security**: JWT token-based authentication
- **Scalability**: Horizontal scaling ready

## 🔮 Future Enhancements

- [ ] **Multi-language Support**: Support for multiple languages
- [ ] **Voice Cloning**: Custom voice models
- [ ] **File Format Expansion**: Support for more file types
- [ ] **Real-time Collaboration**: Multi-user chat rooms
- [ ] **Mobile App**: React Native mobile application
- [ ] **Plugin System**: Extensible plugin architecture
- [ ] **Analytics Dashboard**: Usage analytics and insights

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Laladwesh**
- GitHub: [@laladwesh](https://github.com/laladwesh)
- Project: [Laplace's Chatbot](https://github.com/laladwesh/laplacechatbot)

## 🙏 Acknowledgments

- **Meta AI** for Llama 3.2 Vision model
- **Groq** for fast LLM inference platform
- **Vercel** for hosting and deployment
- **MongoDB** for database services
- **React Community** for amazing ecosystem
- **Inter IIT Bootcamp** for the development opportunity

## 📞 Support

If you encounter any issues or have questions:

1. **Check the Troubleshooting section** above
2. **Search existing issues** on GitHub
3. **Create a new issue** with detailed description
4. **Join our community** discussions

---

**⭐ Star this repository if you find it helpful!**

**🔄 Fork this repository to create your own chatbot!**

**📤 Share with others who might benefit from this project!**

---

*Built with ❤️ for the AI community*
