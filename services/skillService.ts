import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Skill = Database['public']['Tables']['skills']['Row'];

export const skillService = {
  async getSkills(): Promise<Skill[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .eq('published', true)
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching skills:', error);
    return data || [];
  },

  async getAllSkills() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching skills:', error);
    return data || [];
  },

  async createSkill(skill: Omit<Skill, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('skills')
      .insert([skill])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSkill(id: string, updates: Partial<Skill>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('skills')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSkill(id: string) {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
