/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:25
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 23:20:14
 */
import { IllustrationNoContent } from '@/components/illustrations';
import { ViewMoreLink } from '@/components/view-more';

import { PATHS } from '@/constants';

import { BlogListItem } from './blog-list-item';

import { type Blog } from '../types';

type BlogListProps = {
  blogs: Blog[];
  uvMap?: Record<string, number>;
};

export const BlogList = ({ blogs, uvMap }: BlogListProps) => {
  if (!blogs.length) {
    return (
      <div className="h-1/2 grid gap-8 place-content-center ">
        <IllustrationNoContent className="w-[30vh] h-[30vh]" />
        <h3 className="text-2xl font-semibold tracking-tight text-center">
          Empty
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full min-h-3/5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 md:pb-12">
      <div className="w-auto md:w-full leading-48 md:leading-72 text-4xl md:text-6xl font-danfo font-bold transform flex justify-center md:justify-start">
        Articles
      </div>
      <div className="w-full flex flex-col space-y-4">
        {blogs.map((blog, idx) => (
          <div
            key={blog.id}
            className="animate-fade-up animate-ease-in-out w-full pb-4 md:pb-12"
            style={{
              animationDelay: `${(idx + 1) * 200}ms`,
            }}
          >
            <BlogListItem blog={blog} uvMap={uvMap} />
          </div>
        ))}
      </div>
      <ViewMoreLink href={PATHS.SITE_BLOG} />
    </div>
  );
};
