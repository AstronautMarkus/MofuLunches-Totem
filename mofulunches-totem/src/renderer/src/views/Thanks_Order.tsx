import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
              <p><strong>Hora de modificación:</strong> {pedido.hora_modificacion}</p>
            </div>
          )}
          <Link to='/' className='btn btn-primary btn-consultar mt-4'>
            Regresar al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ThanksOrder;
