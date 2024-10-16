'use server';

import { type Prisma } from '@prisma/client';
import { isUndefined } from 'lodash-es';

import { ERROR_NO_PERMISSION, PUBLISHED_MAP } from '@/constants';
import { batchGetBlogUV } from '@/features/statistics';
import { noPermission } from '@/features/user';
import { prisma } from '@/lib/prisma';
import { getSkip } from '@/utils';

import {
  type CreateBlogDTO,
  type GetBlogsDTO,
  type UpdateBlogDTO,
  createBlogSchema,
  getBlogsSchema,
  updateBlogSchema,
} from '../types';

export const isBlogExistByID = async (id: string): Promise<boolean> => {
  const isExist = await prisma.blog.findUnique({ where: { id } });

  return Boolean(isExist);
};

export const getBlogs = async (params: GetBlogsDTO) => {
  const result = await getBlogsSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  // No permission, only view published blogs
  const published = await noPermission();
  const cond: Prisma.BlogWhereInput = {};
  // TODO: Think of a way to optimize this, this approach is too verbose, too many ifs
  if (published || !isUndefined(result.data.published)) {
    const searchPublished: boolean | undefined =
      PUBLISHED_MAP[result.data.published!];

    if (!isUndefined(searchPublished)) {
      cond.published = searchPublished;
    }

    if (published) {
      cond.published = published;
    }
  }
  if (result.data.title?.trim()) {
    cond.OR = [
      ...(cond.OR ?? []),
      ...[
        {
          titleEN: {
            contains: result.data.title?.trim(),
          },
        },
        {
          titleZH: {
            contains: result.data.title?.trim(),
          },
        },
      ],
    ];
  }
  if (result.data.slug?.trim()) {
    cond.OR = [
      ...(cond.OR ?? []),
      ...[
        {
          slug: {
            contains: result.data.slug?.trim(),
          },
        },
      ],
    ];
  }
  if (result.data.tags?.length) {
    cond.OR = [
      ...(cond.OR ?? []),
      ...[
        {
          tags: {
            some: {
              id: {
                in: result.data.tags,
              },
            },
          },
        },
      ],
    ];
  }

  const sort: Prisma.BlogOrderByWithRelationInput = {};
  if (result.data.orderBy && result.data.order) {
    sort[result.data.orderBy] = result.data.order;
  }

  const total = await prisma.blog.count({ where: cond });
  const blogs = await prisma.blog.findMany({
    include: {
      tags: true,
    },
    orderBy: sort,
    where: cond,
    take: result.data.pageSize,
    skip: getSkip(result.data.pageIndex, result.data.pageSize),
  });

  return { blogs, total };
};

export const getPublishedBlogs = async (locale: string) => {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const localizedBlogs = blogs.map((blog) => ({
    ...blog,
    title: locale === 'zh' ? blog.titleZH : blog.titleEN,
    description: locale === 'zh' ? blog.descriptionZH : blog.descriptionEN,
    body: locale === 'zh' ? blog.bodyZH : blog.bodyEN,
  }));

  const count = await prisma.blog.count({
    where: {
      published: true,
    },
  });

  const total = count ?? 0;

  const m = await batchGetBlogUV(blogs.map((el) => el.id));

  return {
    blogs: localizedBlogs,
    total,
    uvMap: m ? Object.fromEntries(m) : undefined,
  };
};

export const getBlogByID = async (id: string) => {
  const blog = await prisma.blog.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });

  return { blog };
};

export const getPublishedBlogBySlug = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: { slug, published: true },
    include: {
      tags: true,
    },
  });
  return { blog };
};

export const deleteBlogByID = async (id: string) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }

  const isExist = await isBlogExistByID(id);

  if (!isExist) {
    throw new Error('Blog not found');
  }

  await prisma.blog.delete({
    where: {
      id,
    },
  });
};

export const createBlog = async (params: CreateBlogDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await createBlogSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const blogs = await prisma.blog.findMany({
    where: {
      OR: [
        { titleEN: result.data.titleEN },
        { titleZH: result.data.titleZH },
        { slug: result.data.slug },
      ],
    },
  });

  if (blogs.length) {
    // TODO: Record logs
    throw new Error('Title or slug duplicated');
  }

  await prisma.blog.create({
    data: {
      titleEN: result.data.titleEN,
      titleZH: result.data.titleZH,
      slug: result.data.slug,
      descriptionEN: result.data.descriptionEN,
      descriptionZH: result.data.descriptionZH,
      bodyEN: result.data.bodyEN,
      bodyZH: result.data.bodyZH,
      published: result.data.published,
      cover: result.data.cover,
      author: result.data.author,
      pin: result.data.pin,
      tags: {
        connect: result.data.tags
          ? result.data.tags.map((tagID) => ({ id: tagID }))
          : undefined,
      },
    },
  });
};

export const toggleBlogPublished = async (id: string) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const blog = await prisma.blog.findUnique({
    where: {
      id,
    },
  });

  if (!blog) {
    throw new Error('Blog not found');
  }

  await prisma.blog.update({
    data: {
      published: !blog.published,
    },
    where: {
      id,
    },
  });
};

export const updateBlog = async (params: UpdateBlogDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await updateBlogSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const blog = await prisma.blog.findUnique({
    where: {
      id: result.data.id,
    },
    include: { tags: true },
  });

  if (!blog) {
    throw new Error('Blog not found');
  }

  const blogTagIDs = blog?.tags.map((el) => el.id);
  // New tags
  const needConnect = result.data.tags?.filter(
    (el) => !blogTagIDs?.includes(el),
  );
  // Tags to be removed
  const needDisconnect = blog?.tags
    .filter((el) => !result.data.tags?.includes(el.id))
    ?.map((el) => el.id);

  await prisma.blog.update({
    data: {
      titleEN: result.data.titleEN,
      titleZH: result.data.titleZH,
      descriptionEN: result.data.descriptionEN,
      descriptionZH: result.data.descriptionZH,
      slug: result.data.slug,
      cover: result.data.cover,
      author: result.data.author,
      bodyEN: result.data.bodyEN,
      bodyZH: result.data.bodyZH,
      published: result.data.published,
      pin: result.data.pin,
      tags: {
        connect: needConnect?.length
          ? needConnect.map((tagID) => ({ id: tagID }))
          : undefined,
        disconnect: needDisconnect?.length
          ? needDisconnect.map((tagID) => ({ id: tagID }))
          : undefined,
      },
    },
    where: {
      id: result.data.id,
    },
  });
};

export const getPinnedBlogs = async (locale: string) => {
  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
      pin: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      titleEN: true,
      titleZH: true,
      descriptionEN: true,
      descriptionZH: true,
      slug: true,
      cover: true,
      createdAt: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    take: 5,
  });

  const localizedBlogs = blogs.map((blog) => ({
    ...blog,
    title: locale === 'zh' ? blog.titleZH : blog.titleEN,
    description: locale === 'zh' ? blog.descriptionZH : blog.descriptionEN,
  }));

  const blogIds = blogs.map((el) => el.id);
  const m = await batchGetBlogUV(blogIds);

  return {
    blogs: localizedBlogs,
    uvMap: m ? Object.fromEntries(m) : undefined,
  };
};
