'use client';

import { usePathname } from 'next/navigation';

import { useAsyncEffect } from 'ahooks';

import { useRecordPV, useRecordUV } from '@/features/statistics';
import { useCuid } from '@/hooks';
import { createCuid } from '@/lib/cuid';
import { sleep } from '@/utils';

export const Fingerprint = () => {
  const { cuid, setCuid } = useCuid();
  const pathname = usePathname();
  const pvRecordQuery = useRecordPV();
  const uvRecordQuery = useRecordUV();

  useAsyncEffect(async () => {
    let id = cuid;

    if (!id) {
      // Generate cuid and upload to the point
      id = createCuid();
      setCuid(id);
    }

    // Wait 3 seconds before reporting
    await sleep(3 * 1000);

    await pvRecordQuery.runAsync();
    await uvRecordQuery.runAsync(id);
  }, [pathname]);

  return null;
};
