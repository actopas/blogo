import OSS from 'ali-oss';

import {
  NODE_ENV,
  OSS_ACCESS_KEY_ID,
  OSS_ACCESS_KEY_SECRET,
  OSS_BUCKET,
  OSS_ENDPOINT,
  OSS_REGION,
} from '@/config';

const globalForAliOSS = global as unknown as { aliOSS: OSS | undefined };

export const aliOSS =
  globalForAliOSS.aliOSS ??
  new OSS({
    accessKeyId: OSS_ACCESS_KEY_ID ?? '',
    accessKeySecret: OSS_ACCESS_KEY_SECRET ?? '',
    region: OSS_REGION ?? '',
    bucket: OSS_BUCKET ?? '',
    endpoint: OSS_ENDPOINT ?? '',
  });

if (NODE_ENV !== 'production') globalForAliOSS.aliOSS = aliOSS;
