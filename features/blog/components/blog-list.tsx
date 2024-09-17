/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:25
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 23:20:14
 */
import { IllustrationNoContent } from '@/components/illustrations';

import { BlogListItem } from './blog-list-item';

import { type Blog } from '../types';

type BlogListProps = {
  blogs: Blog[];
  uvMap?: Record<string, number>;
};

export const BlogList = ({ blogs, uvMap }: BlogListProps) => {
  if (!blogs.length) {
    return (
      <div className="grid gap-8 place-content-center ">
        <IllustrationNoContent className="w-[30vh] h-[30vh]" />
        <h3 className="text-2xl font-semibold tracking-tight text-center">
          NO DATA
        </h3>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 ">
      <ul className="flex flex-col space-y-4">
        {blogs.map((blog, idx) => (
          <li
            key={blog.id}
            className="animate-fade-up animate-ease-in-out w-full"
            style={{
              animationDelay: `${(idx + 1) * 200}ms`,
            }}
          >
            <BlogListItem blog={blog} uvMap={uvMap} />
          </li>
        ))}
      </ul>
    </div>
  );
};
