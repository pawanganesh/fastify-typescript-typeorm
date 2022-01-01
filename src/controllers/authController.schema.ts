export const LoginRequestSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
  additionalProperties: false,
};

const LoginResponseSchema = {
  type: "object",
  properties: {
    access_token: { type: "string" },
  },
};

const MessageResponseSchema = {
  type: "object",
  properties: {
    message: { type: "string" },
  },
};

const RegisterRequestSchema = {
  type: "object",
  required: [...LoginRequestSchema.required, "full_name"],
  properties: {
    ...LoginRequestSchema.properties,
    full_name: { type: "string" },
  },
  additionalProperties: false,
};

const RegisterResponseSchema = {
  type: "object",
  properties: {
    full_name: { type: "string" },
    email: { type: "string" },
  },
};

export const LoginSchema = {
  tags: ["User"],
  description: "Get auth token",
  body: LoginRequestSchema,
  response: {
    200: LoginResponseSchema,
    401: MessageResponseSchema,
  },
};

export const RegisterSchema = {
  tags: ["User"],
  description: "Register new user",
  body: RegisterRequestSchema,
  response: {
    200: RegisterResponseSchema,
    400: MessageResponseSchema,
  },
};
