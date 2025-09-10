'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';

// Esquema de validación con Zod
const subscriptionSchema = z.object({
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  email: z
    .string()
    .email('Ingresa un correo electrónico válido')
    .min(5, 'El correo es demasiado corto')
    .max(100, 'El correo es demasiado largo'),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    setFormState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormState({
          status: 'success',
          message: '¡Te has suscrito exitosamente! Recibirás nuestras noticias en tu correo.',
        });
        reset();
        setTimeout(() => {
          onClose();
          setFormState({ status: 'idle', message: '' });
        }, 3000);
      } else {
        setFormState({
          status: 'error',
          message: result.message || 'Error al suscribirse. Inténtalo de nuevo.',
        });
      }
    } catch {
      setFormState({
        status: 'error',
        message: 'Error de conexión. Verifica tu internet e inténtalo de nuevo.',
      });
    }
  };

  const handleClose = () => {
    onClose();
    reset();
    setFormState({ status: 'idle', message: '' });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-700">
              <svg
                className="h-8 w-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </div>
            <h3 className="mb-2 font-serif text-xl font-bold text-navy">
              Boletín Informativo
            </h3>
            <p className="text-gray-600">
              Recibe las últimas noticias jurídicas directamente en tu correo
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Campo Nombre */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                {...register('name')}
                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
                  errors.name
                    ? 'border-red-300 bg-red-50 focus:ring-red-500'
                    : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder="Tu nombre completo"
                disabled={formState.status === 'loading'}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Campo Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Correo electrónico *
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className={`w-full rounded-lg border px-4 py-3 transition-colors focus:outline-none focus:ring-2 ${
                  errors.email
                    ? 'border-red-300 bg-red-50 focus:ring-red-500'
                    : 'border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500'
                }`}
                placeholder="tu@correo.com"
                disabled={formState.status === 'loading'}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Mensaje de feedback */}
            {formState.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-lg p-3 text-sm ${
                  formState.status === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {formState.message}
              </motion.div>
            )}

            {/* Botones */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={handleClose}
                disabled={formState.status === 'loading'}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1"
                disabled={formState.status === 'loading'}
              >
                {formState.status === 'loading' ? (
                  <div className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Suscribiendo...
                  </div>
                ) : (
                  'Suscribirse'
                )}
              </Button>
            </div>
          </form>

          {/* Botón de cerrar */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600"
            disabled={formState.status === 'loading'}
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
