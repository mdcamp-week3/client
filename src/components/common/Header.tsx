import React from 'react';
import logoImage from '../../assets/TALKTIC.png';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <header className={`flex items-center p-6 ${className}`}>
      <div className="flex items-center space-x-4">
        <img 
          src={logoImage} 
          alt="TALKTIC Logo" 
          className="w-21 h-20 object-contain cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>
    </header>
  );
};

export default Header; 