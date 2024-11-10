import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import PedidoStatus from './views/PedidoStatus';
import ErrorHandler from './views/ErrorHandler';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedido-status" element={<PedidoStatus />} />
        <Route path="/error" element={<ErrorHandler />} />
      </Routes>
    </Router>
  );
};

export default App;
