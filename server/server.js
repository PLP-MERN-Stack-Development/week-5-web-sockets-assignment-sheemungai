// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow images, videos, and documents
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|avi|mov|pdf|doc|docx|txt/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Store connected users, messages, and rooms
const users = {};
const rooms = {
  general: { name: 'General', messages: [], users: new Set() },
  random: { name: 'Random', messages: [], users: new Set() },
  tech: { name: 'Tech Talk', messages: [], users: new Set() },
  music: { name: 'Music', messages: [], users: new Set() },
  games: { name: 'Games', messages: [], users: new Set() }
};
const typingUsers = {};

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // Handle user joining
  socket.on('user_join', (username) => {
    users[socket.id] = { 
      username, 
      id: socket.id, 
      currentRoom: 'general',
      joinedAt: new Date().toISOString()
    };
    
    // Join the general room by default
    socket.join('general');
    rooms.general.users.add(socket.id);
    
    // Emit to all users
    io.emit('user_list', Object.values(users));
    io.to('general').emit('user_joined', { username, id: socket.id, room: 'general' });
    
    console.log(`${username} joined the chat`);
  });

  // Handle room joining
  socket.on('join_room', (roomName) => {
    if (!rooms[roomName] || !users[socket.id]) return;
    
    const user = users[socket.id];
    const oldRoom = user.currentRoom;
    
    // Leave old room
    if (oldRoom && rooms[oldRoom]) {
      socket.leave(oldRoom);
      rooms[oldRoom].users.delete(socket.id);
      io.to(oldRoom).emit('user_left_room', { username: user.username, room: oldRoom });
    }
    
    // Join new room
    socket.join(roomName);
    rooms[roomName].users.add(socket.id);
    users[socket.id].currentRoom = roomName;
    
    // Send room messages to user
    socket.emit('room_messages', rooms[roomName].messages.slice(-50)); // Last 50 messages
    
    // Notify room users
    io.to(roomName).emit('user_joined_room', { username: user.username, room: roomName });
    
    console.log(`${user.username} joined room: ${roomName}`);
  });

  // Handle chat messages
  socket.on('send_message', (messageData) => {
    const user = users[socket.id];
    if (!user) return;
    
    const roomName = user.currentRoom || 'general';
    const message = {
      ...messageData,
      id: Date.now() + Math.random(), // Ensure unique ID
      sender: user.username,
      senderId: socket.id,
      timestamp: new Date().toISOString(),
      room: roomName,
    };
    
    // Store message in room
    rooms[roomName].messages.push(message);
    
    // Limit stored messages per room to prevent memory issues
    if (rooms[roomName].messages.length > 200) {
      rooms[roomName].messages.shift();
    }
    
    // Send to all users in the room
    io.to(roomName).emit('receive_message', message);
    
    console.log(`Message in ${roomName} from ${user.username}: ${message.message}`);
  });

  // Handle typing indicator
  socket.on('typing', (isTyping) => {
    const user = users[socket.id];
    if (!user) return;
    
    const roomName = user.currentRoom || 'general';
    
    if (isTyping) {
      typingUsers[socket.id] = user.username;
    } else {
      delete typingUsers[socket.id];
    }
    
    // Send typing status to room users only
    const roomTypingUsers = Object.entries(typingUsers)
      .filter(([socketId]) => users[socketId]?.currentRoom === roomName)
      .map(([, username]) => username);
    
    io.to(roomName).emit('typing_users', roomTypingUsers);
  });

  // Handle private messages
  socket.on('private_message', ({ to, message }) => {
    const sender = users[socket.id];
    if (!sender) return;
    
    const messageData = {
      id: Date.now() + Math.random(),
      sender: sender.username,
      senderId: socket.id,
      message,
      timestamp: new Date().toISOString(),
      isPrivate: true,
      to: to,
    };
    
    // Send to recipient and sender
    socket.to(to).emit('private_message', messageData);
    socket.emit('private_message', messageData);
    
    console.log(`Private message from ${sender.username} to user ${to}`);
  });

  // Handle message reactions
  socket.on('react_to_message', ({ messageId, reaction, roomName }) => {
    const user = users[socket.id];
    if (!user || !rooms[roomName]) return;
    
    const reactionData = {
      messageId,
      reaction,
      username: user.username,
      timestamp: new Date().toISOString(),
    };
    
    io.to(roomName).emit('message_reaction', reactionData);
    console.log(`${user.username} reacted ${reaction} to message ${messageId} in ${roomName}`);
  });

  // Handle message acknowledgment
  socket.on('message_delivered', ({ messageId, roomName }) => {
    const user = users[socket.id];
    if (!user) return;
    
    socket.to(roomName).emit('message_acknowledged', {
      messageId,
      acknowledgedBy: user.username,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      const roomName = user.currentRoom;
      
      // Remove from room
      if (roomName && rooms[roomName]) {
        rooms[roomName].users.delete(socket.id);
        io.to(roomName).emit('user_left', { username: user.username, id: socket.id, room: roomName });
      }
      
      console.log(`${user.username} left the chat`);
    }
    
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    // Update user list for all users
    io.emit('user_list', Object.values(users));
  });

  // Handle reconnection
  socket.on('reconnect_user', (username) => {
    console.log(`User ${username} reconnecting with socket ${socket.id}`);
    // Handle reconnection logic here
    socket.emit('reconnect_success', { message: 'Successfully reconnected!' });
  });
});

// API routes
app.get('/api/messages', (req, res) => {
  const { room = 'general' } = req.query;
  const roomMessages = rooms[room] ? rooms[room].messages : [];
  res.json(roomMessages);
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/api/rooms', (req, res) => {
  const roomList = Object.keys(rooms).map(roomId => ({
    id: roomId,
    name: rooms[roomId].name,
    userCount: rooms[roomId].users.size,
    messageCount: rooms[roomId].messages.length
  }));
  res.json(roomList);
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileInfo = {
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype,
    url: `/uploads/${req.file.filename}`
  };

  res.json(fileInfo);
});

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    connections: Object.keys(users).length,
    rooms: Object.keys(rooms).length
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Socket.io Chat Server is running',
    version: '1.0.0',
    endpoints: {
      '/api/messages': 'Get messages for a room',
      '/api/users': 'Get online users',
      '/api/rooms': 'Get available rooms',
      '/api/upload': 'Upload files',
      '/health': 'Health check'
    }
  });
});

// Create uploads directory if it doesn't exist
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Client URL: ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
  });
});

module.exports = { app, server, io }; 