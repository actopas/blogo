import React from 'react';

import { cn } from '@/lib/utils';

export const IconSkillCloudflareDark = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--cloudflare-dark]', className)}
    ></span>
  );
};

export const IconSkillCloudflareLight = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[skill-icons--cloudflare-light]', className)}
    ></span>
  );
};
