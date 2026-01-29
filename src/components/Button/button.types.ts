import { buttonStyles } from "./button.styles";

type ButtonVariant = keyof typeof buttonStyles.variants;
type ButtonSize = keyof typeof buttonStyles.sizes;

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  BaseProps & {
    loading?: boolean;
    loadingText?: string;
    ref?: React.Ref<HTMLButtonElement>;
    as?: "button";
  };

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  BaseProps & {
    href: string;
    ref?: React.Ref<HTMLAnchorElement>;
    as: "a";
  };

export type ButtonOrLinkProps = ButtonProps | LinkProps;
