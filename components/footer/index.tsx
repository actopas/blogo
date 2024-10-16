import { Rubik_Puddles } from 'next/font/google';

import { IconBar } from '@/components/icon-bar';

import { getPV, getUV } from '@/features/statistics';
import { cn } from '@/lib/utils';
import { formatNum } from '@/utils';

import { BackToTop } from '../back-to-top';
import { buttonVariants } from '../ui/button';

// Configure Rubik Puddles font
const rubikPuddles = Rubik_Puddles({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-rubik-puddles',
});

export const Footer = async () => {
  const pv = await getPV();
  const uv = await getUV();

  return (
    <footer
      className={`w-full flex flex-col py-8 max-w-screen-xl mx-auto text-muted-foreground ${rubikPuddles.variable}`}
    >
      <BackToTop />
      <div className="text-center text-2xl font-rubik-puddles font-semibold">
        Contact Me
      </div>
      <IconBar />
      <div className="w-full text-sm flex flex-row items-center justify-center space-x-2">
        <span>2020 - PRESENT © actopas</span>
        <span className="hidden md:inline-block">·</span>
        <span
          className={cn(
            buttonVariants({ variant: 'link' }),
            '!no-underline px-0 text-muted-foreground',
          )}
        >
          PV：{formatNum(pv)}
        </span>
        <span
          className={cn(
            buttonVariants({ variant: 'link' }),
            '!no-underline px-0 text-muted-foreground',
          )}
        >
          UV：{formatNum(uv)}
        </span>
      </div>
    </footer>
  );
};
