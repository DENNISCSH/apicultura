import React from 'react';
import { Hexagon, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Hexagon className="h-8 w-8 text-primary-500 mr-2" />
              <span className="text-xl font-serif font-semibold">MielDorada</span>
            </div>
            <p className="text-secondary-300 text-sm leading-relaxed">
              Productos de apicultura premium, cosechados con amor y respeto por la naturaleza. 
              Más de 20 años de experiencia nos respaldan.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">Inicio</a></li>
              <li><a href="#products" className="text-secondary-300 hover:text-primary-500 transition-colors">Productos</a></li>
              <li><a href="#about" className="text-secondary-300 hover:text-primary-500 transition-colors">Nosotros</a></li>
              <li><a href="#contact" className="text-secondary-300 hover:text-primary-500 transition-colors">Contacto</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Productos</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">Miel Natural</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">Jalea Real</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">Propóleo</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">Cera de Abeja</a></li>
              <li><a href="#" className="text-secondary-300 hover:text-primary-500 transition-colors">Polen</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <span className="text-secondary-300 text-sm">
                  Av. Los Colmenares 123<br />
                  Santiago, Chile
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <span className="text-secondary-300 text-sm">+56 9 1234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary-500 flex-shrink-0" />
                <span className="text-secondary-300 text-sm">info@mieldorada.cl</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-secondary-400 text-sm">
              © 2024 MielDorada. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-secondary-400 hover:text-primary-500 text-sm transition-colors">
                Términos y Condiciones
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-500 text-sm transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-secondary-400 hover:text-primary-500 text-sm transition-colors">
                Cambios y Devoluciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};