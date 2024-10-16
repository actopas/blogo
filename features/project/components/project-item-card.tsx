'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';

import { IconPhLink } from '@/components/icons';
import { startProgress } from '@/components/progress-bar';

import { PATHS } from '@/constants';
import { cn } from '@/lib/utils';

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
    startProgress(); // Call startProgress when navigation starts
    router.push(`${PATHS.SITE_PROJECT}/${project.slug}`);
  };

  const handleEyeIconClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    window.open(project.previewUrl || '', '_blank');
  };

  return (
    <motion.div
      className="flex flex-col rounded-lg overflow-hidden max-w-xl bg-card border border-border shadow-lg dark:shadow-primary/5 mb-8 md:mb-0 cursor-pointer"
      onClick={handleToProject}
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{
        scale: 1.05,
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      }}
    >
      <div className="relative w-full aspect-[16/8] overflow-hidden">
        {' '}
        {/* Use fixed aspect ratio */}
        <img
          src={project.cover}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-base opacity-90 line-clamp-2">
            {description}
          </p>{' '}
          {/* Limit description to two lines */}
        </div>
      </div>
      <div className="p-6 flex-grow">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <Badge
                key={tag.id}
                variant="secondary"
                className="text-sm px-3 py-1"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
          {project.previewUrl && (
            <motion.a
              className={cn('icon-link', 'text-primary hover:text-primary/80')}
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleEyeIconClick}
              whileHover={{ scale: 1.1 }}
              aria-label={title}
            >
              <IconPhLink className="w-8 h-8" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
