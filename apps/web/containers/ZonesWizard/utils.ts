import { z } from "zod";
import { emptyStringIsUndefined } from "../../utils";

/**
 * zod parses an empty string to zero which erroneuously
 * passes the number check.
 *
 * To avoid this preprocess empty strings to be undefined
 * instead, which then fail the validation as intended.
 */
export const isValidAge = z.preprocess(
  (val) => emptyStringIsUndefined(val),
  z.coerce.number().gte(0).lte(150)
);

export const isValidHeartRate = z.preprocess(
  (val) => emptyStringIsUndefined(val),
  z.coerce.number().gte(0).lte(300)
);
