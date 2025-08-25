import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata(
  'Servicios Jurídicos - López y Escobar Abogados Asociados',
  'Litigio y asesorías jurídicas especializadas: Derecho Civil, Inmobiliario, Comercial, Societario, Tributario, Laboral, SG-SST y SAGRILAFT.',
  '/servicios',
  ['servicios jurídicos', 'derecho civil', 'derecho comercial', 'derecho tributario', 'derecho laboral', 'SG-SST', 'SAGRILAFT', 'abogados especialistas']
);

export default function ServiciosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
