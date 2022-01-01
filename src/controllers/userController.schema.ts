import { FastifySchema } from "fastify";

//Response of getUser
const userObjectSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    id: { type: "string" },
    full_name: { type: "string" },
    email: { type: "string" },
  },
};

export const getUserSchema = {
  tags: ["User"],
  response: {
    "2xx": userObjectSchema,
  },
};
