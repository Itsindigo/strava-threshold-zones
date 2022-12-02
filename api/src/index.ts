import Koa from "koa";
import bodyParser from "koa-bodyparser";

import config from "./config";
config;
// import pino from "koa-pino-logger";

import { router as stravaRouter } from "./routers/strava";
import { router as spotifyRouter } from "./routers/spotify";
import { router as twitterRouter } from "./routers/twitter";

const port = 8000;
const app = new Koa();

// app.use(pino());
app.use(bodyParser({}));

app
  .use(stravaRouter.routes())
  .use(spotifyRouter.routes())
  .use(spotifyRouter.allowedMethods())
  .use(twitterRouter.routes())
  .use(twitterRouter.allowedMethods());

app.listen(port);
console.log(`Listening on port ${port}`);
