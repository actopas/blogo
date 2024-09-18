/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:25
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 03:45:34
 */
import Link from 'next/link';

import { NICKNAME, PATHS } from '@/constants';
import { TypeIntro } from '@/features/home';
import { cn } from '@/lib/utils';

export const HeroSection = () => {
  let delay = 0;

  // 每次调用，增加延时
  const getDelay = () => (delay += 200);

  return (
    <div className="max-w-screen-md 2xl:max-w-7xl gap-5 flex flex-col justify-center min-h-full pl-6 md:px-10 font-mono">
      <div className="screen-1/2">
        <p
          className="font-bungeeShade text-2xl md:text-5xl animate-fade-up animate-ease-in-out tracking-wider"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          Hi,there.I&apos;m
        </p>
        <p className="text-4xl md:text-7xl tracking-widest  font-bungeeShade text-primary ">
          {NICKNAME}
        </p>
        <p
          className="text-2xl md:text-7xl tracking-custom60 animate-fade-down animate-ease-in-out font-nerko md:tracking-custom58"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          A Full Stack
        </p>
        <div
          className="text-2xl tracking-custom-05 md:text-5xl md:tracking-custom-08 animate-fade-down animate-ease-in-out font-ibm"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          {'Web<Developer />'}
        </div>
        <p
          className="text-2xl md:text-6xl tracking-custom43 animate-fade-down animate-ease-in-out font-rubikGlitch"
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
            className="text-2xl md:text-5xl tracking-custom07 md:tracking-custom16 animate-fade-down animate-ease-in-out font-aclonica underline cursor-pointer"
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
