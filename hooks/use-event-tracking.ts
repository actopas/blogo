import { useLocalStorageState } from 'ahooks';

import { STORAGE_KEY_EVENT_TRACKING_CUID } from '@/constants';
import { isCuid } from '@/lib/cuid';

export const useCuid = () => {
  const [cuid, setCuid] = useLocalStorageState<string | undefined>(
    STORAGE_KEY_EVENT_TRACKING_CUID,
    {
      defaultValue: undefined,
    },
  );

  // Validate the legality of cuid, return undefined if it's not valid
  const tmp = cuid && isCuid(cuid) ? cuid : undefined;

  return { cuid: tmp, setCuid };
};
