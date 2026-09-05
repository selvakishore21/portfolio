'use client';

import { useState, useEffect } from 'react';
import { certificationService } from '@/services/certificationService';
import { storageService } from '@/services/storageService';
import toast from 'react-hot-toast';
import { Trash2, Plus, Edit2, Upload } from 'lucide-react';
import type { Database } from '@/lib/database.types';

type Certification = Database['public']['Tables']['certifications']['Row'];

export default function AdminCertifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Certification>>({
    title: '',
    issuer: '',
    issue_date: '',
    credential_id: '',
    credential_url: '',
    published: true,
  });

  useEffect(() => {
    loadCerts();
  }, []);

  const loadCerts = async () => {
    try {
      const data = await certificationService.getAllCertifications();
      setCerts(data);
    } catch (error) {
      toast.error('Failed to load certifications');
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setPreviewUrl(URL.createObjectURL(file));
      const path = await storageService.uploadCertificate(file);
      const publicUrl = storageService.getPublicUrl('certificates', path);
      setFormData((prev) => ({ ...prev, certificate_image_url: publicUrl }));
      toast.success('Certificate uploaded');
    } catch (error) {
      toast.error('Failed to upload');
    }
  };

  const handleSave = async () => {
    if (!formData.title || !formData.issuer) {
      toast.error('Please fill required fields');
      return;
    }

    try {
      if (editingId) {
        await certificationService.updateCertification(editingId, formData);
        toast.success('Certification updated');
      } else {
        await certificationService.createCertification(formData as any);
        toast.success('Certification added');
      }
      loadCerts();
      setEditingId(null);
      setFormData({});
      setPreviewUrl(null);
    } catch (error) {
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete?')) return;
    try {
      await certificationService.deleteCertification(id);
      toast.success('Deleted');
      loadCerts();
    } catch (error) {
      toast.error('Failed');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Certifications</h1>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({});
          }}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {editingId !== undefined && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 mb-8">
          <div className="space-y-4">
            {(previewUrl || formData.certificate_image_url) && (
              <img src={previewUrl || formData.certificate_image_url} alt="Cert" className="w-32 h-32 rounded object-cover" />
            )}
            <label className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg cursor-pointer w-fit">
              <Upload className="w-4 h-4" />
              Upload Certificate
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>

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
                <label className="block text-sm font-medium mb-2">Issuer *</label>
                <input
                  type="text"
                  name="issuer"
                  value={formData.issuer || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Issue Date</label>
                <input
                  type="date"
                  name="issue_date"
                  value={formData.issue_date || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Expiry Date</label>
                <input
                  type="date"
                  name="expiry_date"
                  value={formData.expiry_date || ''}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Credential ID</label>
              <input
                type="text"
                name="credential_id"
                value={formData.credential_id || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Credential URL</label>
              <input
                type="url"
                name="credential_url"
                value={formData.credential_url || ''}
                onChange={handleChange}
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
        {certs.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No certifications yet</div>
        ) : (
          certs.map((cert) => (
            <div key={cert.id} className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-bold">{cert.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{cert.issuer}</p>
                <p className="text-sm text-slate-500">{cert.issue_date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(cert)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(cert.id)} className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded-lg">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  function handleEdit(cert: Certification) {
    setEditingId(cert.id);
    setFormData(cert);
    setPreviewUrl(cert.certificate_image_url || null);
  }
}
