import { SelectOption } from "@/types";

export function removeFromArray<T>(array: T[], value: T): T[] {
  return array.filter((item) => item !== value);
}

export function getValueOfObjectFromArray(array: SelectOption[], value: string): string | undefined {
  const foundItem = array.find((item) => item.value === value);
  return foundItem ? foundItem.label : undefined;
}