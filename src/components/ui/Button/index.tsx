import React from 'react';

type ButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset' | undefined;
  variant?: string;
  disabled?: boolean;
};
const Button = (props: ButtonProps) => {
  const { onClick, children, variant, type, disabled } = props;
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`${variant} text-white p-2 rounded-md`}>
      {children}
    </button>
  );
};

export default Button;
