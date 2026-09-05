'use client';

import { useState, useEffect } from 'react';
import { experienceService } from '@/services/experienceService';
import toast from 'react-hot-toast';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Experience = Database['public']['Tables']['experience']['Row'];

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    description: '',
    published: true,
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      const data = await experienceService.getAllExperience();
      setExperiences(data);
    } catch (error) {
      toast.error('Failed to load experience');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.company) {
      toast.error('Please fill required fields');
      return;
    }

    try {
      if (editingId) {
        await experienceService.updateExperience(editingId, formData);
        toast.success('Experience updated');
      } else {
        await experienceService.createExperience(formData as any);
        toast.success('Experience added');
      }
      loadExperiences();
      setEditingId(null);
      setFormData({});
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try {
      await experienceService.deleteExperience(id);
      toast.success('Experience deleted');
      loadExperiences();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Experience</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
          }}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {editingId !== undefined && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Company *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
              />
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

      <div className="grid gap-4">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No experience yet</div>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{exp.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{exp.company}</p>
                <p className="text-sm text-slate-500">
                  {exp.start_date} {exp.end_date ? `- ${exp.end_date}` : '- Present'}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(exp)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(exp.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function handleEdit(exp: Experience) {
    setEditingId(exp.id);
    setFormData(exp);
  }
}
