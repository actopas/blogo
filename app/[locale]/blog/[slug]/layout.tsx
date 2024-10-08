import React from 'react';

import { type Metadata } from 'next';

import { isNil } from 'lodash-es';

import { WEBSITE } from '@/constants';
import { getPublishedBlogBySlug } from '@/features/blog';

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}): Promise<Metadata> {
  const { blog } = await getPublishedBlogBySlug(params.slug);

  if (isNil(blog)) {
    return {};
  }

  const title = params.locale === 'zh' ? blog.titleZH : blog.titleEN;
  const description =
    params.locale === 'zh' ? blog.descriptionZH : blog.descriptionEN;

  return {
    title: `${title} - ${WEBSITE}`,
    description: description,
    keywords: blog.tags.map((el) => el.name).join(','),
  };
}

export default function Layout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}
