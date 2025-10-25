
import React from 'react';

interface GameArea {
  id: string;
  name: string;
  type: 'supplier' | 'clinic' | 'gym' | 'social' | 'telehealth' | 'quiz';
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  icon: string;
}

interface PlayerPosition {
  x: number;
  y: number;
}

interface GameMapProps {
  areas: GameArea[];
  playerPosition: PlayerPosition;
}

export default function GameMap({ areas, playerPosition }: GameMapProps) {
  const getAreaColor = (type: string) => {
    switch (type) {
      case 'supplier': return 'bg-blue-200 border-blue-400';
      case 'clinic': return 'bg-green-200 border-green-400';
      case 'telehealth': return 'bg-purple-200 border-purple-400';
      case 'gym': return 'bg-red-200 border-red-400';
      case 'social': return 'bg-yellow-200 border-yellow-400';
      case 'quiz': return 'bg-indigo-200 border-indigo-400';
      default: return 'bg-gray-200 border-gray-400';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Trees and decorations */}
        <div className="absolute top-20 left-20 w-8 h-8 bg-green-600 rounded-full"></div>
        <div className="absolute top-40 right-40 w-6 h-6 bg-green-500 rounded-full"></div>
        <div className="absolute bottom-40 left-60 w-10 h-10 bg-green-700 rounded-full"></div>
        <div className="absolute bottom-60 right-80 w-7 h-7 bg-green-600 rounded-full"></div>
        
        {/* Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 200 200 Q 400 150 600 250 Q 500 350 300 380"
            stroke="#8B7355"
            strokeWidth="8"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M 150 100 Q 350 200 550 150 Q 400 300 200 350"
            stroke="#8B7355"
            strokeWidth="6"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Game Areas */}
      {areas.map(area => (
        <div
          key={area.id}
          className={`absolute rounded-lg border-2 ${getAreaColor(area.type)} shadow-lg transition-all duration-300 hover:shadow-xl`}
          style={{
            left: `${area.x}px`,
            top: `${area.y}px`,
            width: `${area.width}px`,
            height: `${area.height}px`
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-2 text-center">
            <i className={`${area.icon} text-2xl mb-1 text-gray-700`}></i>
            <h3 className="text-xs font-semibold text-gray-800 leading-tight">{area.name}</h3>
          </div>
          
          {/* Area entrance indicator */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-white border border-gray-300 rounded-b-lg"></div>
        </div>
      ))}

      {/* Mini-map */}
      <div className="absolute top-20 right-4 w-32 h-24 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-300 p-2">
        <div className="relative w-full h-full bg-green-50 rounded">
          {/* Mini areas */}
          {areas.map(area => (
            <div
              key={`mini-${area.id}`}
              className={`absolute rounded-sm ${getAreaColor(area.type).split(' ')[0]} opacity-70`}
              style={{
                left: `${(area.x / 800) * 100}%`,
                top: `${(area.y / 500) * 100}%`,
                width: `${(area.width / 800) * 100}%`,
                height: `${(area.height / 500) * 100}%`
              }}
            ></div>
          ))}
          
          {/* Mini player */}
          <div
            className="absolute w-1 h-1 bg-red-600 rounded-full"
            style={{
              left: `${(playerPosition.x / 800) * 100}%`,
              top: `${(playerPosition.y / 500) * 100}%`
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
