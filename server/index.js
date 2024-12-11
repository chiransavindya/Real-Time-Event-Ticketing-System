import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { config } from './config/index.js';
import { TicketService } from './services/TicketService.js';
import { setupSocketHandlers } from './socket/handlers.js';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.cors.origins,
    methods: config.cors.methods
  }
});

const ticketService = new TicketService();
setupSocketHandlers(io, ticketService);

httpServer.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});