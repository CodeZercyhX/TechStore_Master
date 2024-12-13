import React, { useState, useEffect } from 'react';
import type { Product } from '@/types';

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  onClose: () => void;
  initialData?: Product;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, onClose, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: String(initialData.price),
        category: initialData.category,
        image: initialData.image,
        stock: String(initialData.stock),
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData: Product = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      ...(initialData?._id ? { _id: initialData._id } : {}), // Solo incluimos _id si existe
    };

    onSubmit(productData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="modal show d-block" tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{initialData ? 'Editar Producto' : 'Nuevo Producto'}</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre del Producto</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Descripción</label>
                <textarea
                  name="description"
                  className="form-control"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="price" className="form-label">Precio</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="stock" className="form-label">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">Categoría</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="laptops">Laptops</option>
                  <option value="smartphones">Smartphones</option>
                  <option value="tablets">Tablets</option>
                  <option value="accessories">Accesorios</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="image" className="form-label">URL de la Imagen</label>
                <input
                  type="url"
                  name="image"
                  className="form-control"
                  value={formData.image}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {initialData ? 'Guardar Cambios' : 'Añadir Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
