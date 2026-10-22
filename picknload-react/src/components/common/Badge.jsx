import React from "react";

export const Badge = ({
  children,
  variant = "neutral", // "success" | "warning" | "error" | "neutral" | "primary"
  size = "sm", // "sm" | "md"
  icon,
  className = "",
}) => {
  const variantStyles = {
    success: "bg-tertiary-container/30 text-tertiary border border-tertiary/20",
    warning: "bg-primary-fixed text-on-primary-fixed border border-primary-container/30",
    error: "bg-error-container text-on-error-container border border-error/20",
    neutral: "bg-surface-container-low text-secondary border border-outline-variant/40",
    primary: "bg-primary-container text-on-primary-container font-semibold",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-label-sm rounded-full gap-1",
    md: "px-2.5 py-1 text-label-md rounded-lg gap-1.5",
  };

  return (
    <span
      className={`inline-flex items-center font-medium ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && (
        <span
          className="material-symbols-outlined text-[14px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      )}
      {children}
    </span>
  );
};
