import React from 'react';

type InputProps = {
    label: string,
    name: string,
    type: string,
}
const Input = (props: InputProps) => {
  const { label, name, type } = props;
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-600">
            {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="mt-1 p-2 border rounded-md w-full"
        required
      />
    </div>
  );
};

export default Input;
