'use client';

import React, { useEffect, useState } from 'react';

export const ScrollIndicator = () => {
  const [opacity, setOpacity] = useState(0.5);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      setScrollY(window.scrollY);

      if (!ticking) {
        requestAnimationFrame(() => {
          const newOpacity = Math.max(0, 0.5 - scrollY / 500);
          setOpacity(newOpacity);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  return (
    <div
      className="w-6 h-10 md:w-6 md:h-10 rounded-full border-2 border-white relative grid justify-center pt-2 transition-opacity duration-200"
      style={{ opacity }}
    >
      <div className="w-[2px] h-[5px] md:h-[7px] bg-white rounded-full animate-intro-scroll"></div>
    </div>
  );
};
