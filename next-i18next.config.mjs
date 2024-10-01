/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 18:42:23
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-13 14:05:52
 */

const i18nConfig = {
  i18n: {
    defaultLocale: 'en', // 默认语言
    locales: ['en', 'zh'], // 支持的语言列表
    localeDetection: false, // 启用语言检测
  },
  localePath: process.env.LOCALE_PATH, // 这是 next-i18next 的配置
};

export default i18nConfig;
