'use client';

import { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';

import {
  Bebas_Neue,
  Finger_Paint,
  Josefin_Sans,
  Rubik_Vinyl,
  Space_Mono,
} from 'next/font/google';

// Configure fonts
const josefinSans = Josefin_Sans({ subsets: ['latin'] });
const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });
const fingerPaint = Finger_Paint({ weight: '400', subsets: ['latin'] });
const rubikVinyl = Rubik_Vinyl({ weight: '400', subsets: ['latin'] });
const spaceMono = Space_Mono({ weight: '400', subsets: ['latin'] });

export const TypeIntro = () => {
  const [style, setStyle] = useState(josefinSans.className);

  return (
    <div className={`${style} md:leading-14 text-xl md:text-4xl`}>
      <TypeAnimation
        sequence={[
          () =>
            setStyle(
              `${josefinSans.className} tracking-custom05 md:tracking-custom25`,
            ),
          'JavaScript/TypeScript',
          2000,
          '',
          () =>
            setStyle(
              `${bebasNeue.className} tracking-custom20 md:tracking-custom52`,
            ),
          'React/Next/Vue/Nuxt',
          2000,
          '',
          () =>
            setStyle(
              `${fingerPaint.className} tracking-custom01 md:tracking-custom18`,
            ),
          'Swift/Expo/Electron',
          2000,
          '',
          () =>
            setStyle(
              `${rubikVinyl.className} tracking-custom20 md:tracking-custom54`,
            ),
          'Node.js/Nest.js',
          2000,
          '',
          () =>
            setStyle(
              `${spaceMono.className} tracking-custom23 md:tracking-custom63`,
            ),
          'and Solidity.',
          1000,
          '',
          () =>
            setStyle(
              `${josefinSans.className} tracking-custom05 md:tracking-custom25`,
            ),
        ]}
        speed={10}
        repeat={Infinity}
      />
    </div>
  );
};
