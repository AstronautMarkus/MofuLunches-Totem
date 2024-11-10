import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/home.css';

const ErrorHandler: React.FC = () => {
  
  return (
    <div className='d-flex flex-column min-vh-100' >
        <Header />
        <main className='flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4'>
            <div className='container text-center'>
                <h2 className='main-title'>
                Error <strong>*code*</strong> <FontAwesomeIcon icon={faExclamationTriangle} />
                </h2>
                <p className='lead main-text'>
                Detalle del error.
                </p>
                <Link to='/' className='btn btn-primary btn-consultar'>
                Regresar al inicio
                </Link>
            </div>
        </main>
        <Footer />
    </div>
  );
};

export default ErrorHandler;
