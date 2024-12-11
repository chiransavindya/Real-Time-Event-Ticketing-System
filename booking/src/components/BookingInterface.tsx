import React, { useState } from 'react';
import { ShoppingCart, Calendar, MapPin, Tag } from 'lucide-react';
import { useTicketStore } from '../store/ticketStore';
import { EventCard } from './EventCard';
import { BookingForm } from './BookingForm';

export const BookingInterface: React.FC = () => {
  const { tickets } = useTicketStore();
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const events = tickets.reduce((acc, ticket) => {
    const existingEvent = acc.find(e => e.eventName === ticket.eventName);
    if (existingEvent) {
      existingEvent.tickets.push(ticket);
    } else {
      acc.push({
        eventName: ticket.eventName,
        venue: ticket.venue,
        date: ticket.date,
        category: ticket.category,
        tickets: [ticket]
      });
    }
    return acc;
  }, [] as Array<{
    eventName: string;
    venue: string;
    date: string;
    category: string;
    tickets: typeof tickets;
  }>);

  return (
    <div className="space-y-6">
      {selectedEvent ? (
        <div>
          <button
            onClick={() => setSelectedEvent(null)}
            className="mb-4 text-blue-600 hover:text-blue-700 flex items-center gap-2"
          >
            ← Back to Events
          </button>
          <BookingForm 
            event={events.find(e => e.eventName === selectedEvent)!}
            onBookingComplete={() => setSelectedEvent(null)}
          />
        </div>
      ) : (
        <div className="grid gap-6">
          {events.map((event) => (
            <EventCard
              key={event.eventName}
              event={event}
              onSelect={() => setSelectedEvent(event.eventName)}
            />
          ))}
        </div>
      )}
    </div>
  );
};