/**
 *
 * @param startingNumber Number to enumerate up from
 * @param items array of items
 * @returns enumerateArray(5, ["a", "b", "c"]) -> { a: 5, b: 6, c: 7 }
 */
export function enumerateArray<T extends string | symbol | number>(
  startingNumber: number,
  items: T[]
): { [key: number]: T } {
  const data = {} as Record<number, T>;
  items.forEach((item, index) => {
    data[startingNumber + index] = item;
  });

  return data;
}
