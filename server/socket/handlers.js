export function setupSocketHandlers(io, ticketService) {
  io.on('connection', (socket) => {
    console.log('Client connected');

    // Send initial state
    socket.emit('ticketUpdate', ticketService.getTickets());

    socket.on('updateConfig', (config) => {
      const updatedConfig = ticketService.updateConfig(config);
      io.emit('configUpdate', updatedConfig);
    });

    socket.on('startSystem', () => {
      const tickets = ticketService.startSystem();
      io.emit('ticketUpdate', tickets);
    });

    socket.on('stopSystem', () => {
      ticketService.stopSystem();
    });

    socket.on('resetSystem', () => {
      const tickets = ticketService.resetSystem();
      io.emit('ticketUpdate', tickets);
    });

    socket.on('purchaseTickets', ({ ticketIds, customerType }) => {
      const result = ticketService.purchaseTickets(ticketIds, customerType);
      if (result) {
        io.emit('ticketUpdate', result.tickets);
        io.emit('transactionUpdate', result.transaction);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
}