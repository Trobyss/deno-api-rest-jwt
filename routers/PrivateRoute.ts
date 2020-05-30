import { Router, Status } from "https://deno.land/x/oak/mod.ts";
import { jwtAuth } from "../middlewares/jwt.ts";

export function PrivateRoutes(router: Router) {
  return router.get("/private", jwtAuth, async (ctx) => {
    ctx.response.status = Status.OK;
    ctx.response.body = { message: "Connected !" };
  });
}
