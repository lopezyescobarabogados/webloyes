'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';

// Esquema de validación con Zod
const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede superar 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  apellido: z
    .string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede superar 50 caracteres')
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      'El apellido solo puede contener letras'
    ),
  correo: z
    .string()
    .email('Ingresa un correo electrónico válido')
    .min(5, 'El correo es demasiado corto')
    .max(100, 'El correo es demasiado largo'),
  telefono: z
    .string()
    .min(9, 'El teléfono debe tener al menos 9 dígitos')
    .max(15, 'El teléfono no puede superar 15 dígitos')
    .regex(/^[+]?[0-9\s-()]+$/, 'Formato de teléfono inválido'),
  asunto: z
    .string()
    .min(5, 'El asunto debe tener al menos 5 caracteres')
    .max(100, 'El asunto no puede superar 100 caracteres'),
  mensaje: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(1000, 'El mensaje no puede superar 1000 caracteres'),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface FormState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    status: 'idle',
    message: '',
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState({ status: 'loading', message: '' });

    try {
      // Simulamos el envío al backend/servicio de email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el formulario');
      }

      setFormState({
        status: 'success',
        message:
          '¡Gracias por tu mensaje! Nos pondremos en contacto contigo en las próximas 24 horas.',
      });
      reset();
    } catch (error: unknown) {
      console.error('Error sending contact form:', error);
      setFormState({
        status: 'error',
        message:
          'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Mensaje de estado */}
      {formState.status !== 'idle' && (
        <div
          className={`rounded-lg border p-4 ${
            formState.status === 'success'
              ? 'border-green-200 bg-green-50 text-green-800'
              : formState.status === 'error'
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-blue-200 bg-blue-50 text-blue-800'
          }`}
        >
          <div className="flex items-center">
            {formState.status === 'success' && (
              <svg
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {formState.status === 'error' && (
              <svg
                className="mr-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {formState.status === 'loading' && (
              <svg
                className="mr-2 h-5 w-5 animate-spin"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <p className="text-sm font-medium">{formState.message}</p>
          </div>
        </div>
      )}

      {/* Nombre y Apellido */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="nombre"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            {...register('nombre')}
            className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
              errors.nombre
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="Tu nombre"
          />
          {errors.nombre && (
            <p className="mt-1 flex items-center text-sm text-red-600">
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.nombre.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="apellido"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Apellido *
          </label>
          <input
            type="text"
            id="apellido"
            {...register('apellido')}
            className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
              errors.apellido
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="Tu apellido"
          />
          {errors.apellido && (
            <p className="mt-1 flex items-center text-sm text-red-600">
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.apellido.message}
            </p>
          )}
        </div>
      </div>

      {/* Correo y Teléfono */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="correo"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Correo Electrónico *
          </label>
          <input
            type="email"
            id="correo"
            {...register('correo')}
            className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
              errors.correo
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="tu@email.com"
          />
          {errors.correo && (
            <p className="mt-1 flex items-center text-sm text-red-600">
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.correo.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="telefono"
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            Teléfono *
          </label>
          <input
            type="tel"
            id="telefono"
            {...register('telefono')}
            className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
              errors.telefono
                ? 'border-red-300 bg-red-50'
                : 'border-gray-300 bg-white'
            }`}
            placeholder="+34 600 000 000"
          />
          {errors.telefono && (
            <p className="mt-1 flex items-center text-sm text-red-600">
              <svg
                className="mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.telefono.message}
            </p>
          )}
        </div>
      </div>

      {/* Asunto */}
      <div>
        <label
          htmlFor="asunto"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          Asunto *
        </label>
        <input
          type="text"
          id="asunto"
          {...register('asunto')}
          className={`focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
            errors.asunto
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          placeholder="¿En qué podemos ayudarte?"
        />
        {errors.asunto && (
          <p className="mt-1 flex items-center text-sm text-red-600">
            <svg
              className="mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.asunto.message}
          </p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label
          htmlFor="mensaje"
          className="mb-2 block text-sm font-semibold text-gray-800"
        >
          Mensaje *
        </label>
        <textarea
          id="mensaje"
          rows={6}
          {...register('mensaje')}
          className={`resize-vertical focus:ring-navy focus:border-navy w-full rounded-lg border px-4 py-3 transition-colors focus:ring-2 focus:outline-none ${
            errors.mensaje
              ? 'border-red-300 bg-red-50'
              : 'border-gray-300 bg-white'
          }`}
          placeholder="Cuéntanos más detalles sobre tu proyecto, objetivos, timeline, presupuesto estimado..."
        />
        {errors.mensaje && (
          <p className="mt-1 flex items-center text-sm text-red-600">
            <svg
              className="mr-1 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.mensaje.message}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Mínimo 20 caracteres, máximo 1000
        </p>
      </div>

      {/* Botón de envío */}
      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || formState.status === 'loading'}
          className="w-full px-8 py-4 text-base font-semibold md:w-auto"
        >
          {isSubmitting || formState.status === 'loading' ? (
            <>
              <svg
                className="mr-2 h-5 w-5 animate-spin"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                  clipRule="evenodd"
                />
              </svg>
              Enviando...
            </>
          ) : (
            'Enviar Mensaje'
          )}
        </Button>

        <p className="mt-3 text-xs text-gray-500">
          * Campos obligatorios. Nos comprometemos a responder en menos de 24
          horas.
        </p>
      </div>
    </form>
  );
}
