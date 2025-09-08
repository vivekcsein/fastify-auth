import { FastifyPluginAsync } from "fastify";
import rateLimit, { type RateLimitOptions } from "@fastify/rate-limit";
import { envBackendConfig } from "../env/env.backend";

const rateLimitPlugin: FastifyPluginAsync = async (fastify) => {
  (fastify.register(rateLimit, {
    max: envBackendConfig.APP_RATE_LIMIT_MAX,
    timeWindow: envBackendConfig.APP_RATE_LIMIT_TIME_WINDOW,
    errorResponseBuilder: (_request, context) => ({
      success: false,
      message: `Rate limit exceeded, retry in ${context.after}`,
    }),
  } as RateLimitOptions),
    {
      name: "rateLimit",
    });
};

export default rateLimitPlugin;
