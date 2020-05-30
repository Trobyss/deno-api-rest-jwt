import { Context, Status } from "https://deno.land/x/oak/mod.ts";

export function BadRequest(ctx: Context<any>) {
  ctx.response.status = Status.BadRequest;
  ctx.response.body = { message: "Wrong params" };
  return;
}
