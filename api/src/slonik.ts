import { createPool, createTypeParserPreset, DatabasePool } from "slonik";
import config from "./config";

export const pool: DatabasePool = createPool(config.db.uri, {
  typeParsers: [...createTypeParserPreset()],
});
