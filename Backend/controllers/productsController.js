const mongoose = require('mongoose');
const Product = require('../models/Product');

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Recuperar productos con _id
    res.status(200).json(products); // Enviamos directamente los productos con _id
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();
    res.status(201).json(savedProduct); // Enviamos el producto creado con _id
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// Editar un producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct); // Enviamos el producto actualizado con _id
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
};
// Eliminar producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar que el ID es válido para MongoDB
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID de producto no válido' });
    }

    // Intentar eliminar el producto
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json({ message: 'Producto eliminado exitosamente', product: deletedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};