import { create } from 'zustand';
import { Ticket, SystemConfig, BookingDetails } from '../types/ticket';

interface TicketState {
  tickets: Ticket[];
  config: SystemConfig;
  isRunning: boolean;
  bookings: BookingDetails[];
  setConfig: (config: SystemConfig) => void;
  addTicket: (ticket: Ticket) => void;
  removeTicket: (ticketId: string) => void;
  toggleSystem: () => void;
  addBooking: (booking: BookingDetails) => void;
}

export const useTicketStore = create<TicketState>((set) => ({
  tickets: [],
  bookings: [],
  config: {
    totalTickets: 100,
    ticketReleaseRate: 1000,
    customerRetrievalRate: 2000,
    maxTicketCapacity: 50,
  },
  isRunning: false,
  setConfig: (config) => set({ config }),
  addTicket: (ticket) =>
    set((state) => ({
      tickets:
        state.tickets.length < state.config.maxTicketCapacity
          ? [...state.tickets, ticket]
          : state.tickets,
    })),
  removeTicket: (ticketId) =>
    set((state) => ({
      tickets: state.tickets.filter((t) => t.id !== ticketId),
    })),
  toggleSystem: () => set((state) => ({ isRunning: !state.isRunning })),
  addBooking: (booking) =>
    set((state) => ({
      bookings: [...state.bookings, booking],
      tickets: state.tickets.filter((t) => !booking.selectedTickets.includes(t.id)),
    })),
}));