/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-15 17:47:06
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 17:59:08
 */

/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:24
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 17:46:50
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconPhLink = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className={cn('icon-[ph--link-bold]', className)}></span>
  );
};
//fa6-brands--x-twitter
//fa6-brands--telegram
//fa6-brands--discord
