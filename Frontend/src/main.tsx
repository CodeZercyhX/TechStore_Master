import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css'; // Estilos TailwindCSS (si siguen siendo necesarios)
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'; // Iconos de Bootstrap

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
