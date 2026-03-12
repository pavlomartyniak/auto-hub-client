import { Option } from "@/types/option";

export const findOptionLabel = (
  options: Option[],
  optionValue: string,
): string => {
  const option = options.find((o) => o.value === optionValue);
  return option?.label ?? optionValue;
};
