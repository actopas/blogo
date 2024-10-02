'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { IconPhEye, IconPhLink } from '@/components/icons';

import { PATHS } from '@/constants';

import { type Project } from '../types';

type ProjectListItemProps = {
  project: Project;
};

export const ProjectItemCard = ({ project }: ProjectListItemProps) => {
  const router = useRouter();
  const locale = useLocale();

  const title = locale === 'zh' ? project.titleZH : project.titleEN;
  const description =
    locale === 'zh' ? project.descriptionZH : project.descriptionEN;

  const handleToProject = () => {
    router.push(`${PATHS.SITE_PROJECT}/${project.id}`); // 使用 id 替代 slug
  };

  const handleEyeIconClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(project.previewUrl || '', '_blank');
  };

  const titleWords = title.split(' ');
  const firstWord = titleWords[0];
  const restWords = titleWords.slice(1).join(' ');

  return (
    <div
      className="box flex flex-col rounded-lg shadow-lg max-w-xl"
      onClick={handleToProject}
    >
      <figure className="effect-zoe">
        <img
          src={project.cover}
          alt={title}
          className="mt-4 w-128 h-96 object-cover rounded-lg transition-opacity duration-300"
        />
        <figcaption>
          <div className="flex justify-between w-full">
            <h2>
              {firstWord} <span>{restWords}</span>
            </h2>
            <p className="icon-links">
              <IconPhLink className="w-6 h-6 ml-2" />
              <IconPhEye
                className="w-6 h-6 ml-2"
                onClick={handleEyeIconClick}
              />
            </p>
          </div>
          <p className="description">{description}</p>
        </figcaption>
      </figure>
    </div>
  );
};
