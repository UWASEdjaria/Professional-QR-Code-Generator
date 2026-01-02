import { useState, useCallback } from "react";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

let toastCount = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = "default" }: Omit<Toast, "id">) => {
    const id = (++toastCount).toString();
    const newToast = { id, title, description, variant };
    
    setToasts((prev) => [...prev, newToast]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
    
    return { id };
  }, []);

  const dismiss = useCallback((toastId?: string) => {
    setToasts((prev) => toastId ? prev.filter((t) => t.id !== toastId) : []);
  }, []);

  return { toast, dismiss, toasts };
};

export const toast = ({ title, description, variant = "default" }: Omit<Toast, "id">) => {
  // This is a standalone toast function for use outside components
  console.log(`Toast: ${title} - ${description}`);
};