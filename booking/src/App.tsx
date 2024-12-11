import React from 'react';
import { BookingInterface } from './components/BookingInterface';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Event Ticket Booking
        </h1>
        <BookingInterface />
      </div>
    </div>
  );
}

export default App;