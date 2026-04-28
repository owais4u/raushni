import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  children,
  variant = "secondary",
  loading = false,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  const variantClass =
    variant === "primary"
      ? "bg-primary-600 text-white"
      : "bg-gray-200 text-gray-900";

  return (
    <button
      type="button"
      className={`rounded px-4 py-2 ${variantClass} ${className}`.trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;
