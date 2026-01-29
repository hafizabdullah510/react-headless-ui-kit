import { cn } from "../../utils/cn";
import { useId, useState } from "react";
import { inputStyles } from "./input.styles";
import { type InputProps } from "./input.types";
export const Input = (props: InputProps) => {
  const {
    label,
    id,
    labelStyle,
    className,
    onChange,
    value,
    defaultValue,
    error,
    showRequiredIndicator,
    required,
    size = "md",
    ...inputProps
  } = props;
  //1- Chech if the input is controlled
  const isControlledInput = value !== undefined;
  //2- Internal State to handle Uncontrolled behavior
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  //3- Assign value for use
  const inputValue = isControlledInput ? value : internalValue;

  if (
    import.meta.env.DEV &&
    value !== undefined &&
    defaultValue !== undefined
  ) {
    console.warn("Input should not receive both value and defaultValue");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    if (!isControlledInput) {
      setInternalValue(e.target.value);
    }
  };
  const inputId = id || useId();
  return (
    <div>
      {label && (
        <label htmlFor={inputId} className={cn(inputStyles.label, labelStyle)}>
          {label}
          {(showRequiredIndicator || required) && (
            <span className="text-red-500 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <input
        className={cn(
          inputStyles.base,
          inputStyles.sizes[size],
          !!error && inputStyles.inputError,
          className,
        )}
        id={inputId}
        onChange={handleChange}
        value={inputValue}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...inputProps}
      />
      {error && (
        <div className="mt-2" id={`${inputId}-error`} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};
