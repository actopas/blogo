import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, CreateBlogForm } from '../../components';

export const CreateBlogPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <PageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, translationKey: 'Home' },
            { path: PATHS.ADMIN_BLOG, translationKey: 'Blog' },
            {
              path: PATHS.ADMIN_BLOG_CREATE,
              translationKey: 'Navigation.createBlog',
            },
          ]}
        />
      }
    >
      <CreateBlogForm />
    </AdminContentLayout>
  );
};
