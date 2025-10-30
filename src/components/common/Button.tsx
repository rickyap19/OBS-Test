import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled,
  icon,
  fullWidth,
}) => {
  const baseClass =
    'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 active:scale-95',
    danger: 'bg-red-600 text-white hover:bg-red-700 active:scale-95',
    success: 'bg-green-600 text-white hover:bg-green-700 active:scale-95',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${
        fullWidth ? 'w-full' : ''
      }`}
    >
      {icon}
      {children}
    </button>
  );
};