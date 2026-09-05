'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, FileText, Briefcase, Award, Star, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

const adminMenuItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Profile', href: '/admin/profile', icon: FileText },
  { label: 'Education', href: '/admin/education', icon: Award },
  { label: 'Skills', href: '/admin/skills', icon: Star },
  { label: 'Projects', href: '/admin/projects', icon: Briefcase },
  { label: 'Experience', href: '/admin/experience', icon: Briefcase },
  { label: 'Certifications', href: '/admin/certifications', icon: Award },
  { label: 'Achievements', href: '/admin/achievements', icon: Star },
  { label: 'Social Links', href: '/admin/social-links', icon: FileText },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminDashboard() {
  const router = useRouter();
  const { signOut, getSession } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const session = await getSession();
      if (!session) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 overflow-y-auto`}>
        <div className="p-4 border-b border-slate-800">
          <h1 className={`font-bold ${sidebarOpen ? 'text-xl' : 'text-xs text-center'}`}>
            {sidebarOpen ? 'Portfolio Admin' : 'PA'}
          </h1>
        </div>

        <nav className="py-4">
          {adminMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800 transition-colors group"
                title={item.label}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-slate-800 transition-colors rounded-lg"
            title="Logout"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
          >
            ☰
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Total Projects</p>
                  <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <Briefcase className="w-10 h-10 text-primary-600 opacity-20" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Total Skills</p>
                  <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <Star className="w-10 h-10 text-primary-600 opacity-20" />
              </div>
            </div>
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">Certifications</p>
                  <p className="text-3xl font-bold mt-2">0</p>
                </div>
                <Award className="w-10 h-10 text-primary-600 opacity-20" />
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Welcome to Portfolio Admin</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Manage your portfolio content from the sidebar. Update your profile, add projects, edit skills, and more. All changes are reflected in real-time on your public website.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/admin/profile"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Edit Profile
              </Link>
              <Link
                href="/admin/projects"
                className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Add Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
