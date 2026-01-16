/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface QRCodePreviewProps {
  data: string;
  foregroundColor: string;
  backgroundColor: string;
  size?: number;
}

export function QRCodePreview({ 
  data, 
  foregroundColor, 
  backgroundColor, 
  size = 256 
}: QRCodePreviewProps) {
  const [pngUrl, setPngUrl] = useState<string>('');
  const [svgString, setSvgString] = useState<string>('');

  useEffect(() => {
    if (!data) {
      setPngUrl('');
      setSvgString('');
      return;
    }

    // Generate simple QR code placeholder
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, size, size);
      ctx.fillStyle = foregroundColor;
      
      // Simple QR pattern
      const cellSize = size / 25;
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          if ((i + j) % 2 === 0) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
          }
        }
      }
      
      setPngUrl(canvas.toDataURL());
      setSvgString(`<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect width="${size}" height="${size}" fill="${backgroundColor}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="${foregroundColor}">QR</text></svg>`);
    }
  }, [data, foregroundColor, backgroundColor, size]);

  const downloadPNG = () => {
    if (!pngUrl) return;
    const link = document.createElement('a');
    link.href = pngUrl;
    link.download = 'qrcode.png';
    link.click();
  };

  const downloadSVG = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!data) {
    return (
      <div className="border-2 border-dashed border-gray-300 rounded-lg">
        <div className="flex items-center justify-center h-64 text-gray-500">
          Enter contact details to generate QR code
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg">
      <div className="p-6 space-y-4">
        <div className="flex justify-center">
          {pngUrl && (
            <img 
              src={pngUrl} 
              alt="QR Code" 
              className="rounded-lg shadow-sm"
              style={{ width: size, height: size }}
            />
          )}
        </div>
        
        <div className="flex gap-2 justify-center">
          <Button onClick={downloadPNG} variant="outline" size="sm">
            📷 PNG
          </Button>
          <Button onClick={downloadSVG} variant="outline" size="sm">
            📄 SVG
          </Button>
        </div>
      </div>
    </div>
  );
}


