import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const API_URL = 'https://apicultura-nnxr.onrender.com/api/auth';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Debe tener al menos 6 caracteres';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'El nombre es requerido';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        onClose();
        window.location.reload(); // refresca para que el usuario quede logueado
      } else {
        setErrors({ general: data.message || 'Credenciales inválidas' });
      }
    } catch (error) {
      setErrors({ general: 'Error en el servidor. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-800">{errors.general}</p>
          </div>
        )}

        {!isLogin && (
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
            <Input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
              className="pl-10"
            />
          </div>
        )}

        <div className="relative">
          <Mail className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
            className="pl-10"
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
            className="pl-10 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-secondary-400 hover:text-secondary-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>

        {!isLogin && (
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-secondary-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={errors.confirmPassword}
              className="pl-10"
            />
          </div>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          loading={isLoading}
        >
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors"
          >
            {isLogin 
              ? '¿No tienes cuenta? Regístrate aquí' 
              : '¿Ya tienes cuenta? Inicia sesión aquí'
            }
          </button>
        </div>
      </form>
    </Modal>
  );
};
