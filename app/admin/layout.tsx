import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin - Portfolio',
  description: 'Portfolio administration panel',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
