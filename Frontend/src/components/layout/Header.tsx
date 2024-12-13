import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Laptop, ShoppingCart, Users, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Laptop className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TechStore</span>
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link
              to="/products"
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Products</span>
            </Link>
            <Link
              to="/customers"
              className="text-gray-600 hover:text-blue-600 flex items-center space-x-1"
            >
              <Users className="w-5 h-5" />
              <span>Customers</span>
            </Link>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};