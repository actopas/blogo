/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-15 01:24:27
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 01:33:48
 */

/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-15 01:23:45
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-15 01:25:06
 */
import React from 'react';

import { cn } from '@/lib/utils';

export const IconBarandDiscord = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      {...props}
      className={cn('icon-[fa6-brands--discord]', className)}
    ></span>
  );
};
