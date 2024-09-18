'use client';

import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

export const TypeIntro = () => {
  const [style, setStyle] = useState('font-josefinSans');

  return (
    <div className={`${style} md:leading-14 text-xl md:text-4xl `}>
      <TypeAnimation
        sequence={[
          700,
          () =>
            setStyle('font-josefinSans tracking-custom05 md:tracking-custom25'),
          'JavaScript/TypeScript',
          2000,
          '',
          () =>
            setStyle('font-bebasNeue tracking-custom20 md:tracking-custom52'),
          'React/Next/Vue/Nuxt',
          2000,
          '',
          () =>
            setStyle('font-rubikVinyl tracking-custom20 md:tracking-custom54'),
          'Node.js/Nest.js',
          2000,
          '',
          () =>
            setStyle('font-spaceMono tracking-custom23 md:tracking-custom63'),
          'and Solidity.',
          1000,
          '',
          () =>
            setStyle('font-josefinSans tracking-custom05 md:tracking-custom25'),
        ]}
        speed={10}
        repeat={Infinity}
      />
    </div>
  );
};
