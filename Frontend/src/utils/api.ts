// src/utils/api.ts

// Definimos la URL base para el backend
const BASE_URL = 'http://localhost:5000/api'; // Cambia el puerto si tu backend está en otro puerto

// Exportamos las rutas organizadas para cada endpoint
export const api = {
  auth: `${BASE_URL}/auth`, // Ruta para autenticación
  products: `${BASE_URL}/products`, // Ruta para productos
  customers: `${BASE_URL}/customers`, // Ruta para clientes
};
