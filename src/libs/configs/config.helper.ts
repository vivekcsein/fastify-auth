import type { FastifyReply } from "fastify";
import { envCookieConfig } from "../env/env.cookies";

interface CookieOptions {
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  domain?: string;
  maxAge?: number;
}

/**
 * Safely sets an HTTP-only cookie with sane defaults.
 */
export const setCookie = (
  reply: FastifyReply,
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  const cookieDomain =
    options.domain || envCookieConfig.COOKIE_DOMAIN || "localhost";

  reply.setCookie(name, value, {
    path: options.path || "/",
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? envCookieConfig.COOKIE_SECURE,
    sameSite: options.sameSite || "strict",
    domain: cookieDomain,
    maxAge: options.maxAge ?? 30 * 24 * 60 * 60 * 1000, // Default: 30 days
  });
};
