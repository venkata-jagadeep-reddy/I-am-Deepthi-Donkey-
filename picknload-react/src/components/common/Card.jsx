import React from "react";

export const Card = ({
  children,
  className = "",
  onClick,
  hoverable = false,
  selected = false,
  padding = "p-space-md", // "p-4" or "p-space-lg"
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-surface-container-lowest rounded-2xl border transition-all duration-200
        ${selected ? "border-2 border-primary-container shadow-md" : "border-outline-variant/50 shadow-sm"}
        ${hoverable ? "hover:border-outline-variant hover:shadow-md cursor-pointer active:scale-[0.99]" : ""}
        ${padding}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
