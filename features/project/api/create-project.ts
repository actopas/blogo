import { useRequest } from 'ahooks';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { createProject } from '../actions';

export const useCreateProject = () => {
  return useRequest(createProject, {
    manual: true,
    loadingDelay: 300,
    onSuccess() {
      showSuccessToast('Success');
    },
    onError(error) {
      showErrorToast(`Fail: ${error.message}`);
    },
  });
};
