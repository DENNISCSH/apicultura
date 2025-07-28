import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Minus, Plus, Shield, RotateCcw } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Aseguramos que siempre haya imágenes
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
    onClose();
  };

  // Formatear precio en Soles
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(price);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Imágenes */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-secondary-50">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-primary-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
        <div className="space-y-6">
          {/* Encabezado */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-primary-600 uppercase tracking-wide">
                {(product.category ?? 'Sin categoría').replace('-', ' ')}
              </span>
              <button className="p-2 hover:bg-secondary-50 rounded-full transition-colors">
                <Heart className="h-5 w-5 text-secondary-600 hover:text-red-500" />
              </button>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-serif font-bold text-secondary-900 mb-3">
              {product.name}
            </h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-primary-500 fill-current'
                        : 'text-secondary-300'
                    }`}
                  />
                ))}
                <span className="text-sm font-medium text-secondary-700 ml-2">
                  {product.rating} ({product.reviews} reseñas)
                </span>
              </div>
            </div>
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-secondary-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-secondary-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>
            <p className="text-sm text-secondary-600">
              Stock disponible: {product.stock} unidades
            </p>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-2">Descripción</h3>
            <p className="text-secondary-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Tags */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-2">Características</h3>
            <div className="flex flex-wrap gap-2">
              {(product.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="bg-primary-100 text-primary-800 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Selector de cantidad */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-3">Cantidad</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-secondary-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                  className="p-2 hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <span className="text-sm text-secondary-600">
                Total: {formatPrice(product.price * quantity)}
              </span>
            </div>
          </div>

          {/* Botones */}
          <div className="space-y-3">
            <Button
              onClick={handleAddToCart}
              size="lg"
              className="w-full"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {product.stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
            </Button>
            
            <Button variant="outline" size="lg" className="w-full">
              Comprar Ahora
            </Button>
          </div>

          {/* Características finales */}
          <div className="border-t border-secondary-200 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-secondary-700">Garantía de calidad</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-secondary-700">Devolución 30 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
