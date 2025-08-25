import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto md:h-10 lg:h-12', // Para navbar - altura fija
    md: 'w-20 h-auto md:w-28 lg:w-40', // Para uso general
    lg: 'w-32 h-auto md:w-40 lg:w-48'  // Para hero sections
  };

  const dimensions = {
    sm: { width: 48, height: 48 }, // Cuadrado pequeño para navbar
    md: { width: 160, height: 80 },
    lg: { width: 192, height: 96 }
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src="/Logo2.svg"
        alt="Logotipo López y Escobar Abogados"
        width={dimensions[size].width}
        height={dimensions[size].height}
        className={`${sizeClasses[size]} hover:opacity-90 transition-opacity`}
        priority
      />
    </div>
  );
}