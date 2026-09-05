'use client';

export default function Home() {
  return (
    <div className="space-y-24 py-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
              S. Kishore Kumar
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-4">
              B.Tech AI & Data Science Student
            </p>
            <p className="text-lg text-slate-500 dark:text-slate-400 mb-8">
              Building intelligent systems through AI, Machine Learning, and Data Science
            </p>
            <div className="flex gap-4">
              <a
                href="#projects"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="border-2 border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 rounded-2xl bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center text-white text-center">
              <p className="text-sm">Profile Image Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">📚</div>
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <p className="text-slate-600 dark:text-slate-400">Pursuing B.Tech in AI & Data Science with focus on machine learning and data analysis</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">🚀</div>
            <h3 className="text-xl font-semibold mb-2">Innovation</h3>
            <p className="text-slate-600 dark:text-slate-400">Building intelligent systems and solving real-world problems using AI and ML</p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">💡</div>
            <h3 className="text-xl font-semibold mb-2">Passion</h3>
            <p className="text-slate-600 dark:text-slate-400">Passionate about learning, experimenting, and sharing knowledge with the community</p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Projects will load from Supabase */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-40 bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center text-white">
              Project 1
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Project Title</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">Project description coming from admin panel</p>
              <a href="#" className="text-primary-600 dark:text-primary-400 hover:underline font-semibold">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8">Skills & Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Skills will load from Supabase */}
          <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl">
            <h3 className="font-semibold mb-4">Programming Languages</h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>Skills loading from admin...</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
