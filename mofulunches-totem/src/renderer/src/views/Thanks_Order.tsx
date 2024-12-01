import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/home.css';

const ThanksOrder: React.FC = () => {
  const location = useLocation();
  const { state } = location as any;
  const { message, pedido } = state || {};

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <main className='flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4'>
        <div className='container text-center'>
          <h2 className='main-title'>Gracias!</h2>
          <p className='lead main-text'>{message || 'Su orden ha sido completada exitosamente.'}</p>
          {pedido && (
            <div className='order-details mt-4'>
              <p><strong>Código del pedido:</strong> {pedido.cod_unico}</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
              <p><strong>Hora de retiro:</strong> {pedido.hora_retiro}</p>
            </div>
          )}
          <Link to='/' className='btn btn-danger btn-consultar mt-4'>
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" /> Regresar al inicio
          </Link>
          <p className='mt-4 lead'>Gracias por usar MofuLunches! ᗜˬᗜ</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThanksOrder;
