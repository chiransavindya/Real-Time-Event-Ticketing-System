import React, { useState } from 'react';
import { Calendar, MapPin, Tag, Ticket } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';

interface BookingFormProps {
  event: {
    eventName: string;
    venue: string;
    date: string;
    category: string;
    tickets: Array<{
      id: string;
      price: number;
    }>;
  };
  onBookingComplete: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({ event, onBookingComplete }) => {
  const { addBooking } = useTicketStore();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    quantity: 1,
    selectedTickets: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedTickets.length === 0) return;

    addBooking({
      customerName: formData.customerName,
      email: formData.email,
      quantity: formData.quantity,
      selectedTickets: formData.selectedTickets,
    });

    onBookingComplete();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-6">{event.eventName}</h2>
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{event.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Tag className="w-4 h-4" />
          <span>{event.category}</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max={event.tickets.length}
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })
            }
            className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Tickets
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {event.tickets.map((ticket) => (
              <label
                key={ticket.id}
                className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded"
              >
                <input
                  type="checkbox"
                  checked={formData.selectedTickets.includes(ticket.id)}
                  onChange={(e) => {
                    const newSelected = e.target.checked
                      ? [...formData.selectedTickets, ticket.id]
                      : formData.selectedTickets.filter((id) => id !== ticket.id);
                    setFormData({ ...formData, selectedTickets: newSelected });
                  }}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm">
                  Ticket #{ticket.id.slice(-4)} - ${ticket.price}
                </span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          disabled={formData.selectedTickets.length === 0}
        >
          Complete Booking
        </button>
      </form>
    </div>
  );
};