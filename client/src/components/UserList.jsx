import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';

const UserList = ({ users, currentUser, typingUsers }) => {
  const sortedUsers = users.sort((a, b) => {
    // Current user first
    if (a.username === currentUser) return -1;
    if (b.username === currentUser) return 1;
    // Then alphabetically
    return a.username.localeCompare(b.username);
  });

  return (
    <div className="flex-1 p-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">
        Online Users ({users.length})
      </h3>
      <div className="space-y-2">
        {sortedUsers.map((user) => {
          const isTyping = typingUsers.includes(user.username);
          const isCurrentUser = user.username === currentUser;
          
          return (
            <div
              key={user.id}
              className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                isCurrentUser 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCurrentUser
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-gradient-to-r from-green-400 to-blue-500 text-white'
                }`}>
                  {user.username.charAt(0).toUpperCase()}
                </div>
                {/* Online indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <p className={`text-sm font-medium truncate ${
                    isCurrentUser ? 'text-blue-700' : 'text-gray-700'
                  }`}>
                    {user.username}
                    {isCurrentUser && (
                      <span className="text-xs text-blue-500 ml-1">(You)</span>
                    )}
                  </p>
                </div>
                
                {isTyping && (
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="flex space-x-0.5">
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-blue-500">typing...</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      {users.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          <UserIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No users online</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
