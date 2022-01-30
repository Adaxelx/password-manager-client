import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  as?: ReactNode;
  to?: string;
  className?: string;
  disabled?: boolean;
}

const Button = ({ type = "button", className = "", ...rest }: ButtonProps) => {
  return (
    <button
      className={`w-32 rounded-full h-12 px-4 bg-green-600 ${className}`}
      type={type}
      {...rest}
    />
  );
};

export default Button;
