
import { useEffect, useState } from 'react';

interface PlayerCharacterProps {
  position: { x: number; y: number };
  avatar: string;
}

export default function PlayerCharacter({ position, avatar }: PlayerCharacterProps) {
  const [isMoving, setIsMoving] = useState(false);
  const [lastPosition, setLastPosition] = useState(position);

  useEffect(() => {
    if (position.x !== lastPosition.x || position.y !== lastPosition.y) {
      setIsMoving(true);
      setLastPosition(position);
      
      const timer = setTimeout(() => {
        setIsMoving(false);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [position, lastPosition]);

  const getCharacterEmoji = () => {
    switch (avatar) {
      case 'doctor-female':
        return '👩‍⚕️';
      case 'doctor-male':
        return '👨‍⚕️';
      case 'nurse-female':
        return '👩‍⚕️';
      case 'nurse-male':
        return '👨‍⚕️';
      default:
        return '👨‍⚕️';
    }
  };

  return (
    <div
      className="absolute transition-all duration-200 ease-out z-40"
      style={{
        left: `${position.x - 20}px`,
        top: `${position.y + 80}px`,
        transform: isMoving ? 'scale(1.1)' : 'scale(1)'
      }}
    >
      <div className="relative">
        {/* Character Shadow */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-black/20 rounded-full"></div>
        
        {/* Main Character */}
        <div className={`text-5xl transition-all duration-200 ${isMoving ? 'animate-bounce' : ''}`}>
          {getCharacterEmoji()}
        </div>
        
        {/* Character Name Tag */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap font-bold shadow-lg">
          You
        </div>
        
        {/* Movement Indicator */}
        {isMoving && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.1s'}}></div>
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        )}
        
        {/* Cute Bobble Head Effect */}
        <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
          <div className={`w-2 h-2 bg-pink-400 rounded-full ${isMoving ? 'animate-pulse' : ''}`}></div>
        </div>
      </div>
    </div>
  );
}
