import React from 'react';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEdit, onDelete }) => {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top"
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.category}</p>
        <p className="card-text">{product.description}</p>
        <p className="card-text fw-bold text-primary">${product.price}</p>
        <p className="card-text text-muted">Stock: {product.stock}</p>
        <div className="mt-auto d-flex justify-content-between">
          <button className="btn btn-outline-secondary btn-sm" onClick={() => onEdit(product)}>
            <i className="bi bi-pencil"></i> Editar
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => product._id && onDelete(product._id)} // Validamos si _id existe
          >
            <i className="bi bi-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};
