import React from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const ConnectionStatus = ({ isConnected }) => {
  return (
    <div className="flex items-center space-x-1">
      {isConnected ? (
        <>
          <CheckCircleIcon className="h-3 w-3 text-green-500" />
          <span className="text-xs text-green-600">Online</span>
        </>
      ) : (
        <>
          <ExclamationCircleIcon className="h-3 w-3 text-red-500" />
          <span className="text-xs text-red-600">Connecting...</span>
        </>
      )}
    </div>
  );
};

export default ConnectionStatus;
