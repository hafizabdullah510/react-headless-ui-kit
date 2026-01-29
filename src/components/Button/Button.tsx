import { type ButtonOrLinkProps } from "./button.types";
import { buttonStyles } from "./button.styles";
import { cn } from "../../utils/cn";
import { Spinner } from "../Spinner/Spinner";
import { BUTTON_CONSTANTS } from "../../utils/constants";

export const Button = (props: ButtonOrLinkProps) => {
  const {
    size = "md",
    variant = "primary",
    className,
    children,
    leftIcon,
    rightIcon,
  } = props;
  if (props.as === "a") {
    const { as, ref, ...anchorProps } = props;
    return (
      <a
        {...anchorProps}
        className={cn(
          buttonStyles.base,
          buttonStyles.sizes[size],
          buttonStyles.variants[variant],
          className,
        )}
        ref={ref}
      >
        {leftIcon && leftIcon}
        {children}
        {rightIcon && rightIcon}
      </a>
    );
  }
  const {
    as,
    loading,
    disabled,
    loadingText,
    type = "button",
    ref,
    ...buttonProps
  } = props;
  return (
    <button
      {...buttonProps}
      aria-busy={loading || undefined}
      aria-disabled={disabled || loading || undefined}
      disabled={disabled || loading}
      className={cn(
        buttonStyles.base,
        buttonStyles.sizes[size],
        buttonStyles.variants[variant],
        (disabled || loading) && buttonStyles.disabled,
        className,
      )}
      type={type}
      ref={ref}
    >
      {loading ? (
        <>
          <Spinner size={size === "sm" ? "sm" : size === "lg" ? "md" : "sm"} />
          <span className="ml-2">
            {loadingText || BUTTON_CONSTANTS.DEFAULT_LOADING_TEXT}
          </span>
        </>
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </button>
  );
};
