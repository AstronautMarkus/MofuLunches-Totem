import React from 'react';
import '../assets/css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Enlaces Rápidos */}


        {/* Contacto */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: soporte@mofulunches.com</p>
          <p>Teléfono: +123 456 7890</p>
        </div>

        
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-icons">
            <a href="https://github.com/astronautmarkus" target="_blank" rel="noreferrer" className="footer-icon">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-icon">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-icon">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
      
      <p className="footer-bottom-text">&copy; 2024 Mofu Lunches Team. Todos los derechos reservados.</p>
    </footer>
  );
};

export default Footer;
