'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false });

let isNavigating = false;

export const startProgress = () => {
  if (!isNavigating) {
    isNavigating = true;
    NProgress.start();
  }
};

export const stopProgress = () => {
  isNavigating = false;
  NProgress.done();
};

export function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (
        anchor?.href &&
        !anchor.target &&
        anchor.origin === window.location.origin &&
        !anchor.hasAttribute('download') &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        startProgress();
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      stopProgress();
    };
  }, []);

  useEffect(() => {
    stopProgress();
  }, [pathname]);

  return null;
}
