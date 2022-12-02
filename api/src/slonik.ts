import { createPool, createTypeParserPreset } from "slonik";
import config from "./config";

export const pool = createPool(config.db.uri, {
  typeParsers: [...createTypeParserPreset()],
});
