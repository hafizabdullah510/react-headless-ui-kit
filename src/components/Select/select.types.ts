import type { ComponentPropsWithRef } from "react";
import { selectStyles } from "./select.styles";
type SelectSize = keyof typeof selectStyles.sizes;

export type SelectProps<T> = Omit<
  ComponentPropsWithRef<"select">,
  "onChange" | "value" | "defaultValue"
> & {
  labelStyle?: string;
  label?: string;
  error?: React.ReactNode;
  size?: SelectSize;
  placeholder?: string;
  options: T[];
  value?: T | null;
  defaultValue?: T | null;
  showRequiredIndicator?: boolean;
  getLabel: (item: T) => string;
  getValue: (item: T) => string | number;
  getKey?: (item: T) => string | number;
  onChange?: (item: T | null) => void;
};
