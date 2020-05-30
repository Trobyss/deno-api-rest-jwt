import { Context, Status } from "https://deno.land/x/oak/mod.ts";
import { validateJwt } from "https://deno.land/x/djwt/validate.ts";

/**
 * Create a default configuration
 */
export const JwtConfig = {
  header: "Authorization",
  schema: "Bearer",
  secretKey: Deno.env.get("SECRET") || "",
  expirationTime: 60000,
  type: "JWT",
  alg: "HS256",
};

export async function jwtAuth(
  ctx: Context<Record<string, any>>,
  next: () => Promise<void>
) {
    // Get the token from the request
    const token = ctx.request.headers
      .get(JwtConfig.header)
      ?.replace(`${JwtConfig.schema} `, "");

    // reject request if token was not provide
    if (!token) {
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = { message: "Unauthorized" };
      return;
    }

    // check the validity of the token
    if (
      !(await validateJwt(token, JwtConfig.secretKey, { isThrowing: false }))
    ) {
      ctx.response.status = Status.Unauthorized;
      ctx.response.body = { message: "Wrong Token" };
      return;
    }

    // JWT is correct, so continue and call the private route
    next();
  }
