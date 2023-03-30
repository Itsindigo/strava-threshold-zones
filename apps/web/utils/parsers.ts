export const emptyStringIsUndefined = (s: unknown) =>
  typeof s === "string" && s.length > 0 ? s : undefined;

export const safeJsonParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
};
