import Redis, { type Redis as RedisInstanceType } from 'ioredis';

import { NODE_ENV, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from '@/config';

import { REDIS_KYE_PREFIX } from '@/constants';

const globalForRedis = global as unknown as { redis: RedisInstanceType };

export const redis =
  globalForRedis.redis ||
  new Redis({
    host: REDIS_HOST ?? '127.0.0.1',
    port: Number(REDIS_PORT) || 6379,
    password: REDIS_PASSWORD,
    keyPrefix: REDIS_KYE_PREFIX,
  });
redis.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redis.on('error', (err) => {
  console.error('Failed to connect to Redis:', err);
});
if (NODE_ENV !== 'production') globalForRedis.redis = redis;
