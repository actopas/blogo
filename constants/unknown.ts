import { TagTypeEnum } from '@prisma/client';

/** Placeholder text for empty data */
export const PLACEHODER_TEXT = 'N/A';

export const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',');
export const WALLET_ADDRESS =
  process.env.NEXT_PUBLIC_WALLET_ADDRESS?.split(',');

export const TAG_TYPES = [
  TagTypeEnum.ALL,
  TagTypeEnum.BLOG,
  TagTypeEnum.NOTE,
  TagTypeEnum.PROJECT,
];

export const TAG_TYPE_MAP = {
  [TagTypeEnum.ALL]: 'Common',
  [TagTypeEnum.BLOG]: 'Blog',
  [TagTypeEnum.NOTE]: 'Note',
  [TagTypeEnum.PROJECT]: 'Project',
};

export enum PUBLISHED_ENUM {
  ALL = 'all',
  PUBLISHED = 'published',
  NO_PUBLISHED = 'no_published',
}

export const PUBLISHED_LABEL_MAP = {
  [PUBLISHED_ENUM.ALL]: 'All',
  [PUBLISHED_ENUM.PUBLISHED]: 'Published',
  [PUBLISHED_ENUM.NO_PUBLISHED]: 'Not Published',
};

export const PUBLISHED_MAP = {
  [PUBLISHED_ENUM.ALL]: undefined,
  [PUBLISHED_ENUM.PUBLISHED]: true,
  [PUBLISHED_ENUM.NO_PUBLISHED]: false,
};
// Cuid local storage key, use cuid as the unique user identifier
export const STORAGE_KEY_EVENT_TRACKING_CUID = 'event_tracking_cuid';
