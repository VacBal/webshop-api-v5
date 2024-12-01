import React, { useEffect, useState } from 'react';
import { useOrderStatus } from '../hooks/useOrderStatus';
import '../styles/OrderListPage.css';

const OrderListPage = () => {
  const [orders, setOrders] = useState<any[]>([]); // Töltse be a rendeléseket egy backend kérés során
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (error) {
    return <div className="error">Hiba: {error}</div>;
  }

  return (
    <div className="order-list-page">
      <h1>Megrendelések</h1>
      <ul>
        {orders.map((order) => {
          const { status, error, updateStatus } = useOrderStatus(order.orderId);

          return (
            <li key={order.orderId}>
              <p>Rendelés ID: {order.orderId}</p>
              <p>Állapot: {status || 'Betöltés...'}</p>
              {error && <p className="error">{error}</p>}
              <button onClick={updateStatus}>Frissítés</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrderListPage;
