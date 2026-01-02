import { useState } from 'react';
import { Save, RotateCcw, User } from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ColorPicker } from './ColorPicker';
import { Button } from './ui/button';

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

  const hasData = firstName || lastName || phone || email || company;

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
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Left - Phone Mockup */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
          <h3 className="text-lg font-semibold text-center mb-4">Live Preview</h3>
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
              website
            }}
            accentColor={foregroundColor}
          />
        </div>
      </div>

      {/* Middle - Contact Form */}
      <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-1">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-6">
          <User className="h-5 w-5" />
          Contact Information
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
          <h3 className="text-lg font-semibold mb-4">Customize Colors</h3>
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
          <h3 className="text-lg font-semibold mb-4">QR Code Preview</h3>
          <div className="border-2 border-dashed border-gray-300 h-32 flex items-center justify-center rounded-lg">
            <p className="text-gray-500">QR Code will appear here</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleSave}
            disabled={!name.trim() || !hasData || saving}
            className="flex-1"
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save QR Code'}
          </Button>
          <Button onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}