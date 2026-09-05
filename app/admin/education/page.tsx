'use client';

import { useState, useEffect } from 'react';
import { educationService } from '@/services/educationService';
import toast from 'react-hot-toast';
import { Trash2, Plus, Edit2 } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Education = Database['public']['Tables']['education']['Row'];

export default function AdminEducation() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    grade: '',
    location: '',
    published: true,
  });

  useEffect(() => {
    loadEducations();
  }, []);

  const loadEducations = async () => {
    try {
      const data = await educationService.getAllEducation();
      setEducations(data);
    } catch (error) {
      toast.error('Failed to load education');
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

  const handleAddNew = () => {
    setEditingId(null);
    setFormData({
      institution: '',
      degree: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      grade: '',
      location: '',
      published: true,
    });
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setFormData(edu);
  };

  const handleSave = async () => {
    if (!formData.institution || !formData.degree) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingId) {
        await educationService.updateEducation(editingId, formData);
        toast.success('Education updated');
      } else {
        await educationService.createEducation(formData as any);
        toast.success('Education added');
      }
      loadEducations();
      setEditingId(null);
      setFormData({});
    } catch (error) {
      toast.error('Failed to save education');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      await educationService.deleteEducation(id);
      toast.success('Education deleted');
      loadEducations();
    } catch (error) {
      toast.error('Failed to delete education');
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Education</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {/* Form */}
      {editingId !== undefined && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Institution *</label>
                <input
                  type="text"
                  name="institution"
                  value={formData.institution || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Degree *</label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Field of Study</label>
              <input
                type="text"
                name="field_of_study"
                value={formData.field_of_study || ''}
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
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setFormData({});
                }}
                className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="grid gap-4">
        {educations.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <p>No education entries yet. Add one to get started!</p>
          </div>
        ) : (
          educations.map((edu) => (
            <div key={edu.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold">{edu.degree}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{edu.institution}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {edu.start_date} {edu.end_date ? `- ${edu.end_date}` : '- Present'}
              </p>
              {edu.grade && <p className="text-sm">Grade: {edu.grade}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
