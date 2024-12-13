import React, { useState, useEffect } from 'react';
import { ProductForm } from '@/components/products/ProductForm';
import { ProductCard } from '@/components/products/ProductCard';
import type { Product } from '@/types';
import { api } from '@/utils/api';

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const fetchProducts = async () => {
    try {
      const response = await fetch(api.products);
      if (response.ok) {
        const data = await response.json();
        setProducts(data); // Usamos directamente los productos con _id
      } else {
        console.error('Error fetching products:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddOrEditProduct = async (productData: Product) => {
    try {
      let response;
      if (productData._id) {
        // Editar producto existente
        response = await fetch(`${api.products}/${productData._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      } else {
        // Crear un nuevo producto
        response = await fetch(api.products, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData),
        });
      }

      if (response.ok) {
        fetchProducts(); // Actualizamos la lista de productos
      } else {
        console.error('Error al guardar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    } finally {
      setShowForm(false);
      setSelectedProduct(undefined);
    }
  };

  const handleDeleteProduct = async (_id: string) => {
    try {
      const response = await fetch(`${api.products}/${_id}`, { method: 'DELETE' });
      if (response.ok) {
        setProducts((prev) => prev.filter((product) => product._id !== _id));
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      fetchProducts();
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Productos</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="bi bi-plus-lg me-2"></i> Añadir Producto
        </button>
      </div>

      {products.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay productos disponibles. ¡Añade el primer producto!
        </div>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-md-4" key={product._id}>
              <ProductCard product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <ProductForm
          initialData={selectedProduct}
          onSubmit={handleAddOrEditProduct}
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(undefined);
          }}
        />
      )}
    </div>
  );
};
