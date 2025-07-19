import React, { useState, useRef } from 'react';
import { PaperAirplaneIcon, PhotoIcon, DocumentIcon } from '@heroicons/react/24/outline';

const MessageInput = ({ onSendMessage, onTyping, disabled }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Handle typing indicator
    if (!isTyping) {
      setIsTyping(true);
      onTyping(true);
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      onTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!message.trim() || disabled) return;

    onSendMessage(message.trim());
    setMessage('');
    
    // Stop typing indicator
    if (isTyping) {
      setIsTyping(false);
      onTyping(false);
    }
    
    // Clear timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // For now, just send the file name as a message
      // In a real app, you'd upload the file and send a file message
      onSendMessage(`📁 File shared: ${file.name}`);
    }
  };

  return (
    <div className="bg-white border-t p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-2">
        {/* File attachment button */}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Attach file"
        >
          <PhotoIcon className="h-5 w-5" />
        </button>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileSelect}
          accept="image/*,video/*,.pdf,.doc,.docx,.txt"
        />

        {/* Message input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={disabled ? "Connecting..." : "Type your message..."}
            disabled={disabled}
            rows={1}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ minHeight: '40px', maxHeight: '120px' }}
            onInput={(e) => {
              // Auto-resize textarea
              e.target.style.height = 'auto';
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
            }}
          />
        </div>

        {/* Send button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          title="Send message"
        >
          <PaperAirplaneIcon className="h-5 w-5" />
        </button>
      </form>

      {/* Character limit indicator */}
      {message.length > 400 && (
        <div className="text-xs text-gray-500 mt-1 text-right">
          {500 - message.length} characters remaining
        </div>
      )}
    </div>
  );
};

export default MessageInput;
