const siteUrl = process.env.SITE_URL;
console.log('Site URL:', siteUrl);
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  exclude: ['/admin/*', '/auth/*', '/server-sitemap.xml'],
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/', // Allow crawling all pages on the website
      },
      {
        userAgent: '*',
        disallow: ['/admin/', '/auth/', '/admin/*', '/auth/*'], // Disallow crawling pages related to /admin and /auth
      },
    ],
  },
};
