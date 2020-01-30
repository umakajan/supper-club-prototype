/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import HttpException from "../common/http-exception";

dotenv.config();

/**
 * Custom Interfaces
 */

export interface User {
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions?: string[];
}

/**
 * Earlier in the src/middleware/authz.middleware.ts file, you defined the
 * checkJwt() function, which is an authorization middleware function. When
 * the server receives a client request, the middleware validates the access
 * token with Auth0 and then sets a user property in the Express request object.
 * However, that user property is not defined in the Request type definition
 * from Express. As such, you need to extend the Request interface to create
 * a new IRequest type that defines the user property, which is an interface
 * that defines the properties you expect to have in the access token.
 */
export interface IRequest extends Request {
  user?: User;
}

/**
 * RBAC Middleware Function
 */

export const checkPermissions = (permissions: string | string[]) => {
  return (request: IRequest, response: Response, next: NextFunction) => {
    if (!permissions) {
      next();
    }

    const { user } = request;

    if (!user) {
      next(new HttpException(403, "Unauthorized"));
    }

    if (user) {
      if (!user.permissions) {
        next(new HttpException(403, "Unauthorized"));
      }

      const { permissions: userPermissions } = user;

      // fastest way to handle data uniqueness in JavaScript is through sets
      const userPermissionsSet = new Set(userPermissions);

      let endpointPermissionsSet = Array.isArray(permissions)
        ? new Set(permissions)
        : new Set([permissions]);

      if (endpointPermissionsSet.size > userPermissionsSet.size) {
        next(new HttpException(403, "Unauthorized"));
      }

      for (const perm of Array.from(endpointPermissionsSet)) {
        if (!userPermissionsSet.has(perm)) {
          next(new HttpException(403, "Unauthorized"));
        }
      }

      next();
    }
  };
};
