import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Profile = Database['public']['Tables']['profiles']['Row'];

export const profileService = {
  async getProfile(): Promise<Profile | null> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .single();

    if (error) console.error('Error fetching profile:', error);
    return data || null;
  },

  async updateProfile(updates: Partial<Profile>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
