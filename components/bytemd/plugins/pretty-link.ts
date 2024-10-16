/* eslint-disable */
// @ts-nocheck
import type { BytemdPlugin } from 'bytemd';
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic';
import { visit } from 'unist-util-visit';

import { extractDomainFromUrl } from '@/utils';

// The function of fromHtmlIsomorphic is to convert an html tag into the corresponding HAST, simplifying the process of writing svg
// Common svg icon node for hyperlinks
const linkSvgNode = fromHtmlIsomorphic(
  `<svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6m0 0H9m9 0v9"/></svg>`,
);
// Some video website svg icon node
const ytSvgNode = fromHtmlIsomorphic(
  `<svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.6em" viewBox="0 0 256 180"><path fill="#f00" d="M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134"/><path fill="#fff" d="m102.421 128.06l66.328-38.418l-66.328-38.418z"/></svg>`,
);
// github svg icon node
const githubSvgNode = fromHtmlIsomorphic(
  `<svg xmlns="http://www.w3.org/2000/svg" width="0.8em" height="0.8em" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6c-3.3.3-5.6-1.3-5.6-3.6c0-2 2.3-3.6 5.2-3.6c3-.3 5.6 1.3 5.6 3.6m-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9c2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3m44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9c.3 2 2.9 3.3 5.9 2.6c2.9-.7 4.9-2.6 4.6-4.6c-.3-1.9-3-3.2-5.9-2.9M244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2c12.8 2.3 17.3-5.6 17.3-12.1c0-6.2-.3-40.4-.3-61.4c0 0-70 15-84.7-29.8c0 0-11.4-29.1-27.8-36.6c0 0-22.9-15.7 1.6-15.4c0 0 24.9 2 38.6 25.8c21.9 38.6 58.6 27.5 72.9 20.9c2.3-16 8.8-27.1 16-33.7c-55.9-6.2-112.3-14.3-112.3-110.5c0-27.5 7.6-41.3 23.6-58.9c-2.6-6.5-11.1-33.3 2.6-67.9c20.9-6.5 69 27 69 27c20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27c13.7 34.7 5.2 61.4 2.6 67.9c16 17.7 25.8 31.5 25.8 58.9c0 96.5-58.9 104.2-114.8 110.5c9.2 7.9 17 22.9 17 46.4c0 33.7-.3 75.4-.3 83.6c0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252C496 113.3 383.5 8 244.8 8M97.2 352.9c-1.3 1-1 3.3.7 5.2c1.6 1.6 3.9 2.3 5.2 1c1.3-1 1-3.3-.7-5.2c-1.6-1.6-3.9-2.3-5.2-1m-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9c1.6 1 3.6.7 4.3-.7c.7-1.3-.3-2.9-2.3-3.9c-2-.6-3.6-.3-4.3.7m32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2c2.3 2.3 5.2 2.6 6.5 1c1.3-1.3.7-4.3-1.3-6.2c-2.2-2.3-5.2-2.6-6.5-1m-11.4-14.7c-1.6 1-1.6 3.6 0 5.9c1.6 2.3 4.3 3.3 5.6 2.3c1.6-1.3 1.6-3.9 0-6.2c-1.4-2.3-4-3.3-5.6-2"/></svg>`,
);
// stackoverflow svg icon node
const stackoverflowSvgNode = fromHtmlIsomorphic(
  `<svg xmlns="http://www.w3.org/2000/svg" width="0.68em" height="0.8em" viewBox="0 0 256 304"><path fill="#bcbbbb" d="M216.33 276.188v-81.211h26.953v108.165H0V194.977h26.954v81.211z"/><path fill="#f48023" d="m56.708 187.276l132.318 27.654l5.6-26.604L62.31 160.672zm17.502-63.009l122.517 57.058l11.202-24.503L85.412 99.414zm33.955-60.208l103.964 86.462l17.152-20.653l-103.964-86.462zM175.375 0L153.67 16.102l80.511 108.515l21.703-16.102zM53.906 248.884h135.119V221.93H53.907z"/></svg>`,
);

/**
 * Make external links open in _blank
 */
export const prettyLinkPlugin = (): BytemdPlugin => {
  return {
    rehype: (process) =>
      process.use(() => (tree) => {
        visit(tree, 'element', (node) => {
          if (node.tagName === 'a') {
            // If it starts with #, it indicates a hash, so no processing is needed
            if (node.properties.href && node.properties.href.startsWith('#')) {
              return;
            }
            node.properties.target = '_blank';
            node.children.push(linkSvgNode);

            // Determine the type of current link and whether it is a known website, then add the corresponding icon based on the domain name
            const host = extractDomainFromUrl(node.properties.href);
            const domainToSvgNodeMap = {
              'bilibili.com': bilibiliSvgNode,
              'juejin.cn': juejinSvgNode,
              'github.com': githubSvgNode,
              'youtube.com': ytSvgNode,
              'stackoverflow.com': stackoverflowSvgNode,
            };
            const svgNode = domainToSvgNodeMap[host];
            if (svgNode) {
              node.children.unshift(svgNode);
            }
          }
        });
      }),
  };
};
