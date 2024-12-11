export interface Ticket {
  id: string;
  eventName: string;
  price: number;
  timestamp: number;
  venue: string;
  date: string;
  category: string;
}

export interface SystemConfig {
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
  maxTicketCapacity: number;
}

export interface BookingDetails {
  customerName: string;
  email: string;
  quantity: number;
  selectedTickets: string[];
}