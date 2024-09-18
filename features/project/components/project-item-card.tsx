'use client';

import { useRouter } from 'next/navigation';

import { IconPhEye, IconPhLink } from '@/components/icons';

import { PATHS } from '@/constants';

import { type Project } from '../types';

type ProjectListItemProps = {
  project: Project;
};
export const ProjectItemCard = ({ project }: ProjectListItemProps) => {
  const router = useRouter();
  const handleToProject = () => {
    router.push(`${PATHS.SITE_PROJECT}/${project.slug}`);
  };
  const handleEyeIconClick = (event: React.MouseEvent) => {
    event.preventDefault(); // 阻止 `<a>` Tag的默认行为（可选）
    event.stopPropagation(); // 阻止事件冒泡，避免触发 `<Link>` 的点击事件
    window.open(project.previewUrl || '', '_blank');
  };
  return (
    <div
      className="box flex flex-col rounded-lg shadow-lg max-w-xl"
      onClick={handleToProject}
    >
      <figure className="effect-zoe">
        <img
          src={project.cover}
          alt={project.title}
          className="mt-4 w-128 h-96 object-cover rounded-lg transition-opacity duration-300"
        />
        <figcaption>
          <div className="flex justify-between w-full">
            <h2>
              {project.title.split(' ')[0]}{' '}
              <span>{project.title.split(' ')[1]}</span>
            </h2>
            <p className="icon-links">
              <IconPhLink className="w-6 h-6 ml-2" />
              <IconPhEye
                className="w-6 h-6 ml-2"
                onClick={handleEyeIconClick}
              />
            </p>
          </div>
          <p className="description">{project.description}</p>
        </figcaption>
      </figure>
    </div>
  );
};
