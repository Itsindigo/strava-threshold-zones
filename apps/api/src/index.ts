import Koa from "koa";
import bodyParser from "koa-bodyparser";

import config from "./config";
config;

import { router as stravaRouter } from "./routers/strava";

const port = 8000;
const app = new Koa();

app.use(bodyParser({}));

app.use(stravaRouter.routes());

app.listen(port);
console.log(`Listening on port ${port}`);
