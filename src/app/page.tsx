"use client";

import { NavLink } from "./Components/NavLink";
import { QRCodeForm } from "./Components/QRCodeForm";
import { QRCodeHistory } from "./Components/QRCodeHistory";

import { ThemeToggle } from "./Components/ThemeToggle";

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSave = async (data: any) => {
    try {
      const savedQRCodes = JSON.parse(localStorage.getItem('qrCodes') || '[]');
      
      const newQRCode = {
        id: Date.now().toString(),
        name: data.name,
        first_name: data.first_name,
        last_name: data.last_name,
        phone: data.phone,
        email: data.email,
        company: data.company,
        job_title: data.job_title,
        website: data.website,
        foreground_color: data.foreground_color,
        background_color: data.background_color,
        qr_image: data.qr_image,
        created_at: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      
      // Add to existing history instead of replacing
      const updatedQRCodes = [newQRCode, ...savedQRCodes];
      localStorage.setItem('qrCodes', JSON.stringify(updatedQRCodes));
      
      window.dispatchEvent(new CustomEvent('qrCodeSaved'));
    } catch (error) {
      console.error('Failed to save QR code:', error);
      alert('Failed to save QR code.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <nav className="mb-8 flex justify-between items-center ">
        <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
          <span className="text-2xl">📱</span>
          <div>
            <h2 className="text-xl font-bold text-gray-800">QR Code Generator</h2>
            <p className="text-sm text-gray-600">Create professional vCard QR codes</p>
          </div>
        </div>
        <ThemeToggle />
      </nav>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Professional QR Code Generator
        </h1>
        
        <QRCodeForm onSave={handleSave} />
        
        <div className="mt-12">
          <QRCodeHistory />
        </div>
      </div>
    </div>
    
  );
}