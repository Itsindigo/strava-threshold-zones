import { SlonikMigrator } from "@slonik/migrator";
import { createPool } from "slonik";

// in an existing slonik project, this would usually be setup in another module
import dotenv from "dotenv";
import env from "env-var";

dotenv.config(
  process.env.NODE_ENV === "test"
    ? { path: `${__dirname}/../test.env` }
    : undefined
);

const getDbUri = (): string => {
  const user = env.get("DB_USER").required().asString();
  const password = env.get("DB_PASSWORD").required().asString();
  const host = env.get("DB_HOST").required().asString();
  const post = env.get("DB_PORT").required().asString();
  const name = env.get("DB_NAME").required().asString();
  return `postgres://${user}:${password}@${host}:${post}/${name}`;
};

const slonik = createPool(getDbUri()); // e.g. 'postgresql://postgres:postgres@localhost:5433/postgres'

const migrator = new SlonikMigrator({
  migrationsPath: __dirname + "/migrations",
  migrationTableName: "migration",
  slonik,
  logger: console,
});

migrator.runAsCLI();
