import { createClientComponentClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/database.types';

type Project = Database['public']['Tables']['projects']['Row'];

export const projectService = {
  async getFeaturedProjects(): Promise<Project[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching featured projects:', error);
    return data || [];
  },

  async getAllProjects(): Promise<Project[]> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true });

    if (error) console.error('Error fetching projects:', error);
    return data || [];
  },

  async getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) console.error('Error fetching project:', error);
    return data || null;
  },

  async createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProject(id: string, updates: Partial<Project>) {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteProject(id: string) {
    const supabase = createClientComponentClient();
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
