import fp from "fastify-plugin";
import cookie from "@fastify/cookie";
import type { FastifyInstance } from "fastify";
import { envCookieConfig } from "../env/env.cookies";
import type { FastifyCookieOptions } from "@fastify/cookie";

const cookiePlugin = fp(
  async (fastify: FastifyInstance) => {
    fastify.register(cookie, {
      secret: envCookieConfig.JWT_SECRET_TOKEN, // for cookies signature
      // options for parsing cookies
      parseOptions: {
        sameSite: "none",
        secure: envCookieConfig.COOKIE_SECURE, // true in prod (HTTPS), false in dev (HTTP)
        httpOnly: true,
        path: "/",
        domain: ".vercel.app",
      },
    } as FastifyCookieOptions);
  },
  {
    name: "cookie",
  }
);

export default cookiePlugin;
