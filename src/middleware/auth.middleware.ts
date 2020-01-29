import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * When you call the checkJwt function, it invokes the jwt function, which
 * verifies that any JSON Web Token (JWT) present in the request payload to
 * authorize the request is well-formed and valid
 */
export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    /**
     * To obtain the secret, you need to do some additional work: you use the
     * expressJwtSecret helper function from the jwks-rsa library to query
     * the JSON Web Key Set (JWKS) endpoint of your Auth0 tenant.
     */
    jwksUri: `${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `${process.env.AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});
