'use client';

import React from 'react';

import { IconPhTriangle } from '@/components/icons';

export const BackToTop = () => {
  const handleClick = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-center text-5xl">
      <IconPhTriangle
        className="animate-move-up  cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};
