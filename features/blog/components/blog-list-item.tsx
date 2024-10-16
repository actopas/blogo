import React from 'react';

import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { IconSolarEyeBold } from '@/components/icons';

import { NICKNAME, PATHS } from '@/constants';
import { toFromNow } from '@/lib/utils';
import { formatNum } from '@/utils';

import { type Blog } from '../types';

type BlogListItemProps = {
  blog: Blog;
  uvMap?: Record<string, number>;
};

export const BlogListItem = ({ blog, uvMap }: BlogListItemProps) => {
  const locale = useLocale();

  return (
    <Link
      href={`${PATHS.SITE_BLOG}/${blog.slug}`}
      className="rounded-2xl border overflow-hidden flex flex-col transition-[border] hover:border-primary h-full"
    >
      <div className="w-full h-48 relative">
        <Image
          src={blog.cover || ''}
          alt={locale === 'en' ? blog.titleEN : blog.titleZH}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="p-6 flex flex-col gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <h3 className="text-lg md:text-2xl font-semibold line-clamp-1">
              {locale === 'en' ? blog.titleEN : blog.titleZH}
            </h3>
          </TooltipTrigger>
          <TooltipContent>
            {locale === 'en' ? blog.titleEN : blog.titleZH}
          </TooltipContent>
        </Tooltip>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {locale === 'en' ? blog.descriptionEN : blog.descriptionZH}
        </p>

        <div className="text-sm text-muted-foreground flex items-center space-x-2">
          <span>{blog.author ? blog.author : NICKNAME}</span>
          <span>·</span>
          <span>{toFromNow(blog.createdAt, locale)}</span>
          <span>·</span>
          <div className="flex items-center space-x-1">
            <IconSolarEyeBold />
            <span>{formatNum(uvMap?.[blog.id])}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((tag) => <Badge key={tag.id}>{tag.name}</Badge>)}
        </div>
      </div>
    </Link>
  );
};

export default BlogListItem;
