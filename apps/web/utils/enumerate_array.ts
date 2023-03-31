/**
 *
 * @param startingNumber Number to enumerate up from
 * @param items array of items
 * @returns enumerateArray(5, ["a", "b", "c"]) -> { 5: 'a', 6: 'b', 7: 'c' }
 */
export function enumerateArray<T extends string | symbol | number>(
  items: T[],
  startingNumber: number = 0
): { [key: number]: T } {
  const data = {} as Record<number, T>;
  items.forEach((item, index) => {
    data[startingNumber + index] = item;
  });

  return data;
}
