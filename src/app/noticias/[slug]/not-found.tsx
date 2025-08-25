import MainLayout from '@/layouts/MainLayout';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <MainLayout>
      <section className="flex min-h-screen items-center bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <svg
                className="mx-auto mb-6 h-24 w-24 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            </div>

            <h1 className="text-navy mb-4 font-serif text-4xl font-bold sm:text-5xl">
              Artículo no encontrado
            </h1>

            <p className="mb-8 text-lg text-gray-600">
              Lo sentimos, el artículo que buscas no existe o ha sido movido. Te
              invitamos a explorar nuestras otras noticias.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/noticias">
                <Button size="lg">Ver todas las noticias</Button>
              </Link>
              <Link href="/">
                <Button size="lg" variant="outline">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
