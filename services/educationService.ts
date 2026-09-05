import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Education = Database['public']['Tables']['education']['Row'];

export const educationService = {
  async getEducation(): Promise<Education[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching education:', error);
    return data || [];
  },

  async getAllEducation() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching education:', error);
    return data || [];
  },

  async createEducation(education: Omit<Education, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('education')
      .insert([education])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateEducation(id: string, updates: Partial<Education>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('education')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteEducation(id: string) {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async reorderEducation(items: Array<{ id: string; display_order: number }>) {
    const supabase = createClientComponentClient();
    const updates = items.map(item =>
      supabase
        .from('education')
        .update({ display_order: item.display_order })
        .eq('id', item.id)
    );

    const results = await Promise.all(updates);
    const errors = results.filter(r => r.error);
    if (errors.length > 0) throw new Error('Failed to reorder education');
  },
};
