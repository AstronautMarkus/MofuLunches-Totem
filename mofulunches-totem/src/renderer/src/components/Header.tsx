import React from 'react';
import '../assets/css/header.css';
import cirnoFumo from '../assets/img/cirnofumo.png';


const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={cirnoFumo} alt="Cirno Fumo" className="header-image" />
      <h1 className="header-title">
        Mofu Lunches
      </h1>
    </header>
  );
};

export default Header;
