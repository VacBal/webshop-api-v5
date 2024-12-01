import React from 'react';
import '../styles/OrderDetailsModal.css';

interface OrderDetailsModalProps {
  order: any;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ order, onClose }) => {
  const calculateSubtotal = (quantity: number, price: number) => quantity * price;

  return (
    <div className="order-details-modal">
      <div className="modal-content">
        <h2>Megrendelés részletei</h2>
        <button className="close-button" onClick={onClose}>Bezárás</button>

        <div className="order-info">
          <p><strong>Állapot:</strong> {order.status}</p>
          <p><strong>Rendelés ideje:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <h3>Szállítási cím</h3>
          <p>{order.shippingAddress.name}</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
          <p>{order.shippingAddress.country}</p>
          <h3>Számlázási cím</h3>
          <p>{order.billingAddress.name}</p>
          <p>{order.billingAddress.street}</p>
          <p>{order.billingAddress.city}, {order.billingAddress.zip}</p>
          <p>{order.billingAddress.country}</p>
        </div>

        <h3>Megrendelt termékek</h3>
        <div className="order-items">
          {order.items.map((item: any) => (
            <div key={item.product.id} className="order-item">
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <p><strong>{item.product.name}</strong></p>
                <p>Egységár: {item.product.price} Ft</p>
                <p>Mennyiség: {item.quantity}</p>
                <p>Részösszeg: {calculateSubtotal(item.quantity, item.product.price)} Ft</p>
              </div>
            </div>
          ))}
        </div>

        <h3>Fizetendő összeg: {order.total} Ft</h3>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
