import { useLocale, useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';

import { BytemdViewer } from '@/components/bytemd';
import { GoBack } from '@/components/go-back';
import { IconSolarEyeBold } from '@/components/icons';

import { NICKNAME } from '@/constants';
import { toFromNow } from '@/lib/utils';
import { formatNum } from '@/utils';

import { BlogEventTracking } from '../components/blog-event-tracking';
import { type Blog } from '../types';

type BlogDetailProps = {
  blog: Blog;
  uv?: number;
};

export const BlogDetailPage = ({ blog, uv = 0 }: BlogDetailProps) => {
  const locale = useLocale();
  const t = useTranslations('BlogDetail');

  const title = locale === 'zh' ? blog.titleZH : blog.titleEN;
  const body = locale === 'zh' ? blog.bodyZH : blog.bodyEN;

  return (
    <div className="md:max-w-screen-md 2xl:max-w-6xl md:px-0 md:mx-auto pt-12 md:pt-24 grid gap-9 px-6">
      <article className="max-w-[678px] mx-auto overflow-hidden w-full break-all">
        {blog.cover && (
          <img
            src={blog.cover}
            alt={title}
            className="max-w-screen-md 2xl:max-w-6xl h-auto mb-16 w-full"
          />
        )}
        <h1 className="mb-4 text-2xl md:text-4xl font-extrabold ">{title}</h1>
        <div className="text-sm flex flex-row items-center text-muted-foreground">
          <div>{blog.author ? blog.author : NICKNAME}</div>
          <span className="mx-2">·</span>
          <span>
            {t('posted', { time: toFromNow(blog.createdAt, locale) })}
          </span>
          <span className="mx-2">·</span>
          <div className="flex items-center space-x-1">
            <IconSolarEyeBold />
            <span>{t('viewed', { count: formatNum(uv) })}</span>
          </div>
        </div>
        <BytemdViewer body={body || ''} />
      </article>
      <div className="max-w-[678px] mx-auto w-full pl-6">
        <div className="flex flex-wrap gap-2">
          {blog.tags?.map((el) => (
            <Badge key={el.id} className="md:px-5 md:py-2 md:text-base">
              {el.name}
            </Badge>
          ))}
        </div>
        <GoBack />
      </div>
      <BlogEventTracking blogID={blog.id} />
    </div>
  );
};
