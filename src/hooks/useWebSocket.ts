import { useEffect } from 'react';
import { websocketService } from '../services/websocket';

export function useWebSocket() {
  useEffect(() => {
    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
    };
  }, []);

  return websocketService;
}