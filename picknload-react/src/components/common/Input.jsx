import React from "react";

export const Input = ({
  label,
  error,
  helperText,
  leadingIcon,
  trailingIcon,
  className = "",
  containerClassName = "",
  id,
  type = "text",
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
      {label && (
        <label htmlFor={inputId} className="font-label-sm text-label-sm text-secondary font-medium">
          {label}
        </label>
      )}
      <div className="relative w-full flex items-center">
        {leadingIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-secondary">
            <span className="material-symbols-outlined text-[20px]">{leadingIcon}</span>
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`
            w-full min-h-[50px] rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md
            placeholder:text-secondary/70 border border-outline-variant/60 shadow-sm transition-all duration-150
            focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container
            disabled:bg-surface-container-low disabled:text-secondary/50
            ${leadingIcon ? "pl-11" : "px-space-md"}
            ${trailingIcon ? "pr-11" : "px-space-md"}
            ${error ? "border-error focus:border-error focus:ring-error" : ""}
            ${className}
          `}
          {...props}
        />
        {trailingIcon && (
          <div className="absolute right-3.5 flex items-center pointer-events-none text-secondary">
            <span className="material-symbols-outlined text-[20px]">{trailingIcon}</span>
          </div>
        )}
      </div>
      {error ? (
        <span className="font-label-sm text-label-sm text-error flex items-center gap-1 mt-0.5">
          <span className="material-symbols-outlined text-[14px]">error</span>
          {error}
        </span>
      ) : helperText ? (
        <span className="font-label-sm text-label-sm text-secondary mt-0.5">{helperText}</span>
      ) : null}
    </div>
  );
};
