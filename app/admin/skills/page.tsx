'use client';

import { useState, useEffect } from 'react';
import { skillService } from '@/services/skillService';
import toast from 'react-hot-toast';
import { Trash2, Plus } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Skill = Database['public']['Tables']['skills']['Row'];

const SKILL_CATEGORIES = ['Programming Languages', 'AI/ML', 'Data Science', 'Deep Learning', 'Web Development', 'Databases', 'Cloud', 'Tools'];
const PROFICIENCY_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function AdminSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: 'Programming Languages',
    proficiency: 'Intermediate',
    published: true,
  });

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await skillService.getAllSkills();
      setSkills(data);
    } catch (error) {
      toast.error('Failed to load skills');
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
    if (!formData.name) {
      toast.error('Please enter skill name');
      return;
    }

    try {
      await skillService.createSkill(formData as any);
      toast.success('Skill added');
      loadSkills();
      setShowForm(false);
      setFormData({ name: '', category: 'Programming Languages', proficiency: 'Intermediate', published: true });
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await skillService.deleteSkill(id);
      toast.success('Skill deleted');
      loadSkills();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Skill Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  placeholder="e.g., Python, React, TensorFlow"
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category as string}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                >
                  {SKILL_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Proficiency Level</label>
              <select
                name="proficiency"
                value={formData.proficiency as string}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
              >
                {PROFICIENCY_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Add Skill
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {Object.keys(groupedSkills).length === 0 ? (
        <div className="text-center py-8 text-slate-500">
          <p>No skills added yet. Add your first skill!</p>
        </div>
      ) : (
        <div className="grid gap-8">
          {SKILL_CATEGORIES.filter((cat) => groupedSkills[cat]).map((category) => (
            <div key={category}>
              <h2 className="text-2xl font-bold mb-4">{category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {groupedSkills[category]?.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 flex justify-between items-start group hover:shadow-lg transition-shadow"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{skill.proficiency}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(skill.id)}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
