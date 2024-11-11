import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle, faBurger } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/home.css';
import scanRfidGif from '../assets/img/scan_rfid.gif';

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = scanRfidGif;
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center p-4">
        <div className="main-content container text-center">
          <h2 className="main-title">
            ¡Saludos! <FontAwesomeIcon icon={faBurger} className="ms-2" />
          </h2>
          <p className="lead main-text">
            Para iniciar el retiro de tu pedido, por favor escanea tu etiqueta RFID en el lector o escribe tu código aquí:
          </p>
          {/* Input Form */}
          <form className="mt-4 w-100">
            <div className="mb-3">
              <label htmlFor="codigo" className="form-label">Código</label>
              <input type="text" className="form-control text-center input-code" id="codigo" placeholder="Escribe tu código aquí" />
            </div>
            <Link to="/pedido-status" className="btn btn-primary w-100 btn-consultar"><FontAwesomeIcon icon={faSearch} className="me-2" />Consultar</Link>
          </form>
          <button type="button" className="btn btn-link mt-3" onClick={handleShow}>
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            ¿Cómo escanear mi RFID?
          </button>
        </div>
      </main>

      {/* Modal */}
      {imageLoaded && (
        <Modal show={showModal} onClose={handleClose} title="¿Cómo escanear mi RFID?">
          <strong>Para escanear su etiqueta RFID, siga estos pasos:</strong>
          <ol>
            <li>Identifique su etiqueta RFID, que es circular y de color azul.</li>
            <li>Asegúrese de que el lector RFID esté encendido.</li>
            <li>Acerque su etiqueta al lector RFID. Este emitirá un sonido de confirmación <strong>(*beep*)</strong>.</li>
            <li>Si la etiqueta se escanea correctamente, el sistema lo redirigirá a la sección de detalles de su pedido.</li>
          </ol>
          <div className="text-center">
            <img src={scanRfidGif} alt="Instrucciones RFID" className="rfid-image" />
            <p className="text-muted">Ejemplo de cómo escanear una etiqueta RFID</p>
          </div>
        </Modal>
      )}

      <Footer />
    </div>
  );
};

export default Home;
