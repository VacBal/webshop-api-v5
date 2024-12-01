import { useEffect, useState } from 'react';
import { fetchOrderStatus } from '../services/authService';

export const useOrderStatus = (orderId: string) => {
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateStatus = async () => {
    try {
      const data = await fetchOrderStatus(orderId);
      setStatus(data.status);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    updateStatus();
    const interval = setInterval(updateStatus, 30000); // Frissítés 30 másodpercenként
    return () => clearInterval(interval);
  }, [orderId]);

  return { status, error, updateStatus };
};
