const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {
    getProducts,
    createProduct,
    deleteProduct,
    updateProduct,
} = require('../controllers/productsController'); // Asegúrate de que la ruta sea correcta

// Ruta para obtener todos los productos
router.get('/', getProducts);

// Ruta para crear un nuevo producto
router.post('/', createProduct);

// Ruta para actualizar un producto existente por su ID
router.put('/:id', updateProduct);

// Ruta para eliminar un producto por shu ID
router.delete('/:id', deleteProduct);

module.exports = router;
