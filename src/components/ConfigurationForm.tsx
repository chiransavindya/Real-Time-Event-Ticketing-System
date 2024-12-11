import React, { useState } from 'react';
import { SystemConfig } from '../types/types';
import { Settings, Save } from 'lucide-react';

interface ConfigurationFormProps {
  onSubmit: (config: SystemConfig) => void;
  disabled: boolean;
}

export function ConfigurationForm({ onSubmit, disabled }: ConfigurationFormProps) {
  const [config, setConfig] = useState<SystemConfig>({
    totalTickets: 100,
    ticketReleaseRate: 5,
    customerRetrievalRate: 3,
    maxTicketCapacity: 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(config);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">System Configuration</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Total Tickets
            <input
              type="number"
              min="1"
              value={config.totalTickets}
              onChange={(e) => setConfig({ ...config, totalTickets: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={disabled}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ticket Release Rate (per minute)
            <input
              type="number"
              min="1"
              value={config.ticketReleaseRate}
              onChange={(e) => setConfig({ ...config, ticketReleaseRate: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={disabled}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Customer Retrieval Rate (per minute)
            <input
              type="number"
              min="1"
              value={config.customerRetrievalRate}
              onChange={(e) => setConfig({ ...config, customerRetrievalRate: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={disabled}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Max Ticket Capacity
            <input
              type="number"
              min="1"
              value={config.maxTicketCapacity}
              onChange={(e) => setConfig({ ...config, maxTicketCapacity: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              disabled={disabled}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          Save Configuration
        </button>
      </form>
    </div>
  );
}