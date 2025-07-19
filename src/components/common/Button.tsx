import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'gray' | 'gray-outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false
}) => {
  const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 text-40';
  
  const variantClasses = {
    primary: 'bg-custom-pink80 hover:bg-custom-pink text-white focus:ring-custom-pink',
    outline: 'border-2 border-custom-pink text-custom-pink hover:bg-custom-pink hover:text-white focus:ring-custom-pink',
    gray: 'bg-custom-gray hover:bg-gray-600 text-white focus:ring-custom-gray',
    'gray-outline': 'border-2 border-custom-gray text-custom-gray hover:bg-custom-gray hover:text-white focus:ring-custom-gray'
  };
  
  const sizeClasses = {
    xs: 'w-[260px] h-[90px]', // 250x90
    sm: 'w-[330px] h-[90px]', // 330x90
    md: 'w-[350px] h-[90px]', // 350x90
    lg: 'w-[450px] h-[90px]'  // 450x90
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 