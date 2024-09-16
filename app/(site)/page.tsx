/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-16 22:14:30
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 22:17:49
 */
import { BlogList, getPublishedBlogs } from '@/features/blog';
import { HeroSection } from '@/features/home';
import { ProjectTimeline, getAllProjects } from '@/features/project';

export default async function Page() {
  const { projects } = await getAllProjects();
  const { blogs, uvMap } = await getPublishedBlogs();
  return (
    <div>
      <div className="h-[calc(100vh-64px)] grid place-content-center relative">
        <HeroSection />
      </div>
      <ProjectTimeline projects={projects} />
      <BlogList blogs={blogs} uvMap={uvMap} />
    </div>
  );
}
