import React from 'react';
import { Play, Pause } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';

export const ControlPanel: React.FC = () => {
  const { isRunning, toggleSystem } = useTicketStore();

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <button
        onClick={toggleSystem}
        className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white font-medium transition-colors ${
          isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        }`}
      >
        {isRunning ? (
          <>
            <Pause className="w-5 h-5" /> Stop System
          </>
        ) : (
          <>
            <Play className="w-5 h-5" /> Start System
          </>
        )}
      </button>
    </div>
  );
};