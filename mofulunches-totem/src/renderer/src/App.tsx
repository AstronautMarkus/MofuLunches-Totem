import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faBurger } from '@fortawesome/free-solid-svg-icons';
import './assets/css/app.css';
import scanRfidGif from './assets/img/scan_rfid.gif';


function App(): JSX.Element {
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
            Para iniciar el retiro de tu pedido, por favor escanea tu etiqueta RFID en el lector ubicado en la parte superior
            de este módulo, o escribe tu código aquí:
          </p>

          {/* Input Form */}
          <form className="mt-4 w-100">
            <div className="mb-3">
              <label htmlFor="codigo" className="form-label">Código</label>
              <input
                type="text"
                className="form-control text-center input-code"
                id="codigo"
                placeholder="Escribe tu código aquí"
              />
            </div>
            <button type="button" className="btn btn-primary w-100 btn-consultar">
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              Consultar
            </button>
          </form>

          <button
            type="button"
            className="btn btn-link mt-3"
            onClick={handleShow}
          >
            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
            ¿Cómo insertar un RFID?
          </button>
        </div>
      </main>

      {/* Modal */}
      {showModal && imageLoaded && (
        <>
          {/* Dark bg */}
          <div className="modal-backdrop fade show" onClick={handleClose}></div>

          {/* Modal Helper */}
          <div className="modal d-block" tabIndex={-1} aria-labelledby="rfidModalLabel" aria-hidden={!showModal}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h3 id="rfidModalLabel">¿Cómo leer mi RFID?</h3>
                  <button type="button" className="btn-close" onClick={handleClose} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Para escanear su etiqueta RFID, siga estos pasos:</p>
                    <ol>
                    <li>Identifique su etiqueta RFID, que es circular y de color azul, como se muestra en la imagen.</li>
                    <li>Asegúrese de que el lector RFID esté encendido. Si no lo está, puede ingresar su código manualmente.</li>
                    <li>Acerque su etiqueta al lector RFID. Este emitirá un sonido de confirmación (*beep*).</li>
                    <li>Si la etiqueta se escanea correctamente, el sistema lo redirigirá a la sección de detalles de su pedido.</li>
                    </ol>
                  {/* Espacio para la imagen */}
                    <div className="text-center">
                    <img src={scanRfidGif} alt="Instrucciones RFID" className="rfid-image"/>
                    <p className="text-muted">Ejemplo de cómo colocar la etiqueta RFID</p>
                    </div>
                    <div className="text-center">
                    </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      
      <Footer />
    </div>
  );
}

export default App;
