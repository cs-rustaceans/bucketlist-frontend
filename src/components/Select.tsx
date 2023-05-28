import React, { InputHTMLAttributes } from "react";

type SelectElementProps = InputHTMLAttributes<HTMLSelectElement>;

const Select: React.FC<SelectElementProps> = ({ className = "", ...props }) => {
  return (
    <select
      className="w-full border-gray-300 mb-4 py-2 px-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 ring-2 ring-gray-300"
      {...props}
    />
  );
};

export default Select;
