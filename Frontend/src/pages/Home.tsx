import React from 'react';
import { ArrowRight, Star, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-900">
          Tu Tienda Integral de Tecnología
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre lo último en tecnología con nuestra selección exclusiva de productos electrónicos. Desde laptops hasta smartphones, tenemos todo lo que necesitas.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/products">
            <Button size="lg">
              Explorar Productos <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Star className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Calidad Premium</h3>
          <p className="text-gray-600">
            Solo ofrecemos productos de marcas confiables con calidad comprobada.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Zap className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
          <p className="text-gray-600">
            Envíos rápidos y confiables para que recibas tu tecnología lo antes posible.
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <Shield className="w-10 h-10 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Garantía Incluida</h3>
          <p className="text-gray-600">
            Todos los productos incluyen garantía del fabricante y nuestra garantía de satisfacción.
          </p>
        </div>
      </section>
    </div>
  );
};
