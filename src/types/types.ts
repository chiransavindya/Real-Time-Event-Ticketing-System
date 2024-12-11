export interface Ticket {
  id: string;
  status: 'available' | 'sold';
  timestamp: string;
  price: number;
  eventName: string;
  eventDate: string;
}

export interface SystemConfig {
  totalTickets: number;
  ticketReleaseRate: number;
  customerRetrievalRate: number;
  maxTicketCapacity: number;
}

export interface TicketPoolStatus {
  availableTickets: number;
  totalSold: number;
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: 'RELEASE' | 'PURCHASE';
  timestamp: string;
  quantity: number;
  customerType?: 'VIP' | 'REGULAR';
  customerId?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  type: 'VIP' | 'REGULAR';
  purchaseHistory: Transaction[];
}