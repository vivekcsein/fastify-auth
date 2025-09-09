import fp from "fastify-plugin";
import type { FastifyInstance } from "fastify";
import cors, { type FastifyCorsOptions } from "@fastify/cors";
import { allowedOrigins } from "../configs/config.domain";

const corsPlugin = fp<FastifyCorsOptions>(
  async (fastify: FastifyInstance, options) => {
    await fastify.register(cors, {
      ...options,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      origin: allowedOrigins,
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
      ],
      exposedHeaders: ["Set-Cookie"],
    });
  },
  {
    name: "cors",
  }
);

export default corsPlugin;
