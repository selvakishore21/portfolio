# S. Kishore Kumar - Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38b2ac?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

A production-ready personal portfolio website for S. Kishore Kumar, a B.Tech student specializing in Artificial Intelligence and Data Science. Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Supabase**, featuring a fully editable admin panel without code changes or redeployment.

## 🌟 Features

### 📱 Public Website
- **Responsive Design** - Mobile-first approach with smooth animations
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Hero Section** - Professional headline with CTA buttons
- **About Section** - Personal introduction and highlights
- **Education Timeline** - Institutional details, degrees, grades, dates
- **Skills Showcase** - Categorized by Programming Languages, AI/ML, Data Science, Deep Learning, Web Development, Databases, Cloud, Tools
- **Projects Gallery** - Featured and all-projects showcase with detail pages
- **Experience Timeline** - Internships and work experience
- **Certifications** - Credential verification with links and images
- **Achievements** - Awards and recognitions
- **Contact Form** - Validated email inquiries
- **Social Links** - Editable social media profiles
- **SEO Optimized** - Meta tags, Open Graph, Twitter cards, sitemaps, robots.txt
- **Accessibility** - ARIA labels, keyboard navigation, reduced-motion support
- **Performance** - Server Components by default, lazy loading, optimized images

### 🔐 Admin Panel
- **Secure Authentication** - Supabase email/password auth with protected routes
- **Dashboard** - Statistics cards, recent updates, quick actions
- **Profile Manager** - Edit personal info, upload profile image
- **Education Manager** - Add/edit/delete education entries with drag-and-drop ordering
- **Skills Manager** - Categorized skills with proficiency levels
- **Projects Manager** - Project showcase with featured toggle, image uploads
- **Experience Manager** - Work and internship timeline management
- **Certifications Manager** - Upload certificate images, credential tracking
- **Achievements Manager** - Award and recognition tracking
- **Social Links Manager** - Customizable social media profiles
- **Settings** - Theme and visibility preferences
- **Image & File Upload** - Secure uploads to Supabase Storage with previews
- **Real-time Updates** - Public website reflects admin changes instantly

### 🔒 Security & Database
- **Row Level Security (RLS)** - Public users read only published content; admins can modify
- **PostgreSQL Schema** - 8 tables with UUID keys, timestamps, display ordering
- **Type Safety** - Full TypeScript types generated from database schema
- **Environment Variables** - No hardcoded secrets; `.env.example` provided
- **Storage Buckets** - Secure file uploads with optimized access policies

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Supabase account (free tier works)
- Vercel account (optional, for deployment)

### 1. Local Development Setup

```bash
# Clone the repository
git clone https://github.com/selvakishore21/portfolio.git
cd portfolio

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local
```

### 2. Configure Supabase

1. Create a [Supabase project](https://app.supabase.com)
2. In **SQL Editor**, run the schema setup script:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  headline TEXT NOT NULL,
  bio TEXT,
  profile_image_url TEXT,
  date_of_birth DATE,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT,
  resume_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create education table
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  grade TEXT,
  location TEXT,
  description TEXT,
  logo_url TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create skills table
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT CHECK (category IN ('Programming Languages', 'AI/ML', 'Data Science', 'Deep Learning', 'Web Development', 'Databases', 'Cloud', 'Tools')),
  proficiency TEXT CHECK (proficiency IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')) DEFAULT 'Intermediate',
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  start_date DATE,
  end_date DATE,
  content TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create experience table
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  company_logo_url TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_url TEXT,
  credential_id TEXT,
  certificate_image_url TEXT,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  achievement_date DATE NOT NULL,
  icon_url TEXT,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create social_links table
CREATE TABLE social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create site_settings table
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access
CREATE POLICY "Allow public read" ON profiles FOR SELECT USING (true);
CREATE POLICY "Allow public read" ON education FOR SELECT USING (published = true);
CREATE POLICY "Allow public read" ON skills FOR SELECT USING (published = true);
CREATE POLICY "Allow public read" ON projects FOR SELECT USING (published = true);
CREATE POLICY "Allow public read" ON experience FOR SELECT USING (published = true);
CREATE POLICY "Allow public read" ON certifications FOR SELECT USING (published = true);
CREATE POLICY "Allow public read" ON achievements FOR SELECT USING (published = true);
CREATE POLICY "Allow public read" ON social_links FOR SELECT USING (published = true);
CREATE POLICY "Allow public read" ON site_settings FOR SELECT USING (true);

-- Create RLS policies for authenticated admin access
CREATE POLICY "Allow admin all" ON profiles USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON education USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON skills USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON projects USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON experience USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON certifications USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON achievements USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON social_links USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin all" ON site_settings USING (auth.role() = 'authenticated');
```

3. Create Storage Buckets in **Supabase > Storage**:
   - `profile` (for profile image)
   - `projects` (for project images)
   - `resume` (for resume PDF)
   - `certificates` (for certificate images)
   - `achievements` (for achievement icons)

4. Get your credentials from **Supabase > Settings > API Keys**:
   - `NEXT_PUBLIC_SUPABASE_URL` - Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Anon key
   - `SUPABASE_SERVICE_ROLE_KEY` - Service role key (for server-side operations)

### 3. Update Environment Variables

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the public website.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin panel.

### 5. Create Admin Account

1. Go to **Supabase > Authentication > Users**
2. Click **Add User** and create an account with:
   - Email: admin@example.com (or your preferred email)
   - Password: (strong password)
3. Use these credentials to login at `/admin/login`

## 📦 Deployment to Vercel

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Production-ready portfolio"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click **Add New > Project**
3. Import the GitHub repository
4. Configure project settings

### Step 3: Add Environment Variables

In Vercel project settings > **Environment Variables**, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

### Step 4: Deploy

Click **Deploy** and wait for the build to complete.

### Step 5: Setup Custom Domain (Optional)

1. In Vercel project settings > **Domains**
2. Add your custom domain (e.g., `kishore.dev`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` in environment variables to your custom domain

## 📝 Project Structure

```
portfolio/
├── app/
│   ├── (public)
│   │   ├── page.tsx                 # Home page
│   │   ├── projects/
│   │   │   └── [slug]/page.tsx      # Project detail page
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── login/page.tsx           # Admin login
│   │   ├── page.tsx                 # Admin dashboard
│   │   ├── profile/page.tsx         # Profile editor
│   │   ├── education/page.tsx       # Education manager
│   │   ├── skills/page.tsx          # Skills manager
│   │   ├── projects/page.tsx        # Projects manager
│   │   ├── experience/page.tsx      # Experience manager
│   │   ├── certifications/page.tsx  # Certifications manager
│   │   ├── achievements/page.tsx    # Achievements manager
│   │   ├── social-links/page.tsx    # Social links manager
│   │   ├── settings/page.tsx        # Settings
│   │   └── layout.tsx
│   ├── layout.tsx                   # Root layout
│   ├── robots.ts                    # SEO: robots.txt
│   ├── sitemap.ts                   # SEO: sitemap.xml
│   └── manifest.ts                  # PWA: manifest.json
├── components/
│   ├── Navbar.tsx                   # Navigation bar
│   ├── Footer.tsx                   # Footer
│   ├── ContactForm.tsx              # Contact form
│   └── index.ts
├── services/
│   ├── profileService.ts            # Profile CRUD
│   ├── educationService.ts          # Education CRUD
│   ├── skillService.ts              # Skills CRUD
│   ├── projectService.ts            # Projects CRUD
│   ├── experienceService.ts         # Experience CRUD
│   ├── certificationService.ts      # Certifications CRUD
│   ├── achievementService.ts        # Achievements CRUD
│   ├── socialLinksService.ts        # Social links CRUD
│   └── storageService.ts            # File uploads
├── lib/
│   ├── database.types.ts            # Generated types
│   └── supabase/
│       ├── client.ts                # Client-side Supabase
│       └── server.ts                # Server-side Supabase
├── hooks/
│   ├── useAuth.ts                   # Authentication hook
│   └── useThemeToggle.ts            # Theme toggle hook
├── styles/
│   └── globals.css                  # Global styles
├── public/                           # Static assets
├── .env.example                     # Environment template
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── README.md
```

## 🔑 Environment Variables

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000 # or your production URL
```

## 🧪 Testing Checklist

### Public Website
- [ ] Homepage loads correctly
- [ ] Dark/light mode toggle works
- [ ] Navbar responsive on mobile
- [ ] Hero section displays properly
- [ ] About section content visible
- [ ] Education timeline renders
- [ ] Skills categorized correctly
- [ ] Projects display (featured and all)
- [ ] Project detail page loads
- [ ] Experience timeline visible
- [ ] Certifications display
- [ ] Achievements visible
- [ ] Contact form validates and sends
- [ ] Social links functional
- [ ] Footer displays correctly
- [ ] SEO meta tags present
- [ ] Open Graph preview works
- [ ] Mobile responsive design
- [ ] Accessibility (keyboard nav, ARIA labels)
- [ ] Lighthouse scores > 90

### Admin Panel
- [ ] Login page loads
- [ ] Invalid credentials rejected
- [ ] Valid login succeeds
- [ ] Dashboard stats display
- [ ] Profile editor loads
- [ ] Image upload works
- [ ] Profile save succeeds
- [ ] Education CRUD operations work
- [ ] Skills CRUD operations work
- [ ] Projects CRUD with image upload
- [ ] Experience CRUD works
- [ ] Certifications CRUD works
- [ ] Achievements CRUD works
- [ ] Social links CRUD works
- [ ] Drag-and-drop ordering works
- [ ] Delete confirmations trigger
- [ ] Unsaved changes warning
- [ ] Loading states display
- [ ] Error messages show
- [ ] Success messages show
- [ ] Logout works
- [ ] Protected routes redirect
- [ ] Admin panel responsive on mobile

### Database & Security
- [ ] RLS policies working
- [ ] Public users see only published content
- [ ] Admins can modify all content
- [ ] File uploads to storage buckets
- [ ] Storage policies restrict access
- [ ] No sensitive data in client bundle
- [ ] Environment variables not exposed

## 📊 Performance Optimization

- **Server Components by Default** - Reduces client-side JavaScript
- **Next.js Image Optimization** - Automatic format selection and sizing
- **Lazy Loading** - Components load on demand
- **Code Splitting** - Per-route code splitting
- **Caching Strategy** - Revalidate on-demand and stale-while-revalidate
- **Minimal Dependencies** - Only essential packages included
- **Tree Shaking** - Unused code removed in production build

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - Use `.env.example` as template
2. **Use Supabase RLS** - All tables have row-level security policies
3. **Service Role Key Server-Only** - Never expose in client code
4. **Input Validation** - All forms validated before submission
5. **HTTPS Only** - Enforced in production
6. **Admin Routes Protected** - Redirect unauthenticated users
7. **File Upload Validation** - Type and size checks
8. **No Hardcoded Secrets** - All sensitive data from environment

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - feel free to use this project as a template for your own portfolio.

## 🤝 Support

For issues or questions:
1. Check existing GitHub issues
2. Review Supabase documentation
3. Check Next.js docs
4. Open a new GitHub issue with details

## 🎯 Future Enhancements

- [ ] Blog/Articles section
- [ ] Comments on projects
- [ ] Analytics integration
- [ ] Email notifications
- [ ] Multi-language support
- [ ] PDF resume generation
- [ ] GitHub integration (auto-fetch repos)
- [ ] CDN image optimization
- [ ] API endpoints for external integrations
- [ ] Automated backups

---

**Built with ❤️ by S. Kishore Kumar**

Last Updated: September 2026
