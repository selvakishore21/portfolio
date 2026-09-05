'use client';

export default function AdminSettings() {
  return (
    <div className="p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Portfolio Settings</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Configure general settings for your portfolio website.
          </p>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h3 className="text-lg font-semibold mb-4">Theme</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="theme" value="system" defaultChecked className="w-4 h-4" />
              <span>System (follow device settings)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="theme" value="light" className="w-4 h-4" />
              <span>Light Mode</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="radio" name="theme" value="dark" className="w-4 h-4" />
              <span>Dark Mode</span>
            </label>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h3 className="text-lg font-semibold mb-4">Visibility</h3>
          <label className="flex items-center gap-3">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span>Make portfolio public</span>
          </label>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-6 flex gap-4">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-semibold">
            Save Settings
          </button>
          <button className="bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700 text-slate-900 dark:text-white px-6 py-2 rounded-lg font-semibold">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
