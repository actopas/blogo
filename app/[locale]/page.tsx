import { unstable_setRequestLocale } from 'next-intl/server';

import { LoadingAnimation } from '@/components/loading-animation';
import { LoadingProvider } from '@/components/loading-context';
import { ScrollIndicator } from '@/components/scroll-indicator';

import { BlogList, getPinnedBlogs } from '@/features/blog';
import { HeroSection } from '@/features/home';
import { ProjectTimeline, getPinnedProjects } from '@/features/project';

export default async function Page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const [projectsData, blogsData] = await Promise.all([
    getPinnedProjects(locale),
    getPinnedBlogs(locale),
  ]);
  const { projects } = projectsData;
  const { blogs, uvMap } = blogsData;

  return (
    <LoadingProvider>
      <LoadingAnimation />
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
    </LoadingProvider>
  );
}
