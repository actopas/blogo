'use client';

import { useEffect, useState } from 'react';

import { ReactHotToaster } from '../ui/toast';

export function ClientOnlyToaster() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <ReactHotToaster />;
}
