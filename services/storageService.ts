import { createClientComponentClient } from '@/lib/supabase/client';

export const storageService = {
  async uploadProfileImage(file: File): Promise<string> {
    const supabase = createClientComponentClient();
    const fileName = `profile-${Date.now()}.${file.name.split('.').pop()}`;

    const { data, error } = await supabase.storage
      .from('profile')
      .upload(fileName, file, { upsert: true });

    if (error) throw error;
    return data.path;
  },

  async uploadProjectImage(file: File): Promise<string> {
    const supabase = createClientComponentClient();
    const fileName = `project-${Date.now()}.${file.name.split('.').pop()}`;

    const { data, error } = await supabase.storage
      .from('projects')
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  },

  async uploadResume(file: File): Promise<string> {
    const supabase = createClientComponentClient();
    const fileName = `resume-${Date.now()}.${file.name.split('.').pop()}`;

    const { data, error } = await supabase.storage
      .from('resume')
      .upload(fileName, file, { upsert: true });

    if (error) throw error;
    return data.path;
  },

  async uploadCertificate(file: File): Promise<string> {
    const supabase = createClientComponentClient();
    const fileName = `cert-${Date.now()}.${file.name.split('.').pop()}`;

    const { data, error } = await supabase.storage
      .from('certificates')
      .upload(fileName, file);

    if (error) throw error;
    return data.path;
  },

  getPublicUrl(bucket: string, path: string): string {
    const supabase = createClientComponentClient();
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },
};
