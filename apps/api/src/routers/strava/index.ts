import { Context, Next } from "koa";
import Router from "koa-router";
import { authorizeAndSaveUser } from "../../services/strava";

export const router = new Router({ prefix: "/strava" });

type StravaCallbackQueryParams = { code?: string };

router.get("/callback", async (ctx: Context, next: Next) => {
  const { code } = ctx.request.query as StravaCallbackQueryParams;

  if (!code) {
    ctx.status = 400;
    ctx.message = "Could not extract code from callback";
    return;
  }

  const user = await authorizeAndSaveUser(code);
  ctx.status = 200;
  ctx.response.body = {
    ...user,
  };
});
