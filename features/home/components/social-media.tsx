import { IconBrandGithub, IconSkillGmailLight } from '@/components/icons';

import { EMAIL, GITHUB_PAGE } from '@/constants';

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
];
