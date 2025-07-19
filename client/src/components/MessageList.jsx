import React, { useEffect, useRef } from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, currentUser, typingUsers }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
      {messages.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-lg mb-2">👋 Welcome to the chat!</p>
          <p>Start a conversation by sending your first message.</p>
        </div>
      ) : (
        messages.map((message) => (
          <Message 
            key={message.id}
            message={message}
            isOwnMessage={message.sender === currentUser}
          />
        ))
      )}
      
      {typingUsers.length > 0 && (
        <TypingIndicator users={typingUsers.filter(user => user !== currentUser)} />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
