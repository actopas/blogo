import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import {
  IconBarandDiscord,
  IconBarandTelegram,
  IconBarandX,
  IconBrandGithub,
  IconMingcuteEmail,
} from '@/components/icons';

export const IconBar = () => {
  return (
    <div className="flex items-center justify-center space-x-4 p-3">
      <Link href={'https://discord.com/invite/QmV7Pb2x'} target="_blank">
        <Button variant="ghost" size={'icon'} aria-label="Github Icon">
          <IconBarandDiscord className=" h-6 w-6" />
        </Button>
      </Link>
      <Link href={'https://github.com/actopas'} target="_blank">
        <Button variant="ghost" size={'icon'} aria-label="Icon">
          <IconBrandGithub className=" h-6 w-6 " />
        </Button>
      </Link>
      <Link href={'https://t.me/actopas'} target="_blank">
        <Button variant="ghost" size={'icon'} aria-label="Icon">
          <IconBarandTelegram className=" h-6 w-6 " />
        </Button>
      </Link>
      <Link href={'https://x.com/0xtopas'} target="_blank">
        <Button variant="ghost" size={'icon'} aria-label="Icon">
          <IconBarandX className=" h-6 w-6 " />
        </Button>
      </Link>
      <Link href={`mailto:hi@actopas.me`} passHref>
        <Button variant="ghost" size={'icon'} aria-label="Icon">
          <IconMingcuteEmail className=" h-6 w-6 " />
        </Button>
      </Link>
    </div>
  );
};
