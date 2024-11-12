import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home';
import PedidoStatus from './views/PedidoStatus';
import ErrorHandler from './views/ErrorHandler';
import ThanksOrder from './views/Thanks_Order';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pedido-status" element={<PedidoStatus />} />
        <Route path="/error" element={<ErrorHandler />} />
        <Route path="/thanks-order" element={<ThanksOrder />} />
      </Routes>
    </Router>
  );
};

export default App;
