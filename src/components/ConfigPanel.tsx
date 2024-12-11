import React from 'react';
import { Settings } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import type { SystemConfig } from '../types/ticket';

export const ConfigPanel: React.FC = () => {
  const { config, setConfig } = useTicketStore();

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setConfig({
      ...config,
      [name]: parseInt(value, 10),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">System Configuration</h2>
      </div>
      <div className="space-y-4">
        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleConfigChange}
              className="border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
        ))}
      </div>
    </div>
  );
};