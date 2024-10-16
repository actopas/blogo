import { unstable_setRequestLocale } from 'next-intl/server';

import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';
import { ProjectList, getPublishedProjects } from '@/features/project';

export const revalidate = 60;

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const { projects } = await getPublishedProjects(locale);

  return (
    <div className="min-h-screen w-full flex flex-col justify-center px-6 md:max-w-screen-md  2xl:max-w-6xl  md:mx-auto pb-24 pt-8">
      <PageHeader
        breadcrumbList={[
          { path: PATHS.SITE_HOME, translationKey: 'Navigation.home' },
          { path: PATHS.SITE_PROJECT, translationKey: 'Navigation.project' },
        ]}
        className="mb-9"
      />

      <ProjectList projects={projects} />
    </div>
  );
}
