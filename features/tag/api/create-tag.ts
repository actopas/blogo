import { useRequest } from 'ahooks';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { createTag } from '../actions';

export const useCreateTag = () => {
  return useRequest(createTag, {
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
