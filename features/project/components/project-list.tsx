import { IllustrationNoContent } from '@/components/illustrations';

import { ProjectItemCard } from './project-item-card';

import { type Project } from '../types';

type ProjectListProps = {
  projects: Project[];
};

export const ProjectList = ({ projects }: ProjectListProps) => {
  if (!projects.length) {
    return (
      <div className="grid gap-8 place-content-center">
        <IllustrationNoContent className="w-[30vh] h-[30vh]" />
        <h3 className="text-2xl font-semibold tracking-tight text-center">
          Empty
        </h3>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 sm:mx-0 sm:grid-cols-2 gap-4">
      {projects.map((el, idx) => (
        <li
          key={el.id}
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${(idx + 1) * 200}ms`,
          }}
        >
          <ProjectItemCard project={el} />
        </li>
      ))}
    </ul>
  );
};
