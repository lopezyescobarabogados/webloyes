'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Image from 'next/image';
import { TeamMember } from './TeamManagement';

const teamMemberSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  position: z.string().min(2, 'El cargo debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(9, 'El teléfono debe tener al menos 9 dígitos').optional().or(z.literal('')),
  specialties: z.string().min(2, 'Debe especificar al menos una especialidad'),
  education: z.string().min(10, 'La formación académica debe tener al menos 10 caracteres'),
  experience: z.string().min(1, 'Los años de experiencia son requeridos'),
  bio: z.string().min(50, 'La biografía debe tener al menos 50 caracteres'),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres'),
  barAssociation: z.string().optional().or(z.literal('')),
  languages: z.string().optional().or(z.literal('')),
  linkedin: z.string().url('URL de LinkedIn inválida').optional().or(z.literal('')),
});

type TeamMemberFormData = z.infer<typeof teamMemberSchema>;

interface TeamFormProps {
  member: TeamMember | null;
  isCreating: boolean;
  onClose: () => void;
  onSuccess: (member: TeamMember) => void;
}

export default function TeamForm({ member, isCreating, onClose, onSuccess }: TeamFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(member?.imageUrl || '');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TeamMemberFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: member ? {
      name: member.name,
      position: member.position,
      email: member.email,
      phone: member.phone || '',
      specialties: member.specialties ? JSON.parse(member.specialties).join(', ') : '',
      education: member.education || '',
      experience: member.experience || '',
      bio: member.bio || '',
      description: member.description || '',
      barAssociation: member.barAssociation || '',
      languages: member.languages || '',
      linkedin: member.linkedin || '',
    } : {
      name: '',
      position: '',
      email: '',
      phone: '',
      specialties: '',
      education: '',
      experience: '',
      bio: '',
      description: '',
      barAssociation: '',
      languages: '',
      linkedin: '',
    }
  });

    // Focus management
  useEffect(() => {
    // Focus en el primer campo cuando se abre el modal
    const firstInput = formRef.current?.querySelector('input, select, textarea') as HTMLElement;
    if (firstInput) {
      firstInput.focus();
    }

    // Manejar tecla Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido');
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no puede ser mayor a 5MB');
      return;
    }

    try {
      // Crear preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Subir imagen
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen');
      }

      const data = await response.json();
      setUploadedImage(data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error al subir la imagen');
    }
  };

  const onSubmit = async (data: TeamMemberFormData) => {
    try {
      setIsSubmitting(true);

      // Convertir especialidades de string a array
      const specialtiesArray = data.specialties
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const memberData = {
        name: data.name,
        position: data.position,
        description: data.description,
        bio: data.bio,
        email: data.email,
        phone: data.phone || null,
        imageUrl: uploadedImage || member?.imageUrl || '',
        order: member?.order || 0,
        active: true,
        specialties: specialtiesArray, // Enviar como array
        education: data.education,
        experience: data.experience,
      };

      console.log('Sending data to API:', memberData); // Debug log

      const url = isCreating ? '/api/team' : `/api/team/${member?.id}`;
      const method = isCreating ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }

      const savedMember = await response.json();
      onSuccess(savedMember);
      reset();
    } catch (error) {
      console.error('Error saving member:', error);
      
      // Mejor manejo de errores
      if (error instanceof Error) {
        alert(`Error al guardar: ${error.message}`);
      } else {
        alert('Error desconocido al guardar el miembro');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 
              id="modal-title"
              className="text-xl font-serif font-bold text-navy"
            >
              {isCreating ? 'Nuevo Miembro del Equipo' : 'Editar Miembro del Equipo'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Cerrar modal"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Imagen */}
          <fieldset className="space-y-4">
            <legend className="block text-sm font-medium text-gray-700">
              Foto del miembro
            </legend>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-20 w-20 rounded-full bg-gray-200 overflow-hidden">
                  {imagePreview ? (
                    <Image
                      src={imagePreview}
                      alt="Vista previa de la foto del miembro"
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-navy flex items-center justify-center text-white font-medium text-xl" aria-label="Sin foto">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  aria-describedby="image-help"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  aria-label="Seleccionar archivo de imagen"
                >
                  Seleccionar imagen
                </button>
                <p id="image-help" className="text-xs text-gray-500 mt-1">
                  JPG, PNG o GIF. Máximo 5MB.
                </p>
              </div>
            </div>
          </fieldset>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre completo *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.name ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Dr. María González López"
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Cargo */}
            <div>
              <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                Cargo *
              </label>
              <input
                {...register('position')}
                type="text"
                id="position"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.position ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Socia Directora / Abogado Senior / Abogado Asociado"
                aria-required="true"
                aria-invalid={errors.position ? 'true' : 'false'}
                aria-describedby={errors.position ? 'position-error' : undefined}
              />
              {errors.position && (
                <p id="position-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.position.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="maria.gonzalez@lopezescobar.com"
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                {...register('phone')}
                type="tel"
                id="phone"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="+34 123 456 789"
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* Especialidades */}
            <div>
              <label htmlFor="specialties" className="block text-sm font-medium text-gray-700 mb-1">
                Especialidades Legales *
              </label>
              <input
                {...register('specialties')}
                type="text"
                id="specialties"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.specialties ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Derecho Civil, Derecho Laboral, Derecho Penal"
                aria-required="true"
                aria-invalid={errors.specialties ? 'true' : 'false'}
                aria-describedby={errors.specialties ? 'specialties-error' : undefined}
              />
              {errors.specialties && (
                <p id="specialties-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.specialties.message}
                </p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                Separa las especialidades con comas
              </p>
            </div>

            {/* Formación Académica */}
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                Formación Académica *
              </label>
              <textarea
                {...register('education')}
                id="education"
                rows={3}
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.education ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Licenciado en Derecho por la Universidad de Madrid. Master en Derecho Empresarial..."
                aria-required="true"
                aria-invalid={errors.education ? 'true' : 'false'}
                aria-describedby={errors.education ? 'education-error' : undefined}
              />
              {errors.education && (
                <p id="education-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.education.message}
                </p>
              )}
            </div>

            {/* Años de Experiencia */}
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Años de Experiencia *
              </label>
              <select
                {...register('experience')}
                id="experience"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.experience ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-required="true"
                aria-invalid={errors.experience ? 'true' : 'false'}
                aria-describedby={errors.experience ? 'experience-error' : undefined}
              >
                <option value="">Seleccionar experiencia</option>
                <option value="1-3 años">1-3 años</option>
                <option value="4-7 años">4-7 años</option>
                <option value="8-15 años">8-15 años</option>
                <option value="Más de 15 años">Más de 15 años</option>
              </select>
              {errors.experience && (
                <p id="experience-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.experience.message}
                </p>
              )}
            </div>
          </div>

          {/* Descripción Breve */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Descripción Breve *
            </label>
            <textarea
              {...register('description')}
              id="description"
              rows={2}
              className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                errors.description ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Descripción breve para mostrar en las tarjetas de equipo..."
              aria-required="true"
              aria-invalid={errors.description ? 'true' : 'false'}
              aria-describedby={errors.description ? 'description-error' : undefined}
            />
            {errors.description && (
              <p id="description-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Biografía Profesional */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Biografía Profesional *
            </label>
            <textarea
              {...register('bio')}
              id="bio"
              rows={4}
              className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                errors.bio ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Describe la trayectoria profesional, logros destacados y enfoque en la práctica legal..."
              aria-required="true"
              aria-invalid={errors.bio ? 'true' : 'false'}
              aria-describedby={errors.bio ? 'bio-error' : undefined}
            />
            {errors.bio && (
              <p id="bio-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.bio.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Colegio de Abogados */}
            <div>
              <label htmlFor="barAssociation" className="block text-sm font-medium text-gray-700 mb-1">
                Colegio de Abogados
              </label>
              <input
                {...register('barAssociation')}
                type="text"
                id="barAssociation"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.barAssociation ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Ilustre Colegio de Abogados de Madrid"
                aria-invalid={errors.barAssociation ? 'true' : 'false'}
                aria-describedby={errors.barAssociation ? 'barAssociation-error' : undefined}
              />
              {errors.barAssociation && (
                <p id="barAssociation-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.barAssociation.message}
                </p>
              )}
            </div>

            {/* Idiomas */}
            <div>
              <label htmlFor="languages" className="block text-sm font-medium text-gray-700 mb-1">
                Idiomas
              </label>
              <input
                {...register('languages')}
                type="text"
                id="languages"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.languages ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Español (nativo), Inglés (avanzado), Francés (intermedio)"
                aria-invalid={errors.languages ? 'true' : 'false'}
                aria-describedby={errors.languages ? 'languages-error' : undefined}
              />
              {errors.languages && (
                <p id="languages-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.languages.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* LinkedIn */}
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
                LinkedIn (opcional)
              </label>
              <input
                {...register('linkedin')}
                type="url"
                id="linkedin"
                className={`block w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-navy focus:border-navy ${
                  errors.linkedin ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://linkedin.com/in/nombre-apellido"
                aria-invalid={errors.linkedin ? 'true' : 'false'}
                aria-describedby={errors.linkedin ? 'linkedin-error' : undefined}
              />
              {errors.linkedin && (
                <p id="linkedin-error" className="mt-1 text-sm text-red-600" role="alert">
                  {errors.linkedin.message}
                </p>
              )}
            </div>
          </div>
          {/* Botones */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-navy focus:ring-offset-2"
              aria-label="Cancelar y cerrar formulario"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-medium text-white bg-navy hover:bg-navy-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-navy focus:ring-offset-2"
              aria-describedby={isSubmitting ? 'submit-status' : undefined}
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                  <span>Guardando...</span>
                </div>
              ) : (
                isCreating ? 'Crear Miembro' : 'Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
