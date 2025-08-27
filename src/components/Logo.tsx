import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const logoSrc = '/Logo1.png'; // Usa un PNG de alta resolución

const sizeMap = {
  sm: { width: 56, height: 28 },
  md: { width: 96, height: 48 },
  lg: { width: 140, height: 70 }
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <div className={`flex justify-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Logotipo López y Escobar Abogados"
        width={width}
        height={height}
        className="h-auto w-auto max-w-full hover:opacity-90 transition-opacity"
        priority
        style={{ height, width }}
      />
    </div>
  );
}
