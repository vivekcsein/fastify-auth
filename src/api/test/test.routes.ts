import { supabase } from "../../libs/db/db.supabase";
import type { FastifyPluginAsync } from "fastify";

const supabaseTestRoute: FastifyPluginAsync = async (fastify) => {
  fastify.get("/supabase-test", async (_req, reply) => {
    console.log("Supabase test route");

    const { data, error } = await supabase.from("test").select("*").limit(1);

    if (error) {
      return reply.status(500).send({
        status: "error",
        message: "Supabase connection failed",
        details: error.message,
      });
    }

    reply.send({
      status: "success",
      message: "Supabase connected successfully",
      sample: data,
    });
  });
};

export default supabaseTestRoute;
