import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import LoginForm from './components/LoginForm';
import ChatRoom from './components/ChatRoom';
import { useSocket } from './socket/socket';

function App() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState('general');
  const { isConnected } = useSocket();

  // Check for stored user on app start
  useEffect(() => {
    const storedUser = localStorage.getItem('chatUser');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        localStorage.removeItem('chatUser');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('chatUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('chatUser');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
      {!user ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <ChatRoom 
          user={user}
          currentRoom={currentRoom}
          setCurrentRoom={setCurrentRoom}
          onLogout={handleLogout}
          isConnected={isConnected}
        />
      )}
    </div>
  );
}

export default App;
