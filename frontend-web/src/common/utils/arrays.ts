
export function removeFromArray<T>(array: T[], value: T): T[] {
  return array.filter((item) => item !== value);
}