"use client";

import { NavLink } from "./Components/NavLink";
import { QRCodeForm } from "./Components/QRCodeForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <nav className="mb-8">
        <NavLink href="/">
          Home
        </NavLink>
      </nav>
      
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Professional QR Code Generator
        </h1>
        
        <QRCodeForm onSave={async (data) => {
          console.log('Saving QR code:', data);
        }} />
      </div>
    </div>
  );
}