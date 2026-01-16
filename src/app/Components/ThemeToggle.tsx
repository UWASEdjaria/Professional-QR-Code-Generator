import { useState, useEffect } from 'react';
import { Button } from './ui/button';


export function ThemeToggle() {
  const [theme, setThemeState] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    const initialTheme = stored || 'light';
    setThemeState(initialTheme);
    
    // Apply theme immediately
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      <span className={`text-lg transition-all ${theme === 'dark' ? 'opacity-0 absolute' : 'opacity-100'}`}>☀️</span>
      <span className={`text-lg transition-all ${theme === 'dark' ? 'opacity-100' : 'opacity-0 absolute'}`}>🌙</span>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
