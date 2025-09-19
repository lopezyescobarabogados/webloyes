'use client';

import Button from '@/components/ui/Button';

interface PdfDownloadProps {
  pdfUrl?: string;
  pdfName?: string;
}

export default function PdfDownload({ pdfUrl, pdfName }: PdfDownloadProps) {
  if (!pdfUrl || !pdfName) {
    return null; // No mostrar nada si no hay PDF
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="text-navy mb-6 text-xl font-semibold">
        Documento Relacionado
      </h3>
      
      <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="h-6 w-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-lg font-medium text-gray-900 mb-1">
              {pdfName}
            </h4>
            <p className="text-sm text-gray-500">
              Documento PDF
            </p>
          </div>
        </div>

        <Button
          onClick={handleDownload}
          className="flex items-center gap-2 ml-4"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Descargar PDF
        </Button>
      </div>
    </div>
  );
}
