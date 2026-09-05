export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/admin', '/admin/*'],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
  };
}
