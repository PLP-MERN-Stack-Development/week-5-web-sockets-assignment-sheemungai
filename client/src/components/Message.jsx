import React from 'react';
import { format, isToday, isYesterday } from 'date-fns';

const Message = ({ message, isOwnMessage }) => {
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return `Yesterday ${format(date, 'HH:mm')}`;
    } else {
      return format(date, 'MMM dd, HH:mm');
    }
  };

  // System messages (user joined/left)
  if (message.system) {
    return (
      <div className="flex justify-center">
        <div className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
          {message.message}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} message-animation`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
        {/* Sender name (only for other users' messages) */}
        {!isOwnMessage && (
          <div className="text-sm text-gray-600 mb-1 ml-1">
            {message.sender}
          </div>
        )}
        
        {/* Message bubble */}
        <div className={`px-4 py-2 rounded-2xl ${
          isOwnMessage 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-white text-gray-800 shadow-sm border'
        }`}>
          <p className="text-sm">{message.message}</p>
          
          {/* Timestamp */}
          <div className={`text-xs mt-1 ${
            isOwnMessage ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {formatTimestamp(message.timestamp)}
            {message.isPrivate && (
              <span className="ml-1 font-medium">🔒</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Avatar for other users */}
      {!isOwnMessage && (
        <div className="order-0 mr-2 mt-auto">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {message.sender.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
