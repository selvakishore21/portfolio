import type { Metadata } from 'next';
import { Navbar } from '@/components';
import Footer from '@/components/Footer';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'S. Kishore Kumar - B.Tech AI & Data Science',
  description: 'Portfolio of S. Kishore Kumar, a B.Tech student specializing in Artificial Intelligence and Data Science.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'S. Kishore Kumar - B.Tech AI & Data Science',
    description: 'Portfolio of S. Kishore Kumar, a B.Tech student specializing in Artificial Intelligence and Data Science.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'S. Kishore Kumar - B.Tech AI & Data Science',
    description: 'Portfolio of S. Kishore Kumar, a B.Tech student specializing in Artificial Intelligence and Data Science.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
