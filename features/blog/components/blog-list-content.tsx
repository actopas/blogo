import { BlogListItem } from './blog-list-item';

import { type Blog } from '../types';

type BlogListContentProps = {
  blogs: Blog[];
  uvMap?: Record<string, number>;
};

export const BlogListContent = ({ blogs, uvMap }: BlogListContentProps) => {
  return (
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
  );
};
