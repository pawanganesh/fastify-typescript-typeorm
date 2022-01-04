import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { createConnection } from "typeorm";

const connectDB: FastifyPluginCallback = async (fastify) => {
  // TypeORM database integration
  await createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ["build/entities/*.entity.js"],
    synchronize: process.env.NODE_ENV === "development",
  });
  fastify.log.info("DB connected");
};

export default fastifyPlugin(connectDB);
