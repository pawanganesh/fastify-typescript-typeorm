import { FastifyPluginCallback } from "fastify";
import fastifyPlugin from "fastify-plugin";
import jwt from "jsonwebtoken";

import {
  invalidToken,
  noAuthTokenProvided,
  notEnoughPrivilege,
} from "../helpers/replies";
import { getUserByEmailAndId } from "../services/userService";
import { IPermission, IToken } from "../interfaces/user.interface";

declare module "fastify" {
  interface FastifyRequest {
    user: object;
  }
}

export const RoleCheck: FastifyPluginCallback<IPermission> = (
  fastify,
  options,
  done
) => {
  //set request.user to null initially.
  fastify.decorateRequest("user", null);

  fastify.addHook("onRequest", async (request, reply) => {
    // TODO: drop request check if role is not set yet

    //check if logged out only or allow any
    if (options.loggedOutOnly || options.allowAny) {
      return;
    }

    //decode token from request
    const auth_token = request.headers.authorization || "";

    if (!auth_token) {
      return noAuthTokenProvided({ reply });
    }
    const token = auth_token.split(" ")[1];
    console.log("auth_token", token);

    // decode jwt and check
    const decoded = checkJWT(token);
    if (!decoded) {
      return invalidToken({ reply });
    }

    //if no permission required proceed, no need to check on database.
    // but let's check on database to make sure auth_token is not malformed,
    const userExists = getUserByEmailAndId(decoded.email, +decoded.id);

    if (!userExists) {
      //Auth token malformed
      return invalidToken({ reply });
    }

    if (options.adminOnly) {
      // TODO: check if user is admin
      //   notEnoughPrivilege({ reply });
    }

    request.user = { id: decoded.id, email: decoded.email };

    return;
  });
  done();
};

const checkJWT = (auth_token: string) => {
  try {
    return jwt.verify(auth_token, process.env.JWT_SECRET!) as IToken;
  } catch (e) {
    return undefined;
  }
};

const RoleCheckPlugin = fastifyPlugin(RoleCheck);
export default RoleCheckPlugin;
