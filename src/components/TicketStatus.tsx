import React from 'react';
import { TicketPoolStatus } from '../types/types';
import { Ticket, Timer } from 'lucide-react';

interface TicketStatusProps {
  status: TicketPoolStatus;
}

export function TicketStatus({ status }: TicketStatusProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Ticket className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">Ticket Pool Status</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Available Tickets</p>
          <p className="text-2xl font-bold text-blue-600">{status.availableTickets}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Total Sold</p>
          <p className="text-2xl font-bold text-green-600">{status.totalSold}</p>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Transactions</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {status.recentTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
            >
              <Timer className="w-4 h-4 text-gray-600" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  {transaction.type === 'RELEASE' ? 'Released' : 'Purchased'}{' '}
                  {transaction.quantity} tickets
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}