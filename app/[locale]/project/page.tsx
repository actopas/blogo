/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-14 00:07:26
 */
import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';
import { ProjectList, getAllProjects } from '@/features/project';

export const revalidate = 60;

export default async function Page() {
  const { projects } = await getAllProjects();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center px-6 md:max-w-screen-md  2xl:max-w-6xl  md:mx-auto pb-24 pt-8">
      <PageHeader
        breadcrumbList={[PATHS.SITE_HOME, PATHS.SITE_PROJECT]}
        className="mb-9"
      />

      <ProjectList projects={projects} />
    </div>
  );
}
