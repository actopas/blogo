'use client';

/* eslint-disable no-console */
import { ASCII_ART_FONT } from '@/constants';
import { isBrowser } from '@/lib/utils';

// const fontFamily =
//   'font-family: Poppins, PingFang SC, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";';

(() => {
  if (isBrowser()) {
    // Execute here to ensure it's only output once
    console.log(ASCII_ART_FONT);
  }
})();

/**
 * Output some custom information in the browser console.
 * Note: Must use client component as it needs to run in the browser.
 * If it's an RSC component, it will output to the command line.
 */
export const Console = () => {
  return null;
};
