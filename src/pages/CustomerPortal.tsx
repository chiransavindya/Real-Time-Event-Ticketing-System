import React, { useState } from 'react';
import { useTicketStore } from '../store/ticketStore';
import { useWebSocket } from '../hooks/useWebSocket';
import { ShoppingCart, Crown, Ticket as TicketIcon } from 'lucide-react';

export function CustomerPortal() {
  const { tickets, customer } = useTicketStore();
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const websocket = useWebSocket();

  const handleTicketSelect = (ticketId: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketId)
        ? prev.filter((id) => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const handlePurchase = () => {
    websocket.purchaseTickets(selectedTickets);
    setSelectedTickets([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Event Ticket Purchase Portal
          </h1>
          {customer && (
            <div className="flex items-center gap-2">
              {customer.type === 'VIP' && (
                <Crown className="w-6 h-6 text-yellow-500" />
              )}
              <span className="text-lg font-medium">
                Welcome, {customer.name}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                ticket.status === 'sold' ? 'opacity-50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{ticket.eventName}</h3>
                  <p className="text-gray-600">
                    {new Date(ticket.eventDate).toLocaleDateString()}
                  </p>
                </div>
                <TicketIcon className="w-6 h-6 text-blue-600" />
              </div>
              
              <div className="mb-4">
                <p className="text-2xl font-bold text-blue-600">
                  ${ticket.price}
                </p>
              </div>

              <button
                onClick={() => handleTicketSelect(ticket.id)}
                disabled={ticket.status === 'sold'}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md ${
                  selectedTickets.includes(ticket.id)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                } hover:bg-blue-700 hover:text-white disabled:opacity-50`}
              >
                <ShoppingCart className="w-4 h-4" />
                {selectedTickets.includes(ticket.id)
                  ? 'Selected'
                  : 'Select Ticket'}
              </button>
            </div>
          ))}
        </div>

        {selectedTickets.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div>
                <p className="text-lg font-medium">
                  Selected Tickets: {selectedTickets.length}
                </p>
                <p className="text-gray-600">
                  Total: $
                  {tickets
                    .filter((t) => selectedTickets.includes(t.id))
                    .reduce((sum, t) => sum + t.price, 0)}
                </p>
              </div>
              <button 
                onClick={handlePurchase}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
              >
                Purchase Tickets
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}