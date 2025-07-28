import React from 'react';
import { Award, Users, Leaf, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  const stats = [
    { number: '25+', label: 'Años de experiencia' },
    { number: '500+', label: 'Clientes satisfechos' },
    { number: '50+', label: 'Colmenas activas' },
    { number: '100%', label: 'Productos naturales' }
  ];

  const values = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Sostenibilidad',
      description: 'Cuidamos el medio ambiente y nuestras abejas con prácticas responsables.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Calidad Premium',
      description: 'Productos de la más alta calidad, certificados y libres de químicos.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Tradición Familiar',
      description: 'Conocimiento transmitido de generación en generación.'
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Pasión',
      description: 'Amamos lo que hacemos y se refleja en cada producto.'
    }
  ];

  return (
    <section id="about" className="py-16 bg-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-secondary-900 mb-4">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-secondary-700 leading-relaxed">
                <p>
                  Desde 1995, la familia Mendoza se ha dedicado con pasión a la apicultura, 
                  manteniendo vivas las tradiciones ancestrales mientras incorporamos las 
                  mejores prácticas modernas.
                </p>
                <p>
                  Nuestras colmenas están ubicadas en los valles más puros de Chile, 
                  alejadas de la contaminación urbana y los pesticidas, garantizando 
                  productos de la máxima pureza y calidad.
                </p>
                <p>
                  Cada frasco de miel, cada gramo de propóleo, lleva consigo el cuidado 
                  y la dedicación de tres generaciones comprometidas con la excelencia.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-secondary-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button size="lg" className="group">
              Conoce Más Sobre Nosotros
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4792051/pexels-photo-4792051.jpeg"
                alt="Apicultor trabajando con colmenas"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-lg max-w-xs">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-secondary-900">Certificación Orgánica</h4>
                  <p className="text-sm text-secondary-600">SAG Chile</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-secondary-900 mb-4">
              Nuestros Valores
            </h3>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Los principios que nos guían en cada paso de nuestro trabajo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors">
                  <div className="text-primary-600">
                    {value.icon}
                  </div>
                </div>
                <h4 className="font-semibold text-secondary-900 mb-2">
                  {value.title}
                </h4>
                <p className="text-sm text-secondary-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};