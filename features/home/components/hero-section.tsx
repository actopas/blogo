'use client';

import { useEffect, useState } from 'react';

import {
  Aclonica,
  Bungee_Shade,
  IBM_Plex_Mono,
  Nerko_One,
  Rubik_Glitch,
} from 'next/font/google';
import Link from 'next/link';

import { useLoading } from '@/components/loading-context';

import { NICKNAME, PATHS } from '@/constants';
import { TypeIntro } from '@/features/home';
import { cn } from '@/lib/utils';

// Configure fonts
const bungeeShade = Bungee_Shade({ subsets: ['latin'], weight: '400' });
const nerkoOne = Nerko_One({ subsets: ['latin'], weight: '400' });
const ibmPlexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: '400' });
const rubikGlitch = Rubik_Glitch({ subsets: ['latin'], weight: '400' });
const aclonica = Aclonica({ subsets: ['latin'], weight: '400' });

export const HeroSection = () => {
  const { setIsLoading } = useLoading();
  const [contentLoaded, setContentLoaded] = useState(false);
  let delay = 0;

  const getDelay = () => {
    delay += 200;
    return delay;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      document.fonts.ready
        .then(() => {
          setIsLoading(false);
          setContentLoaded(true);
        })
        .catch((error) => {
          console.error('Font loading failed:', error);
          setIsLoading(false);
          setContentLoaded(true);
        });
    }, 1000); // Give the loading animation a minimum display time

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (!contentLoaded) {
    return null; // Or return a placeholder
  }

  return (
    <div
      className={cn(
        'max-w-screen-md 2xl:max-w-7xl gap-5 flex flex-col justify-center min-h-full pl-custom0.7 md:px-10 font-mono',
        contentLoaded ? 'animate-fade-in' : 'opacity-0',
      )}
    >
      <div className="screen-1/2">
        <p
          className={`${bungeeShade.className} text-2xl md:text-5xl animate-fade-up animate-ease-in-out tracking-wider`}
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          Hi,there.I&apos;m
        </p>
        <p
          className={`${bungeeShade.className} text-4xl md:text-7xl tracking-widest text-primary`}
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          {NICKNAME}
        </p>
        <p
          className={`${nerkoOne.className} text-2xl md:text-7xl tracking-custom60 animate-fade-down animate-ease-in-out font-nerko md:tracking-custom58`}
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          A Full Stack
        </p>
        <div
          className={`${ibmPlexMono.className} text-2xl tracking-custom-05 md:text-5xl md:tracking-custom-08 animate-fade-down animate-ease-in-out font-ibm`}
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          {'Web<Developer />'}
        </div>
        <p
          className={`${rubikGlitch.className} text-2xl md:text-6xl tracking-custom43 animate-fade-down animate-ease-in-out font-rubikGlitch`}
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          Working on:
        </p>
        <div
          className={cn('animate-fade-down animate-ease-in-out')}
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <span className="text-base md:text-lg tracking-widest"></span>
          <TypeIntro />
        </div>
        <Link href={PATHS.SITE_ABOUT}>
          <p
            className={`${aclonica.className} text-2xl md:text-5xl tracking-custom07 md:tracking-custom16 animate-fade-down animate-ease-in-out font-aclonica underline cursor-pointer hover:scale-110 transition-transform duration-300 ease-in-out`}
            style={{
              animationDelay: `${getDelay()}ms`,
            }}
          >
            More About Me
          </p>
        </Link>
      </div>
    </div>
  );
};
