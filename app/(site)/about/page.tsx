'use client';

import {
  IconBrandGithub,
  IconLogoEslint,
  IconLogoEthers,
  IconLogoGitlab,
  IconLogoGoogle,
  IconLogoHardhat,
  IconLogoJest,
  IconLogoNginx,
  IconLogoPrettier,
  IconLogoServerless,
  IconLogoSourcetree,
  IconLogoSwagger,
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

import { PATHS } from '@/constants';

export const revalidate = 60;

export default function Page() {
  let delay = 0;

  // 每次调用，增加延时
  const getDelay = () => (delay += 200);

  return (
    <div className="w-full flex flex-col justify-center px-6 md:max-w-screen-md  2xl:max-w-6xl  md:mx-auto pb-24 pt-8">
      <PageHeader
        breadcrumbList={[PATHS.SITE_HOME, PATHS.SITE_ABOUT]}
        className="mb-0"
      />

      <section className="prose dark:prose-invert prose-zinc  2xl:max-w-6xl">
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>Who I am</h2>
          <p>
            An independent full-stack developer since 2020, built serval apps
            from 0 to 1.
            <br />
            Focus on feature development, user experience, and creating
            maintainable, easily iterated solutions.
            <br />
            Fast, Reliable, Efficient.
          </p>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h2>Tech Stack & Skills</h2>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>Research & Idea & Design</h3>
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
          <h3>Front-end</h3>
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
              windicss
            </li>
          </ul>
        </div>
        <div
          className="animate-fade-up animate-ease-in-out"
          style={{
            animationDelay: `${getDelay()}ms`,
          }}
        >
          <h3>Back-end</h3>
          <ul>
            <li>
              <>
                <IconSkillNestDark className="dark:hidden mx-1 translate-y-0.5" />
                <IconSkillNestLight className="hidden dark:inline-block mx-1 translate-y-0.5" />
              </>{' '}
              Nest.js + <IconSkillPrisma className="mx-1 translate-y-0.5" />{' '}
              Prisma + <IconLogoTypeorm className="mx-1 translate-y-0.5" />{' '}
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
          <h3>Blockchain</h3>
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
          <h3>Testing & Quality</h3>
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
          <h3>Version Control</h3>
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
          <h3>Services & DevOps</h3>
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
              Vercel +{' '}
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
          <h3>Others</h3>
          <p>
            Living a life of creating something is where my passion at. I thrive
            <br />
            on working on interesting projects and contributing to meaningful
            <br />
            repositories. If you&apos;re looking for someone to bring your idea
            to
            <br />
            life, feel free to contact me below, and we can schedule a time to
            <br />
            chat.
          </p>
        </div>
      </section>
    </div>
  );
}
