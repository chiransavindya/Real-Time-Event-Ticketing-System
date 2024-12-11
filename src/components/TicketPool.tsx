import React from 'react';
import { Ticket } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';

export const TicketPool: React.FC = () => {
  const { tickets, config } = useTicketStore();
  const capacity = (tickets.length / config.maxTicketCapacity) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Ticket className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Ticket Pool Status</h2>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Available Tickets:</span>
          <span className="text-lg font-semibold">{tickets.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${capacity}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 text-right">
          {tickets.length} / {config.maxTicketCapacity} tickets
        </div>
      </div>
    </div>
  );
};