import { useState } from 'react';
import { PhoneMockup } from './PhoneMockup';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ColorPicker } from './ColorPicker';
import { Button } from './ui/button';
import { generateQRCode } from '../lib/qrcode';

interface QRCodeInput {
  name: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  company?: string;
  job_title?: string;
  website?: string;
  foreground_color: string;
  background_color: string;
}

interface QRCodeFormProps {
  onSave: (data: QRCodeInput) => Promise<void>;
  initialData?: Partial<QRCodeInput>;
  isEditing?: boolean;
}

export function QRCodeForm({ onSave, initialData, isEditing = false }: QRCodeFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [firstName, setFirstName] = useState(initialData?.first_name || '');
  const [lastName, setLastName] = useState(initialData?.last_name || '');
  const [phone, setPhone] = useState(initialData?.phone || '');
  const [email, setEmail] = useState(initialData?.email || '');
  const [company, setCompany] = useState(initialData?.company || '');
  const [jobTitle, setJobTitle] = useState(initialData?.job_title || '');
  const [website, setWebsite] = useState(initialData?.website || '');
  const [foregroundColor, setForegroundColor] = useState(initialData?.foreground_color || '#1a1a2e');
  const [backgroundColor, setBackgroundColor] = useState(initialData?.background_color || '#ffffff');
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateVCard = () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${[firstName, lastName].filter(Boolean).join(' ')}`,
      firstName ? `N:${lastName || ''};${firstName};;;` : '',
      phone ? `TEL:${phone}` : '',
      email ? `EMAIL:${email}` : '',
      company ? `ORG:${company}` : '',
      jobTitle ? `TITLE:${jobTitle}` : '',
      website ? `URL:${website}` : '',
      'END:VCARD'
    ].filter(Boolean).join('\n');
    return vcard;
  };

  const generateQRCodeImage = () => {
    const vcard = generateVCard();
    return generateQRCode(vcard, 200, foregroundColor, backgroundColor);
  };

  const downloadQRCode = () => {
    if (!qrCodeDataUrl) return;
    
    try {
      const link = document.createElement('a');
      link.href = qrCodeDataUrl;
      link.download = `${name || 'qr-code'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(qrCodeDataUrl, '_blank');
    }
  };

  const hasData = firstName || lastName || phone || email || company;
  const qrCodeDataUrl = hasData ? generateQRCodeImage() : null;

  const handleSave = async () => {
    if (!name.trim()) return;
    
    setSaving(true);
    try {
      await onSave({
        name,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        phone: phone || undefined,
        email: email || undefined,
        company: company || undefined,
        job_title: jobTitle || undefined,
        website: website || undefined,
        foreground_color: foregroundColor,
        background_color: backgroundColor,
        vcard: generateVCard(),
        profile_image: profileImage || undefined,
        qr_image: qrCodeDataUrl || undefined,
      });
      
      if (!isEditing) {
        handleReset();
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setName('');
    setFirstName('');
    setLastName('');
    setPhone('');
    setEmail('');
    setCompany('');
    setJobTitle('');
    setWebsite('');
    setForegroundColor('#1a1a2e');
    setBackgroundColor('#ffffff');
    setProfileImage('');
    
    // Reset file input
    const fileInput = document.getElementById('profileImage') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="grid md:grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
      {/* Left - Phone Mockup */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
          <h3 className="text-lg font-semibold text-center mb-4 text-gray-900">Live Preview</h3>
          <PhoneMockup
            contactData={{
              firstName,
              lastName,
              phone,
              email,
              company,
              jobTitle,
              street: '',
              city: '',
              state: '',
              zip: '',
              country: '',
              website,
              profileImage
            }}
            accentColor={foregroundColor}
          />
        </div>
      </div>

      {/* Middle - Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-6 text-gray-900">
          👤 Contact Information
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">QR Code Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., My Business Card"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image</Label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
            />
            {profileImage && (
              <div className="mt-2">
                <img src={profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover border border-gray-300" />
              </div>
            )}
          </div>

          <hr className="border-gray-200" />

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 234 567 8900"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* Right - Colors & Actions */}
      <div className="space-y-6 lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Customize Colors</h3>
          <div className="space-y-4">
            <ColorPicker
              label="QR Code Color"
              value={foregroundColor}
              onChange={setForegroundColor}
            />
            <ColorPicker
              label="Background Color"
              value={backgroundColor}
              onChange={setBackgroundColor}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">QR Code Preview</h3>
          <div className="flex justify-center mb-4">
            {qrCodeDataUrl ? (
              <div className="text-center">
                <img 
                  src={qrCodeDataUrl} 
                  alt="QR Code" 
                  className="w-48 h-48 border border-gray-300 rounded-lg mb-3"
                />
                <Button 
                  onClick={downloadQRCode}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  📥 Download QR Code
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 h-48 w-48 flex items-center justify-center rounded-lg">
                <p className="text-gray-500">Enter contact details</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={!name.trim() || !hasData || saving}
            className="flex-1"
          >
            💾 {saving ? 'Saving...' : 'Save QR Code'}
          </Button>
          <Button onClick={handleReset} variant="outline">
            🔄 Reset
          </Button>
        </div>
      </div>
    </div>
  );
}