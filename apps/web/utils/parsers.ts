export const emptyStringIsUndefined = (s: unknown) =>
  typeof s === "string" && s.length > 0 ? s : undefined;
