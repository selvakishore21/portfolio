import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Experience = Database['public']['Tables']['experience']['Row'];

export const experienceService = {
  async getExperience(): Promise<Experience[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching experience:', error);
    return data || [];
  },

  async getAllExperience() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching experience:', error);
    return data || [];
  },

  async createExperience(exp: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('experience')
      .insert([exp])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateExperience(id: string, updates: Partial<Experience>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('experience')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteExperience(id: string) {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
