const express = require("express");
const multer = require('multer');
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const User = require("./models/User");
const ChatHistory = require("./models/ChatHistory");
const Groq = require("groq-sdk");
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize Groq (or any other AI model service)
const openai = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(), 
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401); // No token provided

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token
    req.user = user; // Add user data to the request
    next();
  });
};
//test endpoint
app.get("/" , (req , res) => {
  res.status(201).json("Successfully Connected");
}
// POST endpoint for chat
app.post("/chat", authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;
    const file = req.file;
    let fileContent = null;

    // If no message is provided, return the user's chat history
    if (!message) {
      const chatHistory = await ChatHistory.find({ userId }).sort({ createdAt: 1 });
      return res.json({ history: chatHistory });
    }

    // Handle the file if it's uploaded
    if (file) {
      fileContent = file.buffer.toString('base64');
      console.log(`Received file: ${file.originalname}, size: ${file.size} bytes`);
    }

    // Prepare the message for the AI model (Groq, OpenAI, etc.)
    const messages = [
      { role: 'user', content: message }
    ];

    if (fileContent) {
      // Assuming the model can accept base64-encoded images
      messages.push({
        role: "user",
        content: [
          {
            "type": "image_url",
            "image_url": { "url": `data:image/jpeg;base64,${fileContent}` },
          },
        ],
      });
    }

    // Call the AI model to generate a response
    const response = await openai.chat.completions.create({
      model: "llama-3.2-11b-vision-preview", // Replace with the correct model
      messages: messages,
    });

    // Save both the user message and AI response to ChatHistory
    const aiResponse = response.choices[0].message.content;
    const newMessage = new ChatHistory({ userId, message, role: "user" });
    await newMessage.save();
    const aiMessage = new ChatHistory({ userId, message: aiResponse, role: "assistant" });
    await aiMessage.save();

    // Send AI response back to the client
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error in chat:", error);
    res.status(500).json({ error: "Error processing chat" });
  }
});

// POST endpoint for user registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST endpoint for user login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the hashed password with the user-provided password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a token with a 7-day expiration
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
