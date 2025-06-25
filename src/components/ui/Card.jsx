import React from "react";

export const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
