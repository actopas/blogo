import { useLocale, useTranslations } from 'next-intl';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { BytemdViewer } from '@/components/bytemd';
import { GoBack } from '@/components/go-back';
import { IconPhLink } from '@/components/icons';

import { toFromNow } from '@/lib/utils';

import { type Project } from '../types';

type ProjectDetailProps = {
  project: Project;
};

export const ProjectDetailPage = ({ project }: ProjectDetailProps) => {
  const locale = useLocale();
  const t = useTranslations('ProjectDetail');

  const title = locale === 'zh' ? project.titleZH : project.titleEN;
  const body = locale === 'zh' ? project.bodyZH : project.bodyEN;
  const description =
    locale === 'zh' ? project.descriptionZH : project.descriptionEN;
  return (
    <div className="md:max-w-screen-md 2xl:max-w-6xl md:px-0 md:mx-auto pt-12 md:py-24 px-6 grid gap-9">
      {project.cover && (
        <div className="w-full flex justify-center items-center aspect-[16/6] overflow-hidden rounded-xl">
          <img
            src={project.cover}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-4xl font-extrabold">{title}</h1>
        {project.previewUrl && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              <span className="hidden md:block mr-2">{t('preview')} </span>
              <IconPhLink className="w-6 h-6" aria-hidden="true" />
            </a>
          </Button>
        )}
      </div>
      <span className="text-sm md:text-xl ">{description}</span>
      <article>
        <div className="text-sm flex flex-row items-center text-muted-foreground mb-4">
          <span>
            {t('posted', { time: toFromNow(project.createdAt, locale) })}
          </span>
        </div>
      </article>
      <BytemdViewer body={body || ''} />
      <div className="flex flex-wrap gap-2">
        {project.tags?.map((el) => (
          <Badge key={el.id} className="md:px-5 md:py-2 md:text-base">
            {el.name}
          </Badge>
        ))}
      </div>
      <GoBack />
    </div>
  );
};
