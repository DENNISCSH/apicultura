import React from 'react';
import { Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2
    }).format(price);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity: newQuantity } });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // FUNCIÓN PARA PROCESAR PAGO
  const handleCheckout = async () => {
    try {
      const response = await fetch('https://apicultura-nnxr.onrender.com/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: state.items })
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point; // Redirige al pago de MercadoPago
      } else {
        alert('Error al iniciar el pago');
      }
    } catch (error) {
      console.error('Error en checkout:', error);
      alert('Hubo un problema con el pago');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Carrito de Compras" size="lg">
      <div className="space-y-6">
        {state.items.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag className="h-16 w-16 text-secondary-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-secondary-600 mb-4">
              Agrega algunos productos para comenzar
            </p>
            <Button onClick={onClose}>
              Continuar Comprando
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {state.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-lg">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-secondary-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-sm text-secondary-600">
                      {formatPrice(product.price)} c/u
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 hover:bg-secondary-200 rounded transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-medium min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 hover:bg-secondary-200 rounded transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-medium text-secondary-900">
                      {formatPrice(product.price * quantity)}
                    </p>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-red-600 hover:text-red-800 mt-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-secondary-200 pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-secondary-600">Subtotal ({state.itemCount} productos)</span>
                <span className="font-medium text-secondary-900">
                  {formatPrice(state.total)}
                </span>
              </div>
              <div className="border-t border-secondary-200 pt-2">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary-600">
                    {formatPrice(state.total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button size="lg" className="w-full" onClick={handleCheckout}>
                Proceder al Pago
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" onClick={onClose} className="flex-1">
                  Continuar Comprando
                </Button>
                <Button variant="ghost" onClick={clearCart} className="flex-1">
                  Vaciar Carrito
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
