'use client';

import { useTranslations } from 'next-intl';

import {
  IconBrandGithub,
  IconLogoElectron,
  IconLogoEslint,
  IconLogoEthers,
  IconLogoExpo,
  IconLogoGitlab,
  IconLogoGoogle,
  IconLogoHardhat,
  IconLogoJest,
  IconLogoNginx,
  IconLogoPrettier,
  IconLogoServerless,
  IconLogoSourcetree,
  IconLogoSwagger,
  IconLogoSwift,
  IconLogoTruffle,
  IconLogoTypeorm,
  IconLogoWeb3,
  IconSkillAwsDark,
  IconSkillAwsLight,
  IconSkillCSS,
  IconSkillCloudflareDark,
  IconSkillCloudflareLight,
  IconSkillCypressDark,
  IconSkillCypressLight,
  IconSkillDocker,
  IconSkillFigmaDark,
  IconSkillFigmaLight,
  IconSkillGit,
  IconSkillHTML,
  IconSkillJavaScript,
  IconSkillJenkinsDark,
  IconSkillJenkinsLight,
  IconSkillMongodb,
  IconSkillMysqlDark,
  IconSkillMysqlLight,
  IconSkillNestDark,
  IconSkillNestLight,
  IconSkillNetlifyDark,
  IconSkillNetlifyLight,
  IconSkillNextjsDark,
  IconSkillNextjsLight,
  IconSkillNotionDark,
  IconSkillNotionLight,
  IconSkillNuxtDark,
  IconSkillNuxtLight,
  IconSkillPostman,
  IconSkillPrisma,
  IconSkillReactDark,
  IconSkillReactLight,
  IconSkillSolidity,
  IconSkillTailwindcssDark,
  IconSkillTailwindcssLight,
  IconSkillTypeScript,
  IconSkillVercelDark,
  IconSkillVercelLight,
  IconSkillVueDark,
  IconSkillVueLight,
  IconSkillWindicssDark,
  IconSkillWindicssLight,
} from '@/components/icons';
import { PageHeader } from '@/components/page-header';
import { SkillProgressBar } from '@/components/skill-progress-bar';

import { PATHS } from '@/constants';

export const revalidate = 60;

export default function Page() {
  const t = useTranslations('About');
  const breadcrumbList = [
    { path: PATHS.SITE_HOME, translationKey: 'Navigation.home' },
    { path: PATHS.SITE_ABOUT, translationKey: 'Navigation.about' },
  ];
  let delay = 0;

  // Increment delay each time it's called
  const getDelay = () => (delay += 200);

  return (
    <div className="w-full flex flex-col justify-center px-6 md:max-w-screen-md  2xl:max-w-6xl  md:mx-auto pb-8 pt-8">
      <PageHeader breadcrumbList={breadcrumbList} className="mb-0" />

      <section className="prose dark:prose-invert prose-zinc  2xl:max-w-6xl">
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>{t('who_i_am')}</h2>
          <p className="max-w-3xl">{t('who_i_am_description')}</p>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>{t('tech_stack_skills')}</h2>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>{t('research_idea_design')}</h3>
          <ul>
            <li>
              <IconLogoGoogle className="mx-1 translate-y-0.5" />
              Google +
              <>
                <IconSkillNotionDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillNotionLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Notion +
              <>
                <IconSkillFigmaDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillFigmaLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>
              Figma
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <div className="flex items-center">
            <h3 className="m-0 w-1/2">{t('frontend')}</h3>
            <div className="w-1/3">
              <SkillProgressBar percentage={100} />
            </div>
          </div>
          <ul>
            <li>
              <IconSkillHTML className="mx-1 translate-y-0.5" /> HTML +{' '}
              <IconSkillCSS className="mx-1 translate-y-0.5" /> CSS +{' '}
              <IconSkillJavaScript className="mx-1 translate-y-0.5" />{' '}
              JavaScript /{' '}
              <IconSkillTypeScript className="mx-1 translate-y-0.5" />{' '}
              TypeScript
            </li>

            <li>
              <>
                <IconSkillReactDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillReactLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              React +{' '}
              <>
                <IconSkillNextjsDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillNextjsLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Next.js +{' '}
              <>
                <IconSkillTailwindcssDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillTailwindcssLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Tailwind CSS
            </li>
            <li>
              <>
                <IconSkillVueDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillVueLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Vue +{' '}
              <>
                <IconSkillNuxtDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillNuxtLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Nuxt +{' '}
              <>
                <IconSkillWindicssDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillWindicssLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Windi CSS
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <div className="flex items-center">
            <h3 className="m-0 w-1/2">{t('backend')}</h3>
            <div className="w-1/3">
              <SkillProgressBar percentage={80} />
            </div>
          </div>
          <ul>
            <li>
              <>
                <IconSkillNestDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillNestLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Nest.js + <IconSkillPrisma className="mx-1 translate-y-0.5" />{' '}
              Prisma / <IconLogoTypeorm className="mx-1 translate-y-0.5" />{' '}
              TypeORM +
              <>
                <IconSkillMysqlDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillMysqlLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              MySQL / <IconSkillMongodb className="mx-1 translate-y-0.5" />{' '}
              MongoDB + <IconLogoSwagger className="mx-1 translate-y-0.5" />{' '}
              Swagger
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <div className="flex items-center">
            <h3 className="m-0 w-1/2">{t('desktop_mobile')}</h3>
            <div className="w-1/3">
              <SkillProgressBar percentage={80} />
            </div>
          </div>
          <ul>
            <li>
              <>
                <IconSkillReactDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillReactLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              React + <IconLogoElectron className="mx-1 translate-y-0.5" />{' '}
              Electron +{' '}
              <>
                <IconSkillTailwindcssDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillTailwindcssLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Tailwind CSS
            </li>
            <li>
              <IconLogoSwift className="mx-1 translate-y-0.5" /> Swift /{' '}
              <>
                <IconSkillReactDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillReactLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              React Native + <IconLogoExpo className="mx-1 translate-y-0.5" />
              Expo{' '}
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <div className="flex items-center">
            <h3 className="m-0 w-1/2">{t('blockchain')}</h3>
            <div className="w-1/3">
              <SkillProgressBar percentage={60} />
            </div>
          </div>
          <ul>
            <li>
              <IconSkillSolidity className="mx-1 translate-y-0.5" /> Solidity +{' '}
              <IconLogoHardhat className="mx-1 translate-y-0.5" /> Hardhat /{' '}
              <IconLogoTruffle className="mx-1 translate-y-0.5" /> Truffle +{' '}
              <IconLogoEthers className="mx-1 translate-y-0.5" /> Ethers.js /{' '}
              <IconLogoWeb3 className="mx-1 translate-y-0.5" /> Web3.js
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>{t('testing_quality')}</h3>
          <ul>
            <li>
              <IconLogoJest className="mx-1 translate-y-0.5" /> Jest +{' '}
              <>
                <IconSkillCypressDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillCypressLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Cypress + <IconLogoEslint className="mx-1 translate-y-0.5" />{' '}
              Eslint + <IconLogoPrettier className="mx-1 translate-y-0.5" />{' '}
              Prettier + <IconSkillPostman className="mx-1 translate-y-0.5" />{' '}
              Postman
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>{t('version_control')}</h3>
          <ul>
            <li>
              <IconSkillGit className="mx-1 translate-y-0.5" /> git +{' '}
              <IconBrandGithub className="mx-1 translate-y-0.5" /> github /{' '}
              <IconLogoGitlab className="mx-1 translate-y-0.5" /> gitlab +{' '}
              <IconLogoSourcetree className="mx-1 translate-y-0.5" /> SourceTree
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>{t('services_devops')}</h3>
          <ul>
            <li>
              <IconLogoServerless className="mx-1 translate-y-0.5" /> Serverless{' '}
              /{' '}
              <>
                <IconSkillAwsDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillAwsLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              AWS +{' '}
              <>
                <IconSkillVercelDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillVercelLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Vercel /{' '}
              <>
                <IconSkillNetlifyDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillNetlifyLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Netlify{' '}
            </li>
            <li>
              <IconSkillDocker className="mx-1 translate-y-0.5" /> Docker +{' '}
              <>
                <IconSkillJenkinsDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillJenkinsLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Jenkins + <IconLogoNginx className="mx-1 translate-y-0.5" /> Nginx
              +{' '}
              <>
                <IconSkillCloudflareDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillCloudflareLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Cloudflare
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>{t('others')}</h3>
          <p className="max-w-3xl">{t('others_description')}</p>
        </div>
      </section>
    </div>
  );
}
