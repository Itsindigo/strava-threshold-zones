import { z } from "zod";
import { emptyStringIsUndefined } from "../../utils";
import { ERROR_AGE_MESSAGE, ERROR_HEART_RATE_MESSAGE } from "./constants";
import { IZoneCalculatorConstructor, ZoneCalculator, Range } from "./types";

/**
 * zod parses an empty string to zero which erroneuously
 * passes the number check.
 *
 * To avoid this preprocess empty strings to be undefined
 * instead, which then fail the validation as intended.
 */
export const isValidAge = z.preprocess(
  (val) => emptyStringIsUndefined(val),
  z.coerce
    .number({ invalid_type_error: ERROR_AGE_MESSAGE })
    .gte(1, { message: ERROR_AGE_MESSAGE })
    .lte(150, { message: ERROR_AGE_MESSAGE })
);

export const isValidHeartRate = z.preprocess(
  (val) => emptyStringIsUndefined(val),
  z.coerce
    .number({ invalid_type_error: ERROR_HEART_RATE_MESSAGE })
    .gte(1, { message: ERROR_HEART_RATE_MESSAGE })
    .lte(300, { message: ERROR_HEART_RATE_MESSAGE })
);

export const validateFormData = z.object({
  age: isValidAge,
  restingHeartRate: isValidHeartRate,
  maxHeartRate: isValidHeartRate,
});
