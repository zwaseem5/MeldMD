
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserData } from '../../hooks/useUserData';
import GameWorld from './components/GameWorld';
import CharacterCustomization from './components/CharacterCustomization';
import QuizMode from './components/QuizMode';

export default function MedGamePage() {
  const { gameProgress, loading, isAuthenticated } = useUserData();
  const navigate = useNavigate();
  const [gameMode, setGameMode] = useState<'world' | 'quiz' | 'customize'>('world');

  const handleExitToHome = () => {
    navigate('/');
  };

  // Data loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading your progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-blue-300 to-purple-300">
      {gameMode === 'world' && <GameWorld onModeChange={setGameMode} />}
      {gameMode === 'quiz' && <QuizMode onModeChange={setGameMode} />}
      {gameMode === 'customize' && <CharacterCustomization onModeChange={setGameMode} />}
    </div>
  );
}
