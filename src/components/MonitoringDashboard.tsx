import React from 'react';
import { LineChart, Activity } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';

export const MonitoringDashboard: React.FC = () => {
  const { tickets, bookings, config } = useTicketStore();
  const totalRevenue = bookings.reduce((sum, booking) => 
    sum + booking.selectedTickets.length * 50, 0
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold">System Monitor</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Available Tickets</h3>
          <p className="text-2xl font-bold text-blue-600">{tickets.length}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Bookings</h3>
          <p className="text-2xl font-bold text-green-600">{bookings.length}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
          <p className="text-2xl font-bold text-purple-600">${totalRevenue}</p>
        </div>
        <div className="bg-orange-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-1">Capacity Used</h3>
          <p className="text-2xl font-bold text-orange-600">
            {Math.round((tickets.length / config.maxTicketCapacity) * 100)}%
          </p>
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Recent Bookings</h3>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {bookings.slice().reverse().map((booking, index) => (
            <div key={index} className="text-sm p-2 bg-gray-50 rounded">
              <p className="font-medium">{booking.customerName}</p>
              <p className="text-gray-500">
                {booking.selectedTickets.length} tickets - ${booking.selectedTickets.length * 50}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};