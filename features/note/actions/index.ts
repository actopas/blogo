'use server';

import { type Prisma } from '@prisma/client';
import { isUndefined } from 'lodash-es';

import { ERROR_NO_PERMISSION, PUBLISHED_MAP } from '@/constants';
import { noPermission } from '@/features/user';
import { prisma } from '@/lib/prisma';
import { getSkip } from '@/utils';

import {
  type CreateNoteDTO,
  type GetNotesDTO,
  type UpdateNoteDTO,
  createNoteSchema,
  getNotesSchema,
  updateNoteSchema,
} from '../types';

export const isNoteExistByID = async (id: string): Promise<boolean> => {
  const isExist = await prisma.note.findUnique({ where: { id } });

  return Boolean(isExist);
};

export const getNotes = async (params: GetNotesDTO) => {
  const result = await getNotesSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  // No permission, only view published
  const published = await noPermission();
  const cond: Prisma.NoteWhereInput = {};
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
  if (result.data.body?.trim()) {
    cond.OR = [
      ...(cond.OR ?? []),
      ...[
        {
          body: {
            contains: result.data.body?.trim(),
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

  const sort: Prisma.NoteOrderByWithRelationInput = {};
  if (result.data.orderBy && result.data.order) {
    sort[result.data.orderBy] = result.data.order;
  }

  const total = await prisma.note.count({ where: cond });
  const notes = await prisma.note.findMany({
    include: {
      tags: true,
    },
    orderBy: sort,
    where: cond,
    take: result.data.pageSize,
    skip: getSkip(result.data.pageIndex, result.data.pageSize),
  });

  return { notes, total };
};

export const getAllNotes = async () => {
  const total = await prisma.note.count({});
  const notes = await prisma.note.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      tags: true,
    },
  });

  return { notes, total };
};

export const getNoteByID = async (id: string) => {
  const note = await prisma.note.findUnique({
    where: { id },
    include: {
      tags: true,
    },
  });

  return { note };
};

export const deleteNoteByID = async (id: string) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const isExist = await isNoteExistByID(id);

  if (!isExist) {
    throw new Error('Note not found');
  }

  await prisma.note.delete({
    where: {
      id,
    },
  });
};

export const createNote = async (params: CreateNoteDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await createNoteSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  await prisma.note.create({
    data: {
      body: result.data.body,
      published: result.data.published,
      tags: {
        connect: result.data.tags
          ? result.data.tags.map((tagID) => ({ id: tagID }))
          : undefined,
      },
    },
  });
};

export const toggleNotePublished = async (id: string) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const note = await prisma.note.findUnique({
    where: {
      id,
    },
  });

  if (!note) {
    throw new Error('Note not found');
  }

  await prisma.note.update({
    data: {
      published: !note.published,
    },
    where: {
      id,
    },
  });
};

export const updateNote = async (params: UpdateNoteDTO) => {
  if (await noPermission()) {
    throw ERROR_NO_PERMISSION;
  }
  const result = await updateNoteSchema.safeParseAsync(params);

  if (!result.success) {
    const error = result.error.format()._errors?.join(';');
    // TODO: Record logs
    throw new Error(error);
  }

  const note = await prisma.note.findUnique({
    where: {
      id: result.data.id,
    },
    include: { tags: true },
  });

  if (!note) {
    throw new Error('Note not found');
  }

  const noteTagIDs = note?.tags.map((el) => el.id);
  // New tags
  const needConnect = result.data.tags?.filter(
    (el) => !noteTagIDs?.includes(el),
  );
  // Tags to be removed
  const needDisconnect = note?.tags
    .filter((el) => !result.data.tags?.includes(el.id))
    ?.map((el) => el.id);

  await prisma.note.update({
    data: {
      body: result.data.body,
      published: result.data.published,
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
