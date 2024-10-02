import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, CreateProjectForm } from '../../components';

export const CreateProjectPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <PageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, translationKey: 'Home' },
            { path: PATHS.ADMIN_PROJECT, translationKey: 'Project' },
            { path: PATHS.ADMIN_PROJECT_CREATE, translationKey: 'Create' },
          ]}
        />
      }
    >
      <CreateProjectForm />
    </AdminContentLayout>
  );
};
