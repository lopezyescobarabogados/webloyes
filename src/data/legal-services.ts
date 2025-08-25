export interface LegalService {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  detailedDescription?: string;
  keyServices: string[];
  features?: string[];
  benefits?: string[];
  process?: string[];
  targetAudience: string;
  icon: string;
  color: string;
  slug: string;
}

export const legalServices: LegalService[] = [
  {
    id: 'derecho-civil-inmobiliario',
    title: 'Derecho Civil e Inmobiliario',
    shortDescription: 'Acompañamiento legal en relaciones civiles, patrimoniales y de bienes inmuebles.',
    fullDescription: 'Brindamos acompañamiento y representación legal en todos los asuntos relacionados con relaciones civiles, patrimoniales y de bienes. Esta área es clave para quienes compran, venden, arriendan o administran bienes inmuebles, o enfrentan disputas legales entre particulares.',
    detailedDescription: 'Nuestro equipo especializado en Derecho Civil e Inmobiliario cuenta con amplia experiencia en transacciones inmobiliarias complejas, resolución de conflictos patrimoniales y gestión de procesos civiles. Ofrecemos un servicio integral que va desde la prevención de riesgos legales hasta la representación judicial cuando sea necesario.',
    keyServices: [
      'Procesos de responsabilidad civil contractual y extracontractual',
      'Cobros jurídicos, embargos, procesos ejecutivos',
      'Resolución de conflictos entre particulares',
      'Contratos de compraventa, arrendamiento, usufructo, fideicomisos',
      'Estudio de títulos y saneamiento de propiedad inmueble',
      'Trámites notariales y registros inmobiliarios',
      'Asesoría y litigio en propiedad horizontal'
    ],
    features: [
      'Análisis jurídico completo de documentos inmobiliarios',
      'Acompañamiento en todas las etapas del proceso',
      'Estudio de títulos con verificación completa',
      'Gestión de trámites notariales y registrales',
      'Asesoría preventiva para evitar futuros conflictos',
      'Representación judicial especializada'
    ],
    benefits: [
      'Seguridad jurídica en todas sus transacciones',
      'Prevención de riesgos legales futuros',
      'Ahorro de tiempo en trámites complejos',
      'Protección de su patrimonio inmobiliario',
      'Resolución eficiente de conflictos',
      'Acceso a red de notarios y registradores'
    ],
    process: [
      'Análisis inicial del caso y documentación',
      'Estudio de títulos y verificación legal',
      'Elaboración de estrategia jurídica',
      'Gestión de trámites y negociaciones',
      'Formalización y registro de operaciones',
      'Seguimiento post-operación'
    ],
    targetAudience: 'Personas naturales y jurídicas que requieran asesoría en temas civiles e inmobiliarios',
    icon: 'building',
    color: 'blue',
    slug: 'derecho-civil-inmobiliario'
  },
  {
    id: 'derecho-comercial-societario',
    title: 'Derecho Comercial y Societario',
    shortDescription: 'Estructuración, desarrollo y defensa jurídica de negocios y sociedades.',
    fullDescription: 'Apoyamos a empresarios, emprendedores y sociedades en la estructuración, desarrollo y defensa de sus negocios. Nuestro objetivo es blindar jurídicamente las operaciones comerciales y promover relaciones empresariales estables y transparentes.',
    detailedDescription: 'Contamos con experiencia probada en el acompañamiento jurídico empresarial, desde startups hasta grandes corporaciones. Nuestro enfoque integral combina conocimiento técnico, visión de negocio y capacidad de negociación para estructurar operaciones comerciales exitosas y sostenibles.',
    keyServices: [
      'Constitución y formalización de empresas',
      'Reestructuración empresarial y transformación de sociedades',
      'Redacción y revisión de contratos mercantiles',
      'Representación judicial en procesos de incumplimiento contractual',
      'Asesoría en juntas de socios y gobierno corporativo',
      'Resolución de conflictos entre accionistas o socios',
      'Reformas estatutarias y transformación societaria'
    ],
    features: [
      'Constitución de empresas en tiempo récord',
      'Estructuras societarias optimizadas',
      'Contratos mercantiles blindados jurídicamente',
      'Gobierno corporativo moderno y eficiente',
      'Resolución alternativa de conflictos',
      'Acompañamiento en operaciones M&A'
    ],
    benefits: [
      'Estructura empresarial sólida y protegida',
      'Reducción de riesgos contractuales',
      'Optimización de costos societarios',
      'Relaciones comerciales más estables',
      'Acceso a mercados y oportunidades',
      'Crecimiento empresarial sostenible'
    ],
    process: [
      'Análisis de la estructura empresarial actual',
      'Diseño de estrategia jurídico-comercial',
      'Elaboración de documentos societarios',
      'Gestión de trámites de constitución',
      'Implementación de gobierno corporativo',
      'Monitoreo y actualización continua'
    ],
    targetAudience: 'Empresarios, emprendedores, sociedades y empresas de todos los tamaños',
    icon: 'briefcase',
    color: 'green',
    slug: 'derecho-comercial-societario'
  },
  {
    id: 'derecho-tributario',
    title: 'Derecho Tributario',
    shortDescription: 'Soluciones legales frente a obligaciones tributarias y fiscales.',
    fullDescription: 'Ofrecemos soluciones legales frente a las obligaciones tributarias de personas naturales y jurídicas. Nuestra asesoría tributaria permite optimizar cargas fiscales dentro del marco legal, prevenir sanciones y garantizar el cumplimiento normativo.',
    keyServices: [
      'Planeación fiscal y tributaria empresarial',
      'Defensa en procesos sancionatorios de la DIAN',
      'Revisión y auditoría de obligaciones fiscales',
      'Recursos administrativos contra liquidaciones oficiales',
      'Gestión de devoluciones, compensaciones y retenciones',
      'Estrategias para minimizar riesgos tributarios',
      'Acciones judiciales tributarias'
    ],
    targetAudience: 'Personas naturales y jurídicas con obligaciones tributarias',
    icon: 'calculator',
    color: 'purple',
    slug: 'derecho-tributario'
  },
  {
    id: 'derecho-laboral',
    title: 'Derecho Laboral y Seguridad Social',
    shortDescription: 'Asesoría integral en normatividad laboral y sistema de seguridad social.',
    fullDescription: 'Acompañamos a empresas y trabajadores en la correcta interpretación y aplicación de la normatividad laboral y del sistema de seguridad social colombiano. Esto permite a las empresas reducir riesgos de demandas laborales y mantener relaciones laborales sanas, eficientes y conforme a la ley.',
    keyServices: [
      'Elaboración y revisión de contratos de trabajo',
      'Estrategias de contratación laboral y tercerización',
      'Procesos disciplinarios y terminaciones con justa causa',
      'Defensa en demandas laborales ante juzgados',
      'Asesoría en aportes al sistema de seguridad social',
      'Conciliaciones laborales extrajudiciales',
      'Representación ante el Ministerio de Trabajo'
    ],
    targetAudience: 'Empresas empleadoras y trabajadores que requieran asesoría laboral',
    icon: 'users',
    color: 'orange',
    slug: 'derecho-laboral'
  },
  {
    id: 'sgsst',
    title: 'SG-SST (Sistema de Gestión en Seguridad y Salud en el Trabajo)',
    shortDescription: 'Implementación del Sistema de Gestión de Seguridad y Salud en el Trabajo.',
    fullDescription: 'Implementamos estrategias legales y técnicas para la conformidad del Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST), obligatorio según la legislación colombiana. Un SG-SST bien implementado protege a los trabajadores, reduce accidentes laborales y evita sanciones por incumplimiento normativo.',
    keyServices: [
      'Diseño e implementación del SG-SST conforme al Decreto 1072 de 2015',
      'Auditorías internas y acompañamiento en inspecciones',
      'Diagnóstico de cumplimiento y planes de mejora',
      'Capacitaciones en prevención de riesgos laborales',
      'Documentación legal del sistema (políticas, formatos, matrices)',
      'Procedimientos de seguridad y salud ocupacional',
      'Seguimiento y evaluación del sistema'
    ],
    targetAudience: 'Empresas obligadas a implementar el Sistema de Gestión SG-SST',
    icon: 'shield',
    color: 'red',
    slug: 'sgsst'
  },
  {
    id: 'sagrilaft',
    title: 'SAGRILAFT (Sistema de Autocontrol LA/FT/FPADM)',
    shortDescription: 'Sistema de prevención de lavado de activos y financiamiento del terrorismo.',
    fullDescription: 'Asesoramos a empresas obligadas en la adopción del Sistema de Autocontrol y Gestión del Riesgo de Lavado de Activos, Financiamiento del Terrorismo y Proliferación de Armas de Destrucción Masiva (SAGRILAFT). Este sistema es esencial para garantizar la legalidad en la operación empresarial, evitar sanciones y proteger la reputación corporativa.',
    keyServices: [
      'Diagnóstico de cumplimiento frente a la normativa SAGRILAFT',
      'Diseño e implementación según el tamaño y riesgo de la empresa',
      'Elaboración de políticas y manuales internos de prevención',
      'Capacitación al oficial de cumplimiento y empleados',
      'Reportes a la UIAF y soporte ante inspecciones',
      'Auditorías de cumplimiento periódicas',
      'Actualización normativa y mejores prácticas'
    ],
    targetAudience: 'Empresas obligadas por la Superintendencia de Sociedades',
    icon: 'eye',
    color: 'indigo',
    slug: 'sagrilaft'
  }
];

export const getServiceBySlug = (slug: string): LegalService | undefined => {
  return legalServices.find(service => service.slug === slug);
};

export const getServiceIcon = (iconName: string): string => {
  const icons: Record<string, string> = {
    building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    briefcase: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    calculator: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    users: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z',
    shield: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    eye: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
  };
  return icons[iconName] || icons.briefcase;
};
