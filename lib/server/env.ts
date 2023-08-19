import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    FASTIFY_BACKEND: z.string(),
  },
  runtimeEnv: {
    FASTIFY_BACKEND: process.env.FASTIFY_BACKEND,
  },
});
