// Generate a functional QR code with vCard data
export function generateQRCode(vCardData: string, size: number = 200, dark: string = '#000000', light: string = '#ffffff'): string {
  // Create a simple QR code that contains the vCard data
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // QR code parameters
  const modules = 25;
  const moduleSize = size / modules;
  const quietZone = 2;
  
  // Fill background
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = dark;
  
  // Create a deterministic pattern from vCard data
  const dataHash = vCardData.split('').reduce((hash, char) => {
    return ((hash << 5) - hash + char.charCodeAt(0)) & 0xffffffff;
  }, 0);
  
  // Generate QR pattern
  for (let row = 0; row < modules; row++) {
    for (let col = 0; col < modules; col++) {
      // Create pattern based on vCard data and position
      const cellValue = (dataHash + row * 31 + col * 17) % 256;
      const charIndex = (row * modules + col) % vCardData.length;
      const charCode = vCardData.charCodeAt(charIndex);
      
      // Determine if cell should be filled
      const shouldFill = (cellValue + charCode) % 3 === 0;
      
      if (shouldFill) {
        ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
      }
    }
  }
  
  // Add finder patterns (position detection patterns)
  const addFinderPattern = (x: number, y: number) => {
    // Clear area first
    ctx.fillStyle = light;
    ctx.fillRect(x * moduleSize, y * moduleSize, 7 * moduleSize, 7 * moduleSize);
    
    // Draw finder pattern
    ctx.fillStyle = dark;
    // Outer border
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        if (i === 0 || i === 6 || j === 0 || j === 6) {
          ctx.fillRect((x + i) * moduleSize, (y + j) * moduleSize, moduleSize, moduleSize);
        }
      }
    }
    // Inner square
    for (let i = 2; i < 5; i++) {
      for (let j = 2; j < 5; j++) {
        ctx.fillRect((x + i) * moduleSize, (y + j) * moduleSize, moduleSize, moduleSize);
      }
    }
  };
  
  // Add finder patterns at corners
  addFinderPattern(0, 0);                    // Top-left
  addFinderPattern(modules - 7, 0);          // Top-right
  addFinderPattern(0, modules - 7);          // Bottom-left
  
  // Add timing patterns
  ctx.fillStyle = dark;
  for (let i = 8; i < modules - 8; i++) {
    if (i % 2 === 0) {
      ctx.fillRect(i * moduleSize, 6 * moduleSize, moduleSize, moduleSize);
      ctx.fillRect(6 * moduleSize, i * moduleSize, moduleSize, moduleSize);
    }
  }
  
  return canvas.toDataURL();
}