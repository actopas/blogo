/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:25
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 00:51:35
 */
import { z } from 'zod';

import { PUBLISHED_ENUM, REGEX } from '@/constants';

import { type getProjects } from '../actions';

export const createProjectSchema = z.object({
  title: z.string().min(1, { message: '长度不能少于1个字符' }),
  slug: z
    .string()
    .regex(REGEX.SLUG, {
      message: '只允许输入数字、小写字母和中横线',
    })
    .min(1, { message: '长度不能少于1个字符' }),
  description: z.string().min(1, { message: '长度不能少于1个字符' }),
  codeUrl: z.string().url({ message: '无效的地址' }),
  previewUrl: z.string().nullable().optional(),
  cover: z.string().min(1, { message: '长度不能少于1个字符' }),
  author: z.string().nullable().optional(),
  published: z.boolean().optional(),
  tags: z.string().array().optional(),
  body: z.string().min(1, { message: '长度不能少于1个字符' }),
});

export const updateProjectSchema = createProjectSchema.partial().extend({
  id: z.string().min(1),
});

export const getProjectsSchema = z.object({
  title: z.string().optional(),
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
