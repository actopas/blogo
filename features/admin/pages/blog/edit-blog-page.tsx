/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-09-12 14:36:25
 * @LastEditors: actopas
 * @LastEditTime: 2024-09-16 00:50:10
 */
import { PageHeader } from '@/components/page-header';

import { PATHS } from '@/constants';

import { AdminContentLayout, EditBlogForm } from '../../components';

export const EditBlogPage = () => {
  return (
    <AdminContentLayout
      pageHeader={
        <PageHeader
          breadcrumbList={[
            { path: PATHS.ADMIN_HOME, translationKey: 'Navigation.home' },
            { path: PATHS.ADMIN_BLOG, translationKey: 'Navigation.blog' },
            {
              path: PATHS.ADMIN_BLOG_EDIT,
              translationKey: 'Navigation.editBlog',
            },
          ]}
        />
      }
    >
      <EditBlogForm />
    </AdminContentLayout>
  );
};
