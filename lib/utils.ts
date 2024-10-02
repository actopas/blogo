import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
// 导入中文语言包
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
  // 实测 Clipboard API 在 iPhone 上不支持，可恶！
  if (navigator.clipboard) {
    navigator.clipboard
      // 去除首尾空白字符
      .writeText(text?.trim())
      .then(() => {
        showSuccessToast('Copied');
      })
      .catch((error) => {
        showErrorToast(error as string);
      });
  } else {
    // 以下代码来自：https://www.zhangxinxu.com/wordpress/2021/10/js-copy-paste-clipboard/
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    // 隐藏此输入框
    textarea.style.position = 'fixed';
    textarea.style.clip = 'rect(0 0 0 0)';
    textarea.style.top = '10px';
    // 赋值，手动去除首尾空白字符
    textarea.value = text?.trim();
    // 选中
    textarea.select();
    // 复制
    document.execCommand('copy', true);
    showSuccessToast('Copy Success');
    // 移除输入框
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
  // 代码来自：https://ahooks.js.org/zh-CN/guide/blog/ssr
  /* eslint-disable @typescript-eslint/prefer-optional-chain */
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
};
