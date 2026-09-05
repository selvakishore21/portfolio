'use client';

import { useState, useEffect } from 'react';
import { socialLinksService } from '@/services/socialLinksService';
import toast from 'react-hot-toast';
import { Trash2, Plus, Edit2, GripVertical } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type SocialLink = Database['public']['Tables']['social_links']['Row'];

const SOCIAL_PLATFORMS = ['GitHub', 'LinkedIn', 'Twitter', 'Instagram', 'Portfolio', 'Email', 'Phone', 'Custom'];

export default function AdminSocialLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<SocialLink>>({
    platform: '',
    url: '',
    published: true,
  });

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const data = await socialLinksService.getAllSocialLinks();
      setLinks(data);
    } catch (error) {
      toast.error('Failed to load social links');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.platform || !formData.url) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      if (editingId) {
        await socialLinksService.updateSocialLink(editingId, formData);
        toast.success('Link updated');
      } else {
        await socialLinksService.createSocialLink(formData as any);
        toast.success('Link added');
      }
      loadLinks();
      setEditingId(null);
      setFormData({});
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try {
      await socialLinksService.deleteSocialLink(id);
      toast.success('Deleted');
      loadLinks();
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Social Links</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
          }}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {editingId !== undefined && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Platform *</label>
                <select
                  name="platform"
                  value={formData.platform || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                >
                  <option value="">Select Platform</option>
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">URL *</label>
                <input
                  type="url"
                  name="url"
                  value={formData.url || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={handleSave} className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg">
                Save
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({});
                }}
                className="bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white px-6 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {links.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No social links yet</div>
        ) : (
          links.map((link) => (
            <div key={link.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1">
                <GripVertical className="w-4 h-4 text-slate-400 cursor-grab" />
                <div>
                  <p className="font-semibold">{link.platform}</p>
                  <a href={link.url} target="_blank" className="text-sm text-primary-600 hover:underline truncate">
                    {link.url}
                  </a>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(link)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(link.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function handleEdit(link: SocialLink) {
    setEditingId(link.id);
    setFormData(link);
  }
}
