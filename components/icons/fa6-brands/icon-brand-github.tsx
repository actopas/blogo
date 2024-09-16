/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 01:36:47
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconBrandGithub = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[fa6-brands--github]', className)}
    ></span>
  );
};
//fa6-brands--x-twitter
//fa6-brands--telegram
//fa6-brands--discord
