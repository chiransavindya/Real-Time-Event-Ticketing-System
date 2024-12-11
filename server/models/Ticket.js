export class Ticket {
  constructor(eventName, price, eventDate) {
    this.id = `ticket-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.status = 'available';
    this.timestamp = new Date().toISOString();
    this.price = price;
    this.eventName = eventName;
    this.eventDate = eventDate;
  }

  static generateTickets(count) {
    const events = [
      { name: 'Summer Music Festival', price: 99.99 },
      { name: 'Tech Conference 2024', price: 149.99 },
      { name: 'Comedy Night', price: 49.99 }
    ];

    return Array.from({ length: count }, () => {
      const event = events[Math.floor(Math.random() * events.length)];
      const eventDate = new Date(Date.now() + Math.random() * 7776000000);
      return new Ticket(event.name, event.price, eventDate.toISOString());
    });
  }
}