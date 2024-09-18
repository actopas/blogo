import { useRequest } from 'ahooks';

import { showErrorToast, showSuccessToast } from '@/components/ui/toast';

import { toggleNotePublished, updateNote } from '../actions';

export const useUpdateNote = () => {
  return useRequest(updateNote, {
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

export const useToggleNotePublish = () => {
  return useRequest(toggleNotePublished, {
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
