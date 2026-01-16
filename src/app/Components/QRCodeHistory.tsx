import { useState, useEffect } from 'react';

interface QRCodeItem {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  company?: string;
  createdAt: string;
  qr_image?: string;
}

function getInitialQRCodes(): QRCodeItem[] {
  if (typeof window === 'undefined') return [];
  const saved = localStorage.getItem('qrCodes');
  return saved ? JSON.parse(saved) : [];
}

export function QRCodeHistory() {
  const [qrCodes, setQrCodes] = useState<QRCodeItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQrCodes(getInitialQRCodes());
    
    const handleQRCodeSaved = () => {
      setQrCodes(getInitialQRCodes());
    };
    
    window.addEventListener('qrCodeSaved', handleQRCodeSaved);
    return () => window.removeEventListener('qrCodeSaved', handleQRCodeSaved);
  }, []);

  const deleteQRCode = (id: string) => {
    const updated = qrCodes.filter(qr => qr.id !== id);
    setQrCodes(updated);
    localStorage.setItem('qrCodes', JSON.stringify(updated));
  };

  if (!mounted) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">QR Code History</h2>
        <p className="text-gray-500 text-center py-8">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">QR Code History</h2>
      
      {qrCodes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No QR codes saved yet</p>
      ) : (
        <div className="space-y-3">
          {qrCodes.map((qr) => (
            <div key={qr.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                {qr.qr_image ? (
                  <img 
                    src={qr.qr_image} 
                    alt="QR Code" 
                    className="w-16 h-16 border border-gray-300 rounded"
                  />
                ) : (
                  <div className="w-16 h-16 border border-gray-300 rounded bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-500">QR</span>
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{qr.name}</h3>
                  <p className="text-sm text-gray-600">
                    {qr.first_name} {qr.last_name} • {qr.company}
                  </p>
                  <p className="text-xs text-gray-400">
                    Created: {qr.createdAt ? new Date(qr.createdAt).toLocaleDateString() : 'Unknown'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => deleteQRCode(qr.id)}
                className="text-red-500 hover:text-red-700 text-sm px-3 py-1 border border-red-300 rounded hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}