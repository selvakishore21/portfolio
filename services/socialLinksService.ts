import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type SocialLink = Database['public']['Tables']['social_links']['Row'];

export const socialLinksService = {
  async getSocialLinks(): Promise<SocialLink[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching social links:', error);
    return data || [];
  },

  async getAllSocialLinks() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching social links:', error);
    return data || [];
  },

  async createSocialLink(link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('social_links')
      .insert([link])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateSocialLink(id: string, updates: Partial<SocialLink>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('social_links')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteSocialLink(id: string) {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('social_links')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
