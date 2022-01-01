import {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteHandler,
} from "fastify";

export interface IConstantMessage {
  fastify?: FastifyInstance;
  request?: FastifyRequest;
  reply: FastifyReply;
}

export const ReplyFactory = (
  { reply }: IConstantMessage,
  success = true,
  status = 200,
  message = "Your request was successful",
  data = []
) => {
  return reply.status(status).send({ success, data, message }).hijack();
};

export const shouldBeLoggedIn = ({ reply }: IConstantMessage) => {
  return ReplyFactory({ reply }, false, 401, "You must be logged in");
};

export const noAuthTokenProvided = ({ reply }: IConstantMessage) => {
  return ReplyFactory(
    { reply },
    false,
    400,
    "Authentication credentials were not provided"
  );
};

export const invalidToken = ({ reply }: IConstantMessage) => {
  return ReplyFactory({ reply }, false, 400, "Invalid token");
};

export const notEnoughPrivilege = ({ reply }: IConstantMessage) => {
  return ReplyFactory(
    { reply },
    false,
    400,
    "You do not have enough privilege."
  );
};

export const routeNotSetYet = ({ reply }: IConstantMessage) => {
  return ReplyFactory(
    { reply },
    false,
    404,
    "This route is not configured yet"
  );
};

export const Handler404: RouteHandler = async (request, reply) => {
  return routeNotSetYet({ reply });
};

export interface IError {
  status: number;
  message: string;
}

export const CustomError: RouteHandler<{ Body: IError }> = async (
  request,
  reply
) => {
  const { status, message } = request.body;
  return ReplyFactory({ reply }, false, status, message);
};
