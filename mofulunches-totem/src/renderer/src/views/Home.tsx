import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faInfoCircle, faBurger } from '@fortawesome/free-solid-svg-icons';
import '../assets/css/home.css';
import scanRfidGif from '../assets/img/scan_rfid.gif';

declare global {
  interface Window {
    api: {
      onRfidCode: (callback: (code: string) => void) => void;
      removeRfidCodeListener: () => void;
    };
  }
}

const Home: React.FC = () => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isProgrammatic, setIsProgrammatic] = useState(false); // New state

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const img = new Image();
    img.src = scanRfidGif;
    img.onload = () => setImageLoaded(true);
  }, []);

  useEffect(() => {
    const handleRfidCode = (code: string) => {
      setIsProgrammatic(true); // Set flag to true
      setCodigo(code.toString());
    };

    // Listen RFID events
    window.api.onRfidCode(handleRfidCode);

    return () => {
      // Elimina listeners cuando el componente se desmonta
      window.api.removeRfidCodeListener();
    };
  }, []);

  useEffect(() => {
    if (codigo && isProgrammatic) {
      handleSubmit(new Event('submit')).catch((error) => {
        console.error('Error during form submission:', error);
      });
      setIsProgrammatic(false); // Reset flag after submission
    }
  }, [codigo, isProgrammatic]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e: React.FormEvent | Event) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('Código ingresado:', codigo);

    if (!codigo.trim()) {
      setError('Por favor, ingresa un código RFID válido.');
      setLoading(false);
      return;
    }

    try {
      console.log('Consultando usuarios desde:', `${API_URL}/usuarios`);

      // Get all users
      const response = await fetch(`${API_URL}/usuarios`, { method: 'GET' });

      if (!response.ok) {
        setError('Error en la conexión con la API.');
        setLoading(false);
        return;
      }

      const usuarios = await response.json();

      // Search user by RFID code
      const usuarioEncontrado = usuarios.find((u: any) => u.codigo_RFID === codigo);

      if (!usuarioEncontrado) {
        setError('El código RFID ingresado no existe.');
        setLoading(false);
        return;
      }

      console.log(`Consultando pedidos diarios para el usuario ${usuarioEncontrado.rut}...`);

      // Check daily pedidos
      const pedidosResponse = await fetch(`${API_URL}/pedidos/diarios/${usuarioEncontrado.rut}`, { method: 'GET' });

      if (!pedidosResponse.ok) {
        setError('Error al consultar los pedidos.');
        setLoading(false);
        return;
      }

      const pedidos = await pedidosResponse.json();

      if (pedidos.length === 0) {
        setError('No se encontró un pedido diario asociado al código del usuario.');
        setLoading(false);
        return;
      }

      // Redirect to PedidoStatus
      console.log('Redirigiendo a PedidoStatus...');
      navigate('/pedido-status', { state: { pedido: pedidos[0], usuario: usuarioEncontrado } });
    } catch (error) {
      console.error('Error al conectar con la API:', error);
      setError('Hubo un problema al conectar con el servidor. Por favor, intenta nuevamente más tarde.');
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="mt-4 w-100">
            <div className="mb-3">
              <label htmlFor="codigo" className="form-label">Código RFID</label>
              <input
                type="text"
                className="form-control text-center input-code"
                id="codigo"
                placeholder="Escribe tu código aquí"
                value={codigo}
                onChange={(e) => {
                  setIsProgrammatic(false); // Set flag to false for manual input
                  setCodigo(e.target.value);
                }}
              />
            </div>
            {loading && <p className="text-primary">Cargando...</p>}
            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-info w-100 btn-consultar" disabled={loading}>
              {loading ? 'Consultando...' : <><FontAwesomeIcon icon={faSearch} className="me-2" />Consultar</>}
            </button>
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
