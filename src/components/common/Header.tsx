import React from 'react';
import logoImage from '../../assets/Talktic_logo.png';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  return (
    <header className={`flex items-center p-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <img 
          src={logoImage} 
          alt="TALKTIC Logo" 
          className="w-8 h-8 object-contain"
        />
      </div>
    </header>
  );
};

export default Header; 