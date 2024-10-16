'use server';

import { type Prisma } from '@prisma/client';
import { isUndefined } from 'lodash-es';

import { ERROR_NO_PERMISSION, PUBLISHED_MAP } from '@/constants';
import { noPermission } from '@/features/user';
import { prisma } from '@/lib/prisma';
import { getSkip } from '@/utils';

import {
  type CreateProjectDTO,
  type GetProjectsDTO,
  type UpdateProjectDTO,
  createProjectSchema,
  getProjectsSchema,
  updateProjectSchema,
} from '../types';

export const isProjectExistByID = async (id: string): Promise<boolean> => {
  const isExist = await prisma.project.findUnique({ where: { id } });

  return Boolean(isExist);
};

export const getProjects = async (params: GetProjectsDTO) => {
  const result = await getProjectsSchema.safeParseAsync(params);
  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  // No permission, only view published
  const published = await noPermission();
  const cond: Prisma.ProjectWhereInput = {};
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
  if (result.data.titleEN?.trim() || result.data.titleZH?.trim()) {
    cond.OR = [
      ...(cond.OR ?? []),
      {
        titleEN: {
          contains: result.data.titleEN?.trim(),
        },
      },
      {
        titleZH: {
          contains: result.data.titleZH?.trim(),
        },
      },
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

  const sort: Prisma.ProjectOrderByWithRelationInput = {};
  if (result.data.orderBy && result.data.order) {
    sort[result.data.orderBy] = result.data.order;
  }

  const total = await prisma.project.count({ where: cond });
  const projects = await prisma.project.findMany({
    where: cond,
    orderBy: sort,
    take: result.data.pageSize,
    skip: getSkip(result.data.pageIndex, result.data.pageSize),
    include: {
      tags: true,
    },
  });

  return {
    projects: projects.map((project) => ({
      ...project,
      tags: project.tags.map((tag) => ({ id: tag.id, name: tag.name })),
    })),
    total: total,
  };
};

export const getPublishedProjects = async (locale: string) => {
  const total = await prisma.project.count({
    where: {
      published: true,
    },
  });
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      published: true,
    },
    include: {
      tags: true,
    },
  });

  return {
    projects: projects.map((project) => ({
      ...project,
      title: locale === 'zh' ? project.titleZH : project.titleEN,
      description:
        locale === 'zh' ? project.descriptionZH : project.descriptionEN,
    })),
    total,
  };
};

export const getProjectByID = async (id: string) => {
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });

  return { project };
};

export const getProjectBySlug = async (slug: string) => {
  const project = await prisma.project.findUnique({
    where: { slug, published: true },
    include: {
      tags: true,
    },
  });

  return { project };
};

export const deleteProjectByID = async (id: string) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }

  const isExist = await isProjectExistByID(id);

  if (!isExist) {
    throw new Error('Project not found');
  }

  await prisma.project.delete({
    where: {
      id,
    },
  });
};

export const createProject = async (params: CreateProjectDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await createProjectSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const projects = await prisma.project.findMany({
    where: {
      OR: [
        { titleEN: result.data.titleEN },
        { titleZH: result.data.titleZH },
        { slug: result.data.slug },
      ],
    },
  });

  if (projects.length) {
    // TODO: Record logs
    throw new Error('Title or slug duplicated');
  }

  await prisma.project.create({
    data: {
      titleEN: result.data.titleEN,
      titleZH: result.data.titleZH,
      slug: result.data.slug,
      descriptionEN: result.data.descriptionEN,
      descriptionZH: result.data.descriptionZH,
      bodyEN: result.data.bodyEN,
      bodyZH: result.data.bodyZH,
      published: result.data.published,
      cover: result.data.cover ?? '',
      codeUrl: result.data.codeUrl ?? '',
      previewUrl: result.data.previewUrl ?? '',
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

export const toggleProjectPublished = async (id: string) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const project = await prisma.project.findUnique({
    where: {
      id,
    },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  await prisma.project.update({
    data: {
      published: !project.published,
    },
    where: {
      id,
    },
  });
};

export const updateProject = async (params: UpdateProjectDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await updateProjectSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const project = await prisma.project.findUnique({
    where: {
      id: result.data.id,
    },
    include: { tags: true },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  const projectTagIDs = project?.tags.map((el) => el.id);
  // New tags
  const needConnect = result.data.tags?.filter(
    (el) => !projectTagIDs?.includes(el),
  );
  // Tags to be removed
  const needDisconnect = project?.tags
    .filter((el) => !result.data.tags?.includes(el.id))
    ?.map((el) => el.id);

  await prisma.project.update({
    data: {
      titleEN: result.data.titleEN,
      titleZH: result.data.titleZH,
      descriptionEN: result.data.descriptionEN,
      descriptionZH: result.data.descriptionZH,
      bodyEN: result.data.bodyEN,
      bodyZH: result.data.bodyZH,
      slug: result.data.slug,
      published: result.data.published,
      cover: result.data.cover ?? '',
      codeUrl: result.data.codeUrl ?? '',
      previewUrl: result.data.previewUrl ?? '',
      author: result.data.author,
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

export const getPinnedProjects = async (locale: string) => {
  const projects = await prisma.project.findMany({
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
      previewUrl: true,
      createdAt: true,
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return {
    projects: projects.map((project) => ({
      ...project,
      title: locale === 'zh' ? project.titleZH : project.titleEN,
      description:
        locale === 'zh' ? project.descriptionZH : project.descriptionEN,
    })),
  };
};
