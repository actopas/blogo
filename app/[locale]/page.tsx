/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 22:14:30
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 22:17:49
 */
import { ScrollIndicator } from '@/components/scroll-indicator';

import { BlogList, getPinnedBlogs } from '@/features/blog';
import { HeroSection } from '@/features/home';
import { ProjectTimeline, getPinnedProjects } from '@/features/project';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { projects } = await getPinnedProjects(locale);
  const { blogs, uvMap } = await getPinnedBlogs(locale);
  return (
    <div>
      <div className="h-[calc(100vh-64px)] grid place-content-center relative">
        <HeroSection />
      </div>
      <div className="grid place-content-center absolute bottom-8 md:bottom-12 inset-x-0">
        <ScrollIndicator />
      </div>
      <ProjectTimeline projects={projects} />
      <BlogList blogs={blogs} uvMap={uvMap} />
    </div>
  );
}
