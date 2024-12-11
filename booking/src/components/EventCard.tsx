import React from 'react';
import { Calendar, MapPin, Tag, Ticket } from 'lucide-react';

interface EventCardProps {
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
  onSelect: () => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const minPrice = Math.min(...event.tickets.map(t => t.price));
  const maxPrice = Math.max(...event.tickets.map(t => t.price));

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">{event.eventName}</h3>
        <div className="space-y-2 mb-4">
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
          <div className="flex items-center gap-2 text-gray-600">
            <Ticket className="w-4 h-4" />
            <span>{event.tickets.length} tickets available</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-gray-600">
            <span className="font-semibold">${minPrice}</span>
            {maxPrice > minPrice && ` - $${maxPrice}`}
          </div>
          <button
            onClick={onSelect}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};