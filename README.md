# 🔄 Real-Time Chat Application

A modern, feature-rich real-time chat application built with **Socket.io**, **React**, and **Node.js**. Experience seamless communication with multiple rooms, typing indicators, file sharing, and much more!

![Chat Application](https://img.shields.io/badge/Status-Completed-brightgreen)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![React](https://img.shields.io/badge/React-18+-blue)
![Socket.io](https://img.shields.io/badge/Socket.io-4.7+-red)

## 🌟 Features

### ✅ Core Functionality
- **Real-time messaging** with instant delivery
- **Multiple chat rooms** (General, Random, Tech Talk, Music, Games)
- **User authentication** with username-based login
- **Online/offline status** indicators
- **Typing indicators** to show when users are composing messages
- **Message timestamps** with intelligent date formatting
- **Responsive design** that works on desktop and mobile

### ✅ Advanced Features
- **Browser notifications** with permission management
- **Sound notifications** for new messages
- **Unread message counter** in browser tab
- **File sharing** capabilities (images, documents, videos)
- **Message reactions** and acknowledgments
- **Private messaging** between users
- **Auto-reconnection** handling for network issues
- **Message delivery status**
- **Room-based user management**

### ✅ User Experience
- **Modern UI/UX** with Tailwind CSS
- **Smooth animations** and transitions
- **Loading states** and error handling
- **Toast notifications** for user feedback
- **Customizable notification settings**
- **Mobile-responsive sidebar**
- **Typing indicators** with animated dots
- **Message bubbles** with sender avatars

## 🏗️ Architecture

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── socket/         # Socket.io client configuration
│   │   └── ...
│   ├── package.json
│   └── vite.config.js
├── server/                 # Node.js backend server
│   ├── server.js          # Main server file
│   ├── uploads/           # File uploads directory
│   ├── package.json
│   └── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- Modern web browser with JavaScript enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PLP-MERN-Stack-Development/week-5-web-sockets-assignment-sheemungai.git
   cd week-5-web-sockets-assignment-sheemungai
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In the server directory
   cp .env.example .env
   
   # In the client directory
   cp .env.example .env
   ```

5. **Start the development servers**
   
   **Terminal 1 - Server:**
   ```bash
   cd server
   npm run dev
   ```
   
   **Terminal 2 - Client:**
   ```bash
   cd client
   npm run dev
   ```

6. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`
   - Enter a username to join the chat
   - Start messaging in real-time!

## 📖 Usage Guide

### Getting Started
1. **Join the Chat**: Enter your username on the login page
2. **Choose a Room**: Select from available rooms in the sidebar
3. **Start Chatting**: Type your message and press Enter to send
4. **Enable Notifications**: Click the notification icon to enable browser alerts

### Available Rooms
- 💬 **General**: Main chat room for general discussions
- 🎲 **Random**: Random conversations and topics
- 💻 **Tech Talk**: Technology discussions and programming
- 🎵 **Music**: Share and discuss your favorite music
- 🎮 **Games**: Gaming discussions and strategies

### Key Features Usage
- **File Sharing**: Click the attachment icon to share images and documents
- **Private Messages**: Click on a user's name to send private messages
- **Typing Indicators**: Start typing to show others you're composing a message
- **Reactions**: React to messages with emojis (feature can be extended)
- **Notifications**: Manage notification preferences in settings

## 🛠️ Technical Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **React Hot Toast** - Elegant notifications
- **Heroicons** - Beautiful SVG icons
- **date-fns** - Date formatting utilities

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **UUID** - Unique identifier generation

## 🔧 Configuration

### Environment Variables

**Server (.env):**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MAX_FILE_SIZE=10485760
ALLOWED_FILE_TYPES=jpeg,jpg,png,gif,webp,mp4,avi,mov,pdf,doc,docx,txt
```

**Client (.env):**
```env
VITE_SOCKET_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔒 Security Features

- **Input validation** and sanitization
- **File type restrictions** for uploads
- **File size limits** to prevent abuse
- **CORS configuration** for secure cross-origin requests
- **Environment variable protection**

## 📊 API Endpoints

- `GET /` - Server information and available endpoints
- `GET /health` - Health check with server statistics
- `GET /api/messages?room=roomName` - Get messages for a specific room
- `GET /api/users` - Get list of online users
- `GET /api/rooms` - Get available rooms with statistics
- `POST /api/upload` - Upload files (images, documents)

## 🎯 Assignment Requirements Fulfilled

### ✅ Task 1: Project Setup
- [x] Node.js server with Express
- [x] Socket.io server configuration
- [x] React frontend application
- [x] Socket.io client setup
- [x] Client-server connection established

### ✅ Task 2: Core Chat Functionality
- [x] Username-based authentication
- [x] Global chat room functionality
- [x] Message display with sender name and timestamp
- [x] Typing indicators
- [x] Online/offline status

### ✅ Task 3: Advanced Chat Features
- [x] Multiple chat rooms/channels
- [x] "User is typing" indicator
- [x] File/image sharing capability
- [x] Message reactions (framework ready)
- [x] Private messaging
- [x] Read receipts (framework ready)

### ✅ Task 4: Real-Time Notifications
- [x] New message notifications
- [x] User join/leave notifications
- [x] Unread message count
- [x] Sound notifications
- [x] Browser notifications (Web Notifications API)

### ✅ Task 5: Performance and UX Optimization
- [x] Message pagination (room-based storage)
- [x] Reconnection logic
- [x] Socket.io rooms optimization
- [x] Message delivery acknowledgment
- [x] Responsive design for all devices
- [x] Error handling and loading states
3. Multiple chat rooms or private messaging
4. Real-time notifications
5. Advanced features like typing indicators and read receipts

## Project Structure

```
socketio-chat/
├── client/                 # React front-end
│   ├── public/             # Static files
│   ├── src/                # React source code
│   │   ├── components/     # UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── socket/         # Socket.io client setup
│   │   └── App.jsx         # Main application component
│   └── package.json        # Client dependencies
├── server/                 # Node.js back-end
│   ├── config/             # Configuration files
│   ├── controllers/        # Socket event handlers
│   ├── models/             # Data models
│   ├── socket/             # Socket.io server setup
│   ├── utils/              # Utility functions
│   ├── server.js           # Main server file
│   └── package.json        # Server dependencies
└── README.md               # Project documentation
```

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Follow the setup instructions in the `Week5-Assignment.md` file
4. Complete the tasks outlined in the assignment

## Files Included

- `Week5-Assignment.md`: Detailed assignment instructions
- Starter code for both client and server:
  - Basic project structure
  - Socket.io configuration templates
  - Sample components for the chat interface

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Modern web browser
- Basic understanding of React and Express

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete both the client and server portions of the application
2. Implement the core chat functionality
3. Add at least 3 advanced features
4. Document your setup process and features in the README.md
5. Include screenshots or GIFs of your working application
6. Optional: Deploy your application and add the URLs to your README.md

## Resources

- [Socket.io Documentation](https://socket.io/docs/v4/)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)
- [Building a Chat Application with Socket.io](https://socket.io/get-started/chat) 