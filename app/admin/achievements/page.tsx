'use client';

import { useState, useEffect } from 'react';
import { achievementService } from '@/services/achievementService';
import toast from 'react-hot-toast';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Achievement = Database['public']['Tables']['achievements']['Row'];

export default function AdminAchievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Achievement>>({
    title: '',
    description: '',
    achievement_date: '',
    category: '',
    published: true,
  });

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements = async () => {
    try {
      const data = await achievementService.getAllAchievements();
      setAchievements(data);
    } catch (error) {
      toast.error('Failed to load achievements');
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
    if (!formData.title) {
      toast.error('Please enter achievement title');
      return;
    }

    try {
      if (editingId) {
        await achievementService.updateAchievement(editingId, formData);
        toast.success('Achievement updated');
      } else {
        await achievementService.createAchievement(formData as any);
        toast.success('Achievement added');
      }
      loadAchievements();
      setEditingId(null);
      setFormData({});
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try {
      await achievementService.deleteAchievement(id);
      toast.success('Deleted');
      loadAchievements();
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
          }}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add Achievement
        </button>
      </div>

      {editingId !== undefined && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
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
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Achievement Date</label>
                <input
                  type="date"
                  name="achievement_date"
                  value={formData.achievement_date || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  placeholder="e.g., Award, Recognition"
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

      <div className="grid gap-4">
        {achievements.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No achievements yet</div>
        ) : (
          achievements.map((achievement) => (
            <div key={achievement.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{achievement.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">{achievement.description}</p>
                <p className="text-sm text-slate-500 mt-2">{achievement.achievement_date} • {achievement.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(achievement)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(achievement.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function handleEdit(achievement: Achievement) {
    setEditingId(achievement.id);
    setFormData(achievement);
  }
}
