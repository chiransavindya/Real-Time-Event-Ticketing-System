import { Ticket } from '../models/Ticket.js';
import { Transaction } from '../models/Transaction.js';

export class TicketService {
  constructor() {
    this.tickets = new Map();
    this.transactions = [];
    this.systemConfig = {
      totalTickets: 100,
      ticketReleaseRate: 5,
      customerRetrievalRate: 3,
      maxTicketCapacity: 50
    };
    this.isSystemRunning = false;
  }

  updateConfig(config) {
    this.systemConfig = { ...this.systemConfig, ...config };
    return this.systemConfig;
  }

  startSystem() {
    this.isSystemRunning = true;
    const newTickets = Ticket.generateTickets(this.systemConfig.totalTickets);
    newTickets.forEach(ticket => this.tickets.set(ticket.id, ticket));
    return Array.from(this.tickets.values());
  }

  stopSystem() {
    this.isSystemRunning = false;
  }

  resetSystem() {
    this.tickets.clear();
    this.transactions = [];
    return [];
  }

  purchaseTickets(ticketIds, customerType) {
    const purchasedTickets = [];
    
    for (const id of ticketIds) {
      const ticket = this.tickets.get(id);
      if (ticket && ticket.status === 'available') {
        ticket.status = 'sold';
        purchasedTickets.push(ticket);
      }
    }

    if (purchasedTickets.length > 0) {
      const transaction = new Transaction('PURCHASE', purchasedTickets.length, customerType);
      this.transactions.push(transaction);
      return { tickets: Array.from(this.tickets.values()), transaction };
    }

    return null;
  }

  getTickets() {
    return Array.from(this.tickets.values());
  }
}