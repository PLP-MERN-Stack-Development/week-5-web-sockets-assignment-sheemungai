import React from 'react';
import { XMarkIcon, BellIcon, SpeakerWaveIcon } from '@heroicons/react/24/outline';

const NotificationSettings = ({ 
  notificationsEnabled, 
  setNotificationsEnabled, 
  soundEnabled, 
  setSoundEnabled, 
  onClose 
}) => {
  const handleNotificationToggle = async (enabled) => {
    if (enabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        setNotificationsEnabled(permission === 'granted');
      }
    } else {
      setNotificationsEnabled(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Notification Settings</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Browser Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BellIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Browser Notifications</p>
                <p className="text-sm text-gray-500">Get notified of new messages</p>
              </div>
            </div>
            <button
              onClick={() => handleNotificationToggle(!notificationsEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                notificationsEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Sound Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <SpeakerWaveIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Sound Notifications</p>
                <p className="text-sm text-gray-500">Play sound for new messages</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                soundEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notification Permission Status */}
          {!notificationsEnabled && 'Notification' in window && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                {Notification.permission === 'denied' 
                  ? '🚫 Browser notifications are blocked. Enable them in your browser settings.'
                  : '💡 Click the toggle above to enable browser notifications.'
                }
              </p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
