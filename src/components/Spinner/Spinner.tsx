import { cn } from "../../utils/cn";
import { buttonStyles } from "../Button/button.styles";
type SpinnerProps = {
  className?: string;
  size?: keyof typeof buttonStyles.sizes;
};

const sizeClasses = {
  sm: "w-3 h-3 border-2",
  md: "w-4 h-4 border-2",
  lg: "w-5 h-5 border-[3px]",
};

export const Spinner = ({ className, size = "md" }: SpinnerProps) => {
  return (
    <div
      className={cn(
        "inline-block rounded-full border-solid border-current border-r-transparent align-[-0.125em] animate-spin motion-reduce:animate-[spin_1.5s_linear_infinite]",
        sizeClasses[size],
        className,
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};
