import { type ComponentPropsWithRef } from "react";
import { inputStyles } from "./input.styles";

type InputSize = keyof typeof inputStyles.sizes;

export type InputProps = ComponentPropsWithRef<"input"> & {
  labelStyle?: string;
  label?: string;
  error?: React.ReactNode;
  size?: InputSize;
  showRequiredIndicator?: boolean;
};
