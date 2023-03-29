import { z } from "zod";

export const isValidAge = z.coerce.number().gte(0).lte(150);

export const isValidHeartRate = z.coerce.number().gte(0).lte(300);
