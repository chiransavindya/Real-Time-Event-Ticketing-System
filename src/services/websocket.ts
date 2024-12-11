import { io, Socket } from 'socket.io-client';
import { useTicketStore } from '../store/ticketStore';
import { Ticket, Transaction } from '../types/types';

class WebSocketService {
  private socket: Socket | null = null;
  private static instance: WebSocketService;

  private constructor() {
    this.socket = io('http://localhost:8080', {
      transports: ['websocket', 'polling'],
      autoConnect: true
    });

    this.setupListeners();
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on('ticketUpdate', (tickets: Ticket[]) => {
      useTicketStore.getState().setTickets(tickets);
    });

    this.socket.on('transactionUpdate', (transaction: Transaction) => {
      useTicketStore.getState().addTransaction(transaction);
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });
  }

  public purchaseTickets(ticketIds: string[]): void {
    this.socket?.emit('purchaseTickets', {
      ticketIds,
      customerType: useTicketStore.getState().customer?.type || 'REGULAR'
    });
  }

  public disconnect(): void {
    this.socket?.disconnect();
  }

  get socket() {
    return this.socket;
  }
}

export const websocketService = WebSocketService.getInstance();