/** @type {import('prettier').Config & import('@trivago/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  plugins: [
    'prettier-plugin-tailwindcss',
    '@trivago/prettier-plugin-sort-imports',
  ],
  tabWidth: 2,
  trailingComma: 'all',
  singleQuote: true,
  semi: true,
  endOfLine: 'lf',
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^react',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '@/app/(.*)',
    '@/config',
    '@/types',
    '@/providers',
    '@/components/ui/(.*)',
    '@/components/(.*)',
    '@/libs/(.*)',
    '@/utils/(.*)',
    '@/.*',
    '^./(.*)',
    '^../(.*)',
    /** Group style files separately and place them at the bottom */
    '.(css|less|scss|sass|stylus)$',
  ],
};

module.exports = config;
