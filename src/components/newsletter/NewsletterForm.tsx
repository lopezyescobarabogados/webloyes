'use client';

import { useState } from 'react';
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

export default function NewsletterForm() {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormState({
          status: 'success',
          message: result.message || 'Suscripción exitosa',
        });
        reset();
      } else {
        setFormState({
          status: 'error',
          message: result.message || 'Error en la suscripción',
        });
      }
    } catch (error) {
      console.error('Error al suscribirse:', error);
      setFormState({
        status: 'error',
        message: 'Error de conexión. Inténtalo nuevamente.',
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Mensaje de estado */}
        {formState.message && (
          <div
            className={`rounded-lg p-4 text-sm ${
              formState.status === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : formState.status === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'bg-blue-50 text-blue-800 border border-blue-200'
            }`}
          >
            {formState.message}
          </div>
        )}

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
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
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
            placeholder="tu@email.com"
            disabled={formState.status === 'loading'}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Botón de envío */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={formState.status === 'loading'}
        >
          {formState.status === 'loading' ? (
            <div className="flex items-center justify-center">
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Suscribiendo...
            </div>
          ) : (
            'Suscribirse al Boletín'
          )}
        </Button>
      </form>
    </div>
  );
}
