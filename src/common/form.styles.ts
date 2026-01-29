export const formStyles = {
  base: `
    block w-full rounded-lg border border-gray-300
    bg-transparent font-medium text-gray-900
    transition
    focus:outline-none focus:border-blue-600
    disabled:opacity-50 disabled:cursor-not-allowed
  `,
  label: "mb-1 block text-sm font-medium text-gray-700",
  inputError: "border-red-500 focus:border-red-500",
  error: "mt-1 text-xs text-red-600 font-medium",
  sizes: {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-5 text-lg",
  },
};
