import React from 'react';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-secondary-900 leading-tight">
                  Miel Natural
                  <span className="text-primary-600"> Premium</span>
                </h1>
                <p className="text-lg sm:text-xl text-secondary-600 leading-relaxed">
                  Descubre nuestra selección de productos de apicultura 100% naturales, 
                  cosechados con técnicas tradicionales y el máximo respeto por nuestras abejas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  Explorar Productos
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  Conocer Más
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Premium Quality</h3>
                    <p className="text-sm text-secondary-600">Calidad garantizada</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">100% Natural</h3>
                    <p className="text-sm text-secondary-600">Sin aditivos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary-900">Envío Gratis</h3>
                    <p className="text-sm text-secondary-600">Compras sobre $25.000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg"
                  alt="Miel premium en frasco de vidrio"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/20 to-transparent" />
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-primary-500 fill-current" />
                    <span className="font-semibold text-secondary-900">4.9</span>
                    <span className="text-sm text-secondary-600">(2,148)</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-sm font-medium text-secondary-900">Desde 1995</p>
                  <p className="text-xs text-secondary-600">Tradición familiar</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-300 rounded-full opacity-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};