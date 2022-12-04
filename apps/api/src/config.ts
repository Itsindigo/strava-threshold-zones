import dotenv from "dotenv";
import env from "env-var";

dotenv.config(
  process.env.NODE_ENV === "test"
    ? { path: `${__dirname}/../test.env` }
    : undefined
);

const getDbUri = () => {
  const user = env.get("DB_USER").required().asString();
  const password = env.get("DB_PASSWORD").required().asString();
  const host = env.get("DB_HOST").required().asString();
  const post = env.get("DB_PORT").required().asString();
  const name = env.get("DB_NAME").required().asString();
  return `postgres://${user}:${password}@${host}:${post}/${name}`;
};

const config = {
  crypto: {
    secretKey: env.get("CRYPTO_SECRET_KEY").required().asString(),
  },
  db: {
    uri: getDbUri(),
  },
  strava: {
    clientId: env.get("STRAVA_CLIENT_ID").required().asString(),
    clientSecret: env.get("STRAVA_CLIENT_SECRET").required().asString(),
  },
};

export const TABLE_NAMES = {
  stravaUsers: "strava_users",
  stravaActivities: "strava_activities",
};

export default config;
