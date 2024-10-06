'use client';

/* eslint-disable no-console */
import { ASCII_ART_FONT } from '@/constants';
import { isBrowser } from '@/lib/utils';

(() => {
  if (isBrowser()) {
    // 放到这里执行，保证只输出一次
    console.log(ASCII_ART_FONT);
  }
})();

/**
 * 在浏览器控制台输出一些自定义信息，注意必须使用 client 组件，因为是要运行在浏览器上的
 * 如果是 rsc 组件，则会输出在命令行里面
 * @returns
 */
export const Console = () => {
  return null;
};
