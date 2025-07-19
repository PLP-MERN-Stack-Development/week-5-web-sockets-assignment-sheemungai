import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../socket/socket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import RoomSelector from './RoomSelector';
import ConnectionStatus from './ConnectionStatus';
import NotificationSettings from './NotificationSettings';
import { 
  Bars3Icon, 
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  BellIcon 
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ChatRoom = ({ user, currentRoom, setCurrentRoom, onLogout, isConnected }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showNotificationSettings, setShowNotificationSettings] = useState(false);
  const {
    connect,
    disconnect,
    messages,
    users,
    typingUsers,
    sendMessage,
    setTyping,
    lastMessage
  } = useSocket();

  const audioRef = useRef(null);
  const documentTitleRef = useRef(document.title);

  // Connect to socket when component mounts
  useEffect(() => {
    if (user) {
      connect(user.username);
    }

    return () => {
      disconnect();
    };
  }, [user, connect, disconnect]);

  // Handle new messages for notifications
  useEffect(() => {
    if (lastMessage && lastMessage.sender !== user.username) {
      setUnreadCount(prev => prev + 1);
      
      // Play sound notification
      if (soundEnabled && audioRef.current) {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }

      // Show browser notification
      if (notificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(`New message from ${lastMessage.sender}`, {
          body: lastMessage.message,
          icon: '/chat-icon.png',
          tag: 'chat-message'
        });
      }

      // Show toast notification
      if (!document.hasFocus()) {
        toast(`📝 ${lastMessage.sender}: ${lastMessage.message.substring(0, 50)}${lastMessage.message.length > 50 ? '...' : ''}`, {
          duration: 4000,
        });
      }
    }
  }, [lastMessage, user.username, notificationsEnabled, soundEnabled]);

  // Update document title with unread count
  useEffect(() => {
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) ${documentTitleRef.current}`;
    } else {
      document.title = documentTitleRef.current;
    }
  }, [unreadCount]);

  // Reset unread count when window gains focus
  useEffect(() => {
    const handleFocus = () => {
      setUnreadCount(0);
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        setNotificationsEnabled(permission === 'granted');
      });
    } else if (Notification.permission === 'granted') {
      setNotificationsEnabled(true);
    }
  }, []);

  const handleSendMessage = (message) => {
    sendMessage(message);
    setUnreadCount(0); // Reset unread count when user sends a message
  };

  const handleLogout = () => {
    disconnect();
    onLogout();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Audio element for notification sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification-sound.mp3" type="audio/mpeg" />
        <source src="/notification-sound.wav" type="audio/wav" />
      </audio>

      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Chat App</h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800">{user.username}</p>
              <ConnectionStatus isConnected={isConnected} />
            </div>
          </div>
        </div>

        {/* Room Selector */}
        <RoomSelector currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} />

        {/* User List */}
        <UserList users={users} currentUser={user.username} typingUsers={typingUsers} />

        {/* Settings and Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t space-y-2">
          <button
            onClick={() => setShowNotificationSettings(true)}
            className="w-full flex items-center space-x-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
          >
            <BellIcon className="h-5 w-5" />
            <span>Notifications</span>
          </button>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="bg-white shadow-sm border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <Bars3Icon className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800">
                #{currentRoom}
              </h1>
              <span className="text-sm text-gray-500">
                {users.length} {users.length === 1 ? 'user' : 'users'} online
              </span>
            </div>
            
            {unreadCount > 0 && (
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            )}
          </div>
        </div>

        {/* Message List */}
        <MessageList 
          messages={messages.filter(msg => !msg.room || msg.room === currentRoom)}
          currentUser={user.username}
          typingUsers={typingUsers}
        />

        {/* Message Input */}
        <MessageInput 
          onSendMessage={handleSendMessage}
          onTyping={setTyping}
          disabled={!isConnected}
        />
      </div>

      {/* Notification Settings Modal */}
      {showNotificationSettings && (
        <NotificationSettings
          notificationsEnabled={notificationsEnabled}
          setNotificationsEnabled={setNotificationsEnabled}
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          onClose={() => setShowNotificationSettings(false)}
        />
      )}
    </div>
  );
};

export default ChatRoom;
