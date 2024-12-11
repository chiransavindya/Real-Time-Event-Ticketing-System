import React, { useEffect } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { TicketPool } from './components/TicketPool';
import { ControlPanel } from './components/ControlPanel';
import { BookingForm } from './components/BookingForm';
import { MonitoringDashboard } from './components/MonitoringDashboard';
import { useTicketStore } from './store/ticketStore';

function App() {
  const { isRunning, config, addTicket, removeTicket } = useTicketStore();

  useEffect(() => {
    if (!isRunning) return;

    const vendorInterval = setInterval(() => {
      const newTicket = {
        id: crypto.randomUUID(),
        eventName: 'Sample Event',
        price: Math.floor(Math.random() * 100) + 50,
        timestamp: Date.now(),
        venue: 'Main Arena',
        date: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        category: ['VIP', 'Standard', 'Economy'][Math.floor(Math.random() * 3)],
      };
      addTicket(newTicket);
    }, config.ticketReleaseRate);

    const customerInterval = setInterval(() => {
      const tickets = useTicketStore.getState().tickets;
      if (tickets.length > 0) {
        const randomIndex = Math.floor(Math.random() * tickets.length);
        removeTicket(tickets[randomIndex].id);
      }
    }, config.customerRetrievalRate);

    return () => {
      clearInterval(vendorInterval);
      clearInterval(customerInterval);
    };
  }, [isRunning, config.ticketReleaseRate, config.customerRetrievalRate]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Real-Time Event Ticketing System
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-6">
            <ConfigPanel />
            <ControlPanel />
          </div>
          <div>
            <BookingForm />
          </div>
          <div>
            <MonitoringDashboard />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;