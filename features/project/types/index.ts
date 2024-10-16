import { z } from 'zod';

import { PUBLISHED_ENUM, REGEX } from '@/constants';

import { type getProjects } from '../actions';

export const createProjectSchema = z.object({
  titleEN: z.string().min(1, { message: 'English title is required' }),
  titleZH: z.string().min(1, { message: 'Chinese title is required' }),
  slug: z
    .string()
    .regex(REGEX.SLUG, {
      message: 'Only numbers, lowercase letters, and hyphens are allowed',
    })
    .min(1, { message: 'Slug is required' }),
  descriptionEN: z
    .string()
    .min(1, { message: 'English description is required' }),
  descriptionZH: z
    .string()
    .min(1, { message: 'Chinese description is required' }),
  bodyEN: z.string().min(1, { message: 'English content is required' }),
  bodyZH: z.string().min(1, { message: 'Chinese content is required' }),
  previewUrl: z.string().optional(),
  codeUrl: z.string().optional(),
  published: z.boolean().optional(),
  cover: z.string().nullable().optional(),
  author: z.string().nullable().optional(),
  tags: z.string().array().optional(),
  pin: z.boolean().optional(),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().min(1),
});

export const getProjectsSchema = z.object({
  titleEN: z.string().optional(),
  titleZH: z.string().optional(),
  slug: z.string().optional(),
  published: z
    .enum([
      PUBLISHED_ENUM.ALL,
      PUBLISHED_ENUM.PUBLISHED,
      PUBLISHED_ENUM.NO_PUBLISHED,
    ])
    .optional(),
  tags: z.string().array().optional(),
  pageIndex: z.number(),
  pageSize: z.number(),
  orderBy: z.enum(['createdAt', 'updatedAt']).optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

export type CreateProjectDTO = z.infer<typeof createProjectSchema>;
export type UpdateProjectDTO = z.infer<typeof updateProjectSchema>;
export type GetProjectsDTO = z.infer<typeof getProjectsSchema>;

export type Project = Awaited<
  ReturnType<typeof getProjects>
>['projects'][number];
