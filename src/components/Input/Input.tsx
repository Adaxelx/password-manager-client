import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  className?: string;
  label?: string;
  htmlFor?: string;
}

const Input = ({
  onChange,
  className,
  label,
  htmlFor,
  ...rest
}: InputProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
  };
  return (
    <div className="flex flex-col items-start">
      {label && (
        <label
          htmlFor={htmlFor || label}
          className="text-2xl text-text-base font-medium"
        >
          {label}
        </label>
      )}
      <input
        onChange={handleChange}
        id={label ? label : ""}
        {...rest}
        className={`bg-background rounded-full h-12 text-text-base px-4 border border-black border-solid  ${className}`}
      />
    </div>
  );
};

export default Input;
