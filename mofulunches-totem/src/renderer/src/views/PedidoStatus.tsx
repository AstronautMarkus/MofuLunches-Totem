import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faEye, faCheckCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import '../assets/css/pedido_status.css';

const PedidoStatus: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  // Extract pedido and usuario from location state
  const { state } = location as any;
  const { pedido, usuario } = state || {};

  useEffect(() => {
    // If not 'pedido' or 'usuario' data, redirect to home
    if (!pedido || !usuario) {
      console.error('Datos no encontrados. Redirigiendo al inicio...');
      navigate('/');
    }
  }, [pedido, usuario, navigate]);

  // if not data when loading return home
  if (!pedido || !usuario) {
    return null;
  }

  // Check if pedido is already 'retirado'
  const isRetirado = pedido.estado === 'retirado';
  const isListoParaRetirar = pedido.estado === 'listo_para_retirar';

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleConfirmShow = () => setShowConfirmModal(true);
  const handleConfirmClose = () => setShowConfirmModal(false);

  const handleConfirm = async () => {
    const currentTime = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    try {
      const response = await fetch(`${API_URL}/pedidos/${pedido.cod_unico}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hora_retiro: currentTime,
          estado: 'retirado',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el pedido');
      }

      const data = await response.json();
      console.log(data.message);
      navigate('/thanks-order', { state: { message: data.message, pedido: data.pedido } });
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div className="main-content container text-center">
          <h2 className="main-title">Detalles del pedido</h2>
          {/* Usuario data */}
          <div className="order-details d-flex flex-column align-items-center mt-4">
            <div className="mb-3">
              <h5>Usuario</h5>
              <p className="order-info">
                {usuario.nombre} {usuario.apellido}
              </p>
            </div>
            <div className="mb-3">
              <h5>Código del pedido</h5>
              <p className="order-info">{pedido.cod_unico}</p>
            </div>
            <div className="mb-3">
              <h5>Estado del pedido</h5>
              <p className="order-info">{pedido.estado}</p>
              {isRetirado && (
                <p className="text-warning">
                  <FontAwesomeIcon icon={faExclamationCircle} className="ms-2" /> Este pedido ya ha sido retirado y no puede ser actualizado.
                </p>
              )}
              {!isRetirado && !isListoParaRetirar && (
                <p className="text-warning">
                  <FontAwesomeIcon icon={faExclamationCircle} className="ms-2" /> El pedido no está listo para retirar.
                </p>
              )}
              <button className="btn btn-info mt-2" onClick={handleShow}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> Ver contenido
              </button>
            </div>
            <div className="mb-3">
              <h5>Fecha del pedido</h5>
              <p className="order-info">{pedido.fecha_pedido}</p>
            </div>
            <div className="mb-3">
              <h5>Hora de retiro</h5>
              <p className="order-info">{pedido.hora_retiro}</p>
            </div>
          </div>
          <div className="button-group mt-4 d-flex justify-content-center gap-3">
            {!isRetirado && isListoParaRetirar && (
              <button className="btn btn-success" onClick={handleConfirmShow}>
                <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Retirar pedido
              </button>
            )}
            <Link to="/" className="btn btn-danger">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Volver
            </Link>
          </div>
        </div>
      </main>

      {/* Pedido data modal */}
      <Modal show={showModal} onClose={handleClose} title="Contenido del pedido">
        {pedido.alimentos && pedido.alimentos.length > 0 ? (
          pedido.alimentos.map((alimento: any, index: number) => (
            <div key={index}>
              <p><strong>Nombre:</strong> {alimento.nombre}</p>
              <p><strong>Tipo:</strong> {alimento.tipo}</p>
            </div>
          ))
        ) : (
          <p>No hay alimentos asociados a este pedido.</p>
        )}
      </Modal>

      {/* Confirm data modal */}
      {!isRetirado && (
        <Modal show={showConfirmModal} onClose={handleConfirmClose} title="Confirmar Retiro">
          <p>¿Está seguro de que desea confirmar el retiro del pedido?</p>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn btn-success" onClick={handleConfirm}>
              <FontAwesomeIcon icon={faCheckCircle} className="me-2" /> Confirmar
            </button>
            <button className="btn btn-secondary" onClick={handleConfirmClose}>
              Cancelar
            </button>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default PedidoStatus;
