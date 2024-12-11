export class Transaction {
  constructor(type, quantity, customerType) {
    this.id = `trans-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    this.type = type;
    this.timestamp = new Date().toISOString();
    this.quantity = quantity;
    this.customerType = customerType;
  }
}