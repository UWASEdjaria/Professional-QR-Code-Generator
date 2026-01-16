interface ContactData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  company: string;
  jobTitle: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  website: string;
  profileImage?: string;
}

interface PhoneMockupProps {
  contactData: ContactData;
  accentColor: string;
}

export function PhoneMockup({ contactData, accentColor }: PhoneMockupProps) {
  const {
    firstName,
    lastName,
    phone,
    email,
    company,
    jobTitle,
    street,
    city,
    state,
    zip,
    country,
    website
  } = contactData;

  const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'Contact Name';
  const hasAddress = street || city || state || zip || country;
  const addressLine = [street, city, state, zip, country].filter(Boolean).join(', ');

  // Get initials for avatar
  const initials = [firstName?.[0], lastName?.[0]].filter(Boolean).join('').toUpperCase() || 'CN';

  // Get current time
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false
  });

  return (
    <div className="flex justify-center">
      {/* Phone Frame */}
      <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
        {/* Phone Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-10" />
        
        {/* Phone Screen */}
        <div className="w-full h-full bg-white rounded-[2.2rem] overflow-hidden relative border border-gray-200">
          {/* Status Bar */}
          <div className="h-12 bg-white flex items-center justify-between px-6 pt-2">
            <span className="text-xs font-medium text-gray-900">{currentTime}</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-gray-900 rounded-sm">
                <div className="w-3/4 h-full bg-gray-900 rounded-sm" />
              </div>
            </div>
          </div>

          {/* Contact Card Header */}
          <div 
            className="px-4 pt-4 pb-6 text-center"
            style={{ backgroundColor: accentColor + '20' }}
          >
            {/* Avatar */}
            <div 
              className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-2xl font-bold shadow-lg overflow-hidden"
              style={{ backgroundColor: accentColor }}
            >
              {contactData.profileImage ? (
                <img 
                  src={contactData.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                initials
              )}
            </div>
            
            {/* Name */}
            <h2 className="text-lg font-semibold text-gray-900 truncate px-2">
              {fullName}
            </h2>
            
            {/* Job Title & Company */}
            {(jobTitle || company) && (
              <p className="text-sm text-gray-600 truncate px-2">
                {[jobTitle, company].filter(Boolean).join(' at ')}
              </p>
            )}
          </div>

          {/* Contact Details */}
          <div className="px-4 py-3 space-y-1 bg-white">
            {/* Phone */}
            <div className="flex items-center gap-3 py-2.5 border-b border-gray-200">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100"
                style={{ backgroundColor: accentColor + '20', color: accentColor }}
                onClick={() => phone && window.open(`tel:${phone}`, '_self')}
              >
                📱
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">mobile</p>
                <p 
                  className="text-sm text-gray-900 truncate cursor-pointer hover:underline"
                  onClick={() => phone && window.open(`tel:${phone}`, '_self')}
                >
                  {phone || '(000) 000-0000'}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 py-2.5 border-b border-gray-200">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100"
                style={{ backgroundColor: accentColor + '20', color: accentColor }}
                onClick={() => email && window.open(`mailto:${email}`, '_self')}
              >
                ✉️
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">email</p>
                <p 
                  className="text-sm text-gray-900 truncate cursor-pointer hover:underline"
                  onClick={() => email && window.open(`mailto:${email}`, '_self')}
                >
                  {email || 'email@example.com'}
                </p>
              </div>
            </div>

            {/* Company */}
            {company && (
              <div className="flex items-center gap-3 py-2.5 border-b border-gray-200">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ backgroundColor: accentColor + '20', color: accentColor }}
                >
                  🏢
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">company</p>
                  <p className="text-sm text-gray-900 truncate">{company}</p>
                </div>
              </div>
            )}

            {/* Address */}
            {hasAddress && (
              <div className="flex items-center gap-3 py-2.5 border-b border-gray-200">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
                  style={{ backgroundColor: accentColor + '20', color: accentColor }}
                >
                  📍
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">address</p>
                  <p className="text-sm text-gray-900 truncate">{addressLine}</p>
                </div>
              </div>
            )}

            {/* Website */}
            {website && (
              <div className="flex items-center gap-3 py-2.5">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm cursor-pointer hover:bg-gray-100"
                  style={{ backgroundColor: accentColor + '20', color: accentColor }}
                  onClick={() => window.open(website.startsWith('http') ? website : `https://${website}`, '_blank')}
                >
                  🌐
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">website</p>
                  <p 
                    className="text-sm text-gray-900 truncate cursor-pointer hover:underline"
                    onClick={() => window.open(website.startsWith('http') ? website : `https://${website}`, '_blank')}
                  >
                    {website}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Home Indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-400 rounded-full" />
        </div>
      </div>
    </div>
  );
}
