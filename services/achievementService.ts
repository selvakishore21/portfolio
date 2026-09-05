import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Achievement = Database['public']['Tables']['achievements']['Row'];

export const achievementService = {
  async getAchievements(): Promise<Achievement[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching achievements:', error);
    return data || [];
  },

  async getAllAchievements() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching achievements:', error);
    return data || [];
  },

  async createAchievement(achievement: Omit<Achievement, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('achievements')
      .insert([achievement])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateAchievement(id: string, updates: Partial<Achievement>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('achievements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteAchievement(id: string) {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('achievements')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
