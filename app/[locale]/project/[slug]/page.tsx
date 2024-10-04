/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 23:49:29
 */
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isNil } from 'lodash-es';

import { ProjectDetailPage, getProjectBySlug } from '@/features/project';

export const revalidate = 60;

export default async function Page({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  unstable_setRequestLocale(params.locale);

  const { project } = await getProjectBySlug(params.slug);

  if (isNil(project)) {
    return notFound();
  }

  return <ProjectDetailPage project={project} />;
}
