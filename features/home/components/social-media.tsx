/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:25
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 04:03:31
 */
import {
  IconBrandGithub,
  IconLogoJuejin,
  IconSkillGmailLight,
} from '@/components/icons';

import { EMAIL, GITHUB_PAGE, JUEJIN_PAGE } from '@/constants';

export const socialMediaList: Array<{
  icon: React.ReactNode;
  label: string;
  link: string;
}> = [
  {
    icon: <IconBrandGithub className="text-2xl" />,
    label: 'Github',
    link: GITHUB_PAGE,
  },
  {
    icon: <IconSkillGmailLight className="text-2xl dark:inline-block" />,
    label: 'Gmail',
    link: `mailto:${EMAIL}`,
  },
  {
    icon: <IconLogoJuejin className={`text-2xl text-[#2985fc]`} />,
    label: '掘金',
    link: JUEJIN_PAGE,
  },
];
