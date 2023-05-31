import React, { InputHTMLAttributes } from "react";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

const TextInput: React.FC<TextInputProps> = ({ className = "", ...props }) => {
  return (
    <input
      className={`w-full border-gray-300 mb-4 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ring-2 ring-gray-300 ${className}`}
      {...props}
    />
  );
};

export default TextInput;
