import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-Auth';

export interface QRCodeRecord {
  id: string;
  user_id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  email: string | null;
  company: string | null;
  job_title: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  website: string | null;
  foreground_color: string;
  background_color: string;
  created_at: string;
  updated_at: string;
}

export interface QRCodeInput {
  name: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  email?: string;
  company?: string;
  job_title?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  website?: string;
  foreground_color: string;
  background_color: string;
}

export function useQRCodes() {
  const { user } = useAuth();
  const [qrCodes, setQRCodes] = useState<QRCodeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchQRCodes = async () => {
    if (!user) {
      setQRCodes([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setQRCodes(data || []);
    } catch (error) {
      console.error('Error fetching QR codes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, [user]);

  const saveQRCode = async (input: QRCodeInput): Promise<QRCodeRecord | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('qr_codes')
        .insert({
          user_id: user.id,
          ...input,
        })
        .select()
        .single();

      if (error) throw error;
      
      setQRCodes(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Error saving QR code:', error);
      return null;
    }
  };

  return {
    qrCodes,
    loading,
    saveQRCode,
    refetch: fetchQRCodes,
  };
}