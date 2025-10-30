import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
};