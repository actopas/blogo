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
        allow: '/', // 允许爬取网站的所有页面
      },
      {
        userAgent: '*',
        disallow: ['/admin/', '/auth/', '/admin/*', '/auth/*'], // 禁止爬取/admin和/auth相关页面
      },
    ],
  },
};
