import Image from 'next/image';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const logoSrc = '/Logo2.svg'; // Usa un SVG de alta resolución

const sizeMap = {
  sm: { width: 100, height: 50 },
  md: { width: 140, height: 70 },
  lg: { width: 200, height: 100 }
};

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const { width, height } = sizeMap[size];

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src={logoSrc}
        alt="Logotipo López y Escobar Abogados"
        width={width}
        height={height}
        className="object-contain hover:opacity-90 transition-opacity duration-300"
        priority
        style={{
          width: 'auto',
          height: `${height}px`,
          maxWidth: `${width}px`,
        }}
      />
    </div>
  );
}
