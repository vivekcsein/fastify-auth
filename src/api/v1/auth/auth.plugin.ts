import fp from "fastify-plugin";
import authRoutes from "./auth.routes";
import type { FastifyInstance } from "fastify";
import { envAppConfig } from "../../../libs/env/env.app";

// auth api version 1 for user authentication using supabase
const authPlugin = fp(
  async (fastify: FastifyInstance) => {
    const prefix = `${envAppConfig.API_PATH}/auth`;
    authRoutes.forEach((route) => {
      fastify.register(
        (app, _, done) => {
          app.route(route);
          done();
        },
        { prefix: prefix }
      );
    });
  },
  {
    name: "authPlugin",
  }
);

export default authPlugin;
