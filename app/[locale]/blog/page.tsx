import { unstable_setRequestLocale } from 'next-intl/server';

import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';
import { BlogListContent, getPublishedBlogs } from '@/features/blog';

export const revalidate = 60;

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { blogs } = await getPublishedBlogs(locale);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center px-6 md:max-w-screen-md  2xl:max-w-6xl  md:mx-auto pb-24 pt-8">
      <PageHeader
        breadcrumbList={[
          { path: PATHS.SITE_HOME, translationKey: 'Navigation.home' },
          { path: PATHS.SITE_BLOG, translationKey: 'Navigation.blog' },
        ]}
        className="mb-9"
      />
      <BlogListContent blogs={blogs} />
    </div>
  );
}
