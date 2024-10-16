import { TagTypeEnum } from '@prisma/client';
import { z } from 'zod';

import { REGEX } from '@/constants';

import { type getTags } from '../actions';

export const createTagSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  slug: z
    .string()
    .regex(REGEX.SLUG, {
      message: 'Only numbers, lowercase letters, and hyphens are allowed',
    })
    .min(1, { message: 'Slug is required' }),
  type: z.enum([
    TagTypeEnum.ALL,
    TagTypeEnum.BLOG,
    TagTypeEnum.NOTE,
    TagTypeEnum.PROJECT,
  ]),
});

export const updateTagSchema = createTagSchema.partial().extend({
  id: z.string().min(1),
});

export const getTagsSchema = z.object({
  name: z.string().optional(),
  slug: z.string().optional(),
  type: z
    .enum([
      TagTypeEnum.ALL,
      TagTypeEnum.BLOG,
      TagTypeEnum.NOTE,
      TagTypeEnum.PROJECT,
    ])
    .optional(),
  pageIndex: z.number(),
  pageSize: z.number(),
  orderBy: z.enum(['createdAt', 'updatedAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type CreateTagDTO = z.infer<typeof createTagSchema>;
export type UpdateTagDTO = z.infer<typeof updateTagSchema>;
export type GetTagsDTO = z.infer<typeof getTagsSchema>;

export type Tag = Awaited<ReturnType<typeof getTags>>['tags'][number];
