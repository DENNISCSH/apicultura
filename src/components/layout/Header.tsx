import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Hexagon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { AuthModal } from '../auth/AuthModal';
import { CartModal } from '../cart/CartModal';
import { categories } from '../../data/products';

export const Header: React.FC = () => {
  const { state } = useCart();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Hexagon className="h-8 w-8 text-primary-500 mr-2" />
              <span className="text-xl font-serif font-semibold text-secondary-900">
                MielDorada
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Inicio
            </a>
            <div className="relative group">
              <button className="text-secondary-700 hover:text-primary-600 transition-colors">
                Productos
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.map((category) => (
                    <a
                      key={category.id}
                      href={`#category-${category.id}`}
                      className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600"
                    >
                      {category.name} ({category.count})
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <a href="#about" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Nosotros
            </a>
            <a href="#contact" className="text-secondary-700 hover:text-primary-600 transition-colors">
              Contacto
            </a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
              </div>
            </form>
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCartModalOpen(true)}
              className="relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-secondary-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {state.itemCount}
                </span>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-6 w-6" />
                  <span className="hidden sm:block">{user.name}</span>
                </Button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <a href="#profile" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50">
                      Mi Perfil
                    </a>
                    <a href="#orders" className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50">
                      Mis Pedidos
                    </a>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Ingresar
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-secondary-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="mb-4">
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Buscar productos..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-secondary-400" />
                  </div>
                </form>
              </div>
              <a href="#" className="block px-3 py-2 text-secondary-700 hover:text-primary-600">
                Inicio
              </a>
              <a href="#products" className="block px-3 py-2 text-secondary-700 hover:text-primary-600">
                Productos
              </a>
              <a href="#about" className="block px-3 py-2 text-secondary-700 hover:text-primary-600">
                Nosotros
              </a>
              <a href="#contact" className="block px-3 py-2 text-secondary-700 hover:text-primary-600">
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
      />
    </header>
  );
};