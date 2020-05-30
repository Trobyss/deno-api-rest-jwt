import { Context, Status } from "https://deno.land/x/oak/mod.ts";

export function NotFound(ctx: Context<any>) {
  ctx.response.status = Status.NotFound;
  ctx.response.body = { message: "Not found" };
  return;
}
