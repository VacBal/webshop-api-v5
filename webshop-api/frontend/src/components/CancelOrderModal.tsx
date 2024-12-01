import React, { useState } from 'react';
import './styles/CancelOrderModal.css';

interface CancelOrderModalProps {
  orderId: string;
  onCancel: (orderId: string, reason: string) => void;
  onClose: () => void;
}

const CancelOrderModal: React.FC<CancelOrderModalProps> = ({ orderId, onCancel, onClose }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (reason.trim() === '') {
      alert('Az indoklás kitöltése kötelező!');
      return;
    }
    onCancel(orderId, reason);
  };

  return (
    <div className="cancel-order-modal">
      <div className="modal-content">
        <h2>Megrendelés visszamondása</h2>
        <textarea
          placeholder="Adja meg az indoklást..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="modal-actions">
          <button onClick={handleSubmit}>Visszamondás</button>
          <button onClick={onClose}>Mégsem</button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderModal;
