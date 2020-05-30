import { Router, Status } from "https://deno.land/x/oak/mod.ts";
import { UserController } from "../controllers/UserController.ts";
import { BadRequest } from "../helpers/BadRequest.ts";
import { NotFound } from "../helpers/NotFound.ts";

const controller = new UserController();

export function UserRoutes(router: Router) {
  return router
    .get("/users", async (ctx) => {
      const users = await controller.getAll();

      if (users) {
        ctx.response.status = Status.OK;
        ctx.response.body = users;
      } else {
        ctx.response.status = Status.NotFound;
        ctx.response.body = [];
      }
      return;
    })
    .post("/login", async (ctx) => {
      if (!ctx.request.hasBody) {
        return BadRequest(ctx);
      }
      const { value } = await ctx.request.body();

      const jwt = await controller.login(value.lastName, value.password);
      if (!jwt) {
        return BadRequest(ctx);
      }

      ctx.response.status = Status.OK;
      ctx.response.body = { jwt };
    })
    .get("/user/:id", async (ctx) => {
      if (!ctx.params.id) {
        return BadRequest(ctx);
      }
      const user = await controller.getOne(ctx.params.id);
      if (user) {
        ctx.response.status = Status.OK;
        ctx.response.body = user;
        return;
      }
      return NotFound(ctx);
    })
    .post("/user", async (ctx) => {
      if (!ctx.request.hasBody) {
        return BadRequest(ctx);
      }
      const { value } = await ctx.request.body();
      const user = await controller.create(value);

      if (user) {
        ctx.response.status = Status.OK;
        ctx.response.body = user;
        return;
      }

      return NotFound(ctx);
    })
    .patch("/user/:id", async (ctx) => {
      if (!ctx.request.hasBody || !ctx.params.id) {
        return BadRequest(ctx);
      }
      const { value } = await ctx.request.body();
      const user = await controller.update(ctx.params.id, value);

      if (user) {
        ctx.response.status = Status.OK;
        ctx.response.body = user;
        return;
      }

      return NotFound(ctx);
    })
    .delete("/user/:id", async (ctx) => {
      if (!ctx.params.id) {
        return BadRequest(ctx);
      }
      await controller.delete(ctx.params.id);

      ctx.response.status = Status.OK;
      ctx.response.body = { message: "Ok" };
    });
}
