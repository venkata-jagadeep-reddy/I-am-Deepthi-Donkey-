import React from "react";

export const Button = ({
  children,
  variant = "primary", // "primary" | "secondary" | "destructive" | "outline" | "ghost"
  size = "md", // "sm" | "md" | "lg"
  fullWidth = false,
  loading = false,
  disabled = false,
  icon,
  className = "",
  onClick,
  type = "button",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 active:scale-[0.99] focus:outline-none select-none disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "h-9 px-3 text-label-sm gap-1.5",
    md: "min-h-[48px] px-4 text-body-md-medium gap-2",
    lg: "min-h-[52px] px-5 text-body-lg-bold gap-2 text-[16px]",
  };

  const variantStyles = {
    primary:
      "bg-primary-container hover:brightness-95 text-on-primary-container shadow-sm border border-transparent font-semibold",
    secondary:
      "bg-surface-container-lowest hover:bg-surface-container-low text-on-surface border border-outline-variant/60 shadow-sm",
    destructive:
      "bg-error hover:bg-error/90 text-on-error shadow-sm",
    destructiveOutline:
      "bg-surface-container-lowest hover:bg-error-container text-error border border-error shadow-sm",
    outline:
      "bg-transparent hover:bg-surface-container-low text-on-surface border border-outline-variant/60",
    ghost:
      "bg-transparent hover:bg-surface-container-low text-secondary hover:text-on-surface",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${sizeStyles[size] || sizeStyles.md}
        ${variantStyles[variant] || variantStyles.primary}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      ) : icon ? (
        <span className="material-symbols-outlined text-[20px]">{icon}</span>
      ) : null}
      {children}
    </button>
  );
};
