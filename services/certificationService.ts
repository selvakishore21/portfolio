import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Certification = Database['public']['Tables']['certifications']['Row'];

export const certificationService = {
  async getCertifications(): Promise<Certification[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching certifications:', error);
    return data || [];
  },

  async getAllCertifications() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching certifications:', error);
    return data || [];
  },

  async createCertification(cert: Omit<Certification, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('certifications')
      .insert([cert])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateCertification(id: string, updates: Partial<Certification>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('certifications')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteCertification(id: string) {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
