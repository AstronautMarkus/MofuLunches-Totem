import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import '../assets/css/pedido_status.css';

const PedidoStatus: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div className="main-content container text-center">
          <h2 className="main-title">Detalles del pedido</h2>
          {/* Order Details */}
          <div className="order-details d-flex flex-column align-items-center mt-4">
            <div className="mb-3">
              <h5>Código del pedido</h5>
              <p className="order-info">XXXXX</p>
            </div>
            <div className="mb-3">
              <h5>Estado del pedido</h5>
              <p className="order-info">XXXX</p>
              <button className="btn btn-secondary mt-2" onClick={handleShow}>
                Ver contenido
              </button>
            </div>
            <div className="mb-3">
              <h5>Fecha del pedido</h5>
              <p className="order-info">XX/XX/XXXX</p>
            </div>
          </div>
          <div className="button-group mt-4 d-flex justify-content-center gap-3">
            <button className="btn btn-success">Retirar pedido</button>
            <Link to="/" className="btn btn-primary">
              Volver
            </Link>
          </div>
        </div>
      </main>

      {/* Modal */}
      <Modal show={showModal} onClose={handleClose} title="Contenido del pedido">
        <p>Almuerzo: XXXX</p>
        <p>Ensalada: XXXX</p>
        <p>Bebida: XXXX</p>
        <p>Postre: XXXX</p>
      </Modal>

      <Footer />
    </div>
  );
};

export default PedidoStatus;
