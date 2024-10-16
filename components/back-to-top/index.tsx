'use client';

import React from 'react';

import { IconPhHandArrow } from '@/components/icons';

export const BackToTop = () => {
  const handleClick = () => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-center text-5xl">
      <IconPhHandArrow
        className="animate-move-up  cursor-pointer"
        onClick={handleClick}
      />
    </div>
  );
};
