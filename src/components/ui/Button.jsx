import React from "react";

export const Button = ({
  variant = "outline",
  size,
  children,
  className,
  ...props
}) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const variantClasses =
    variant === "outline"
      ? "border border-gray-300 bg-white hover:bg-gray-100"
      : "hover:bg-gray-100";
  const sizeClasses =
    size === "sm" ? "text-sm px-3 py-1" : size === "icon" ? "p-2" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
