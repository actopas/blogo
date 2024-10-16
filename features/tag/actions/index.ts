'use server';

import { type Prisma, TagTypeEnum } from '@prisma/client';

import { ERROR_NO_PERMISSION } from '@/constants';
import { noPermission } from '@/features/user';
import { prisma } from '@/lib/prisma';
import { getSkip } from '@/utils';

import {
  type CreateTagDTO,
  type GetTagsDTO,
  type UpdateTagDTO,
  createTagSchema,
  getTagsSchema,
  updateTagSchema,
} from '../types';

export const isTagExistByID = async (id: string): Promise<boolean> => {
  const isExist = await prisma.tag.findUnique({ where: { id } });

  return Boolean(isExist);
};

export const getTags = async (params: GetTagsDTO) => {
  const result = await getTagsSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const cond: Prisma.TagWhereInput = {};
  // TODO: Think of a way to optimize this, this approach is too verbose, too many ifs
  if (result.data.type) {
    cond.type = result.data.type;
  }
  if (result.data.name?.trim()) {
    cond.OR = [
      ...(cond.OR ?? []),
      ...[
        {
          name: {
            contains: result.data.name?.trim(),
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

  const sort: Prisma.TagOrderByWithRelationInput = {};
  if (result.data.orderBy && result.data.order) {
    sort[result.data.orderBy] = result.data.order;
  }

  const total = await prisma.tag.count({ where: cond });
  const tags = await prisma.tag.findMany({
    orderBy: sort,
    where: cond,
    include: {
      blogs: true,
      notes: true,
      projects: true,
      _count: true,
    },
    take: result.data.pageSize,
    skip: getSkip(result.data.pageIndex, result.data.pageSize),
  });

  return { tags, total };
};

export const getAllTags = async (type?: TagTypeEnum) => {
  const cond: Prisma.TagWhereInput = {
    type: {
      in: type ? [TagTypeEnum.ALL, type] : [TagTypeEnum.ALL],
    },
  };

  const total = await prisma.tag.count({ where: cond });
  const tags = await prisma.tag.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: cond,
  });

  return { tags, total };
};

export const createTag = async (params: CreateTagDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await createTagSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const tags = await prisma.tag.findMany({
    where: {
      OR: [{ name: result.data.name }, { slug: result.data.slug }],
    },
  });

  if (tags.length) {
    // TODO: Record logs
    throw new Error('Tag or slug exist');
  }

  await prisma.tag.create({
    data: {
      name: result.data.name,
      slug: result.data.slug,
      type: result.data.type,
    },
  });
};

export const deleteTagByID = async (id: string) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const isExist = await isTagExistByID(id);

  if (!isExist) {
    throw new Error('Tag not exist');
  }

  await prisma.tag.delete({
    where: {
      id,
    },
  });
};

export const updateTag = async (params: UpdateTagDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await updateTagSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const isExist = await isTagExistByID(result.data.id);
  if (!isExist) {
    throw new Error('Tag not exist');
  }

  await prisma.tag.update({
    data: {
      name: result.data.name,
      slug: result.data.slug,
      type: result.data.type,
    },
    where: {
      id: result.data.id,
    },
  });
};

export const getTagByID = async (id: string) => {
  const tag = await prisma.tag.findUnique({ where: { id } });
  return { tag };
};
