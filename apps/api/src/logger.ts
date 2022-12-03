import pino from "pino";

export const logger = pino({
  messageKey: "message",
  prettyPrint: true,
});
