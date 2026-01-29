import { useId, useState } from "react";
import { cn } from "../../utils/cn";
import { selectStyles } from "./select.styles";
import { type SelectProps } from "./select.types";
export function Select<TItem>(props: SelectProps<TItem>) {
  const {
    id,
    label,
    labelStyle,
    size = "md",
    options,
    getLabel,
    getValue,
    getKey,
    defaultValue,
    value,
    className,
    error,
    onChange,
    placeholder,
    required,
    showRequiredIndicator,
    ...selectProps
  } = props;
  const selectId = id || useId();
  //1- Chech if the input is controlled
  const isControlledInput = value !== undefined;
  //2- Internal State to handle Uncontrolled behavior
  const [internalValue, setInternalValue] = useState(defaultValue ?? null);
  //3- Assign value for use
  const inputValue = isControlledInput ? value : internalValue;

  if (
    import.meta.env.DEV &&
    value !== undefined &&
    defaultValue !== undefined
  ) {
    console.warn("Select should not receive both value and defaultValue");
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!value) {
      onChange?.(null);
      return;
    }
    const selectedOption = options.find(
      (item) => String(getValue(item)) === value,
    );

    if (!isControlledInput) {
      setInternalValue(selectedOption ?? null);
    }
    onChange?.(selectedOption ?? null);
  };
  return (
    <div>
      {label && (
        <label
          htmlFor={selectId}
          className={cn(selectStyles.label, labelStyle)}
        >
          {label}
          {(showRequiredIndicator || required) && (
            <span className="text-red-500 ml-0.5" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      <select
        value={inputValue === null ? "" : String(getValue(inputValue))}
        onChange={handleChange}
        className={cn(
          selectStyles.base,
          selectStyles.sizes[size],
          !!error && selectStyles.inputError,
          className,
        )}
        {...selectProps}
        aria-invalid={!!error}
        aria-describedby={error ? `${selectId}-error` : undefined}
      >
        {placeholder && <option value={""}>{placeholder}</option>}
        {options.map((item) => {
          const value = getValue(item);
          const label = getLabel(item);
          return (
            <option key={getKey?.(item) || value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && (
        <div className="mt-2" id={`${selectId}-error`} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
