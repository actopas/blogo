import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import relativeTime from 'dayjs/plugin/relativeTime';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { ADMIN_EMAILS, WALLET_ADDRESS } from '@/constants';

dayjs.extend(relativeTime);

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const toSlug = (s: string) => {
  if (!s) {
    return '';
  }

  return slugify(s, {
    lower: true,
  });
};

export const copyToClipboard = (text: string) => {
  // Clipboard API is not supported on iPhone, damn it!
  if (navigator.clipboard) {
    navigator.clipboard
      // Remove leading and trailing whitespace
      .writeText(text?.trim())
      .then(() => {
        showSuccessToast('Copied');
      })
      .catch((error) => {
        showErrorToast(error as string);
      });
  } else {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // Hide this input box
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // Assign value, manually remove leading and trailing whitespace
    textarea.value = text?.trim();
    // Select
    textarea.select();
    // Copy
    document.execCommand('copy', true);
    showSuccessToast('Copy Success');
    // Remove the input box
    document.body.removeChild(textarea);
  }
};

export const toFromNow = (date: number | Date, locale = 'en') => {
  return dayjs(date)
    .locale(locale === 'zh' ? 'zh-cn' : locale)
    .fromNow();
};

export const toSlashDateString = (date: number | Date, locale = 'en') => {
  const format =
    locale === 'zh' ? 'YYYY年M月D日 dddd HH:mm:ss' : 'M/D/YYYY dddd HH:mm:ss';
  return dayjs(date)
    .locale(locale === 'zh' ? 'zh-cn' : locale)
    .format(format);
};

export const isAdmin = (email: string, id: string) => {
  if ((!email || !ADMIN_EMAILS?.length) && (!id || !WALLET_ADDRESS?.length)) {
    return false;
  }
  return ADMIN_EMAILS?.includes(email) || WALLET_ADDRESS?.includes(id);
};

export const isBrowser = () => {
  // Code from: https://ahooks.js.org/en-US/guide/blog/ssr
  /* eslint-disable @typescript-eslint/prefer-optional-chain */
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
};
