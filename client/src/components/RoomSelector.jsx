import React from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const RoomSelector = ({ currentRoom, setCurrentRoom }) => {
  const rooms = [
    { id: 'general', name: 'General', emoji: '💬' },
    { id: 'random', name: 'Random', emoji: '🎲' },
    { id: 'tech', name: 'Tech Talk', emoji: '💻' },
    { id: 'music', name: 'Music', emoji: '🎵' },
    { id: 'games', name: 'Games', emoji: '🎮' }
  ];

  return (
    <div className="p-4 border-b">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Rooms</h3>
      <div className="space-y-1">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => setCurrentRoom(room.id)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
              currentRoom === room.id
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="text-lg">{room.emoji}</span>
            <span className="text-sm font-medium">{room.name}</span>
            {currentRoom === room.id && (
              <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoomSelector;
