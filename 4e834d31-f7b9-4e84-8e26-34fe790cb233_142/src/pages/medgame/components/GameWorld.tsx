import { useState, useEffect, useCallback } from 'react';
import { useUserData } from '../../../hooks/useUserData';
import PlayerCharacter from './PlayerCharacter';
import ShopInterface from './ShopInterface';
import PatientDiagnosis from './PatientDiagnosis';
import CharacterCustomization from './CharacterCustomization';

interface GameWorldProps {
  onModeChange: (mode: 'world' | 'quiz' | 'customize') => void;
}

interface PlayerPosition {
  x: number;
  y: number;
}

interface GameArea {
  id: string;
  name: string;
  type: 'shop' | 'hospital' | 'pharmacy' | 'gym';
  x: number;
  y: number;
  width: number;
  height: number;
  description: string;
  emoji: string;
  color: string;
}

interface Patient {
  id: string;
  name: string;
  emoji: string;
  symptoms: string[];
  condition: string;
  difficulty: number;
  x: number;
  y: number;
  helped: boolean;
  urgency: 'low' | 'medium' | 'high';
}

// Simplified game areas - spread out city
const gameAreas: GameArea[] = [
  {
    id: 'main-hospital',
    name: 'Hospital',
    type: 'hospital',
    x: 150,
    y: 200,
    width: 200,
    height: 150,
    description: 'Help patients here',
    emoji: '🏥',
    color: '#EF4444'
  },
  {
    id: 'medical-shop',
    name: 'Medical Shop',
    type: 'shop',
    x: 500,
    y: 200,
    width: 180,
    height: 130,
    description: 'Buy medical supplies',
    emoji: '🏪',
    color: '#10B981'
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    type: 'pharmacy',
    x: 150,
    y: 450,
    width: 180,
    height: 120,
    description: 'Get medications',
    emoji: '💊',
    color: '#059669'
  },
  {
    id: 'fitness-center',
    name: 'Gym',
    type: 'gym',
    x: 500,
    y: 450,
    width: 180,
    height: 120,
    description: 'Rest and recharge',
    emoji: '💪',
    color: '#EC4899'
  }
];

const generatePatients = (): Patient[] => [
  {
    id: 'patient-1',
    name: 'Emma',
    emoji: '👧',
    symptoms: ['fever', 'cough'],
    condition: 'common cold',
    difficulty: 1,
    x: 220,
    y: 280,
    helped: false,
    urgency: 'low'
  },
  {
    id: 'patient-2',
    name: 'John',
    emoji: '👨',
    symptoms: ['chest pain', 'shortness of breath'],
    condition: 'heart attack',
    difficulty: 3,
    x: 280,
    y: 300,
    helped: false,
    urgency: 'high'
  }
];

export default function GameWorld({ onModeChange }: GameWorldProps) {
  const { gameProgress, addExperience, addCoins, helpPatient, isAuthenticated } = useUserData();
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>({ x: 400, y: 350 });
  const [currentArea, setCurrentArea] = useState<GameArea | null>(null);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [showShop, setShowShop] = useState(false);
  const [showPharmacy, setShowPharmacy] = useState(false);
  const [showGym, setShowGym] = useState(false);
  const [showPatientDiagnosis, setShowPatientDiagnosis] = useState(false);
  const [patients, setPatients] = useState<Patient[]>(generatePatients());
  const [playerStats, setPlayerStats] = useState({
    energy: 100,
    stress: 0,
    equipment: ['basic_stethoscope']
  });
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showCharacterCustomization, setShowCharacterCustomization] = useState(false);

  // Prevent space bar scrolling
  useEffect(() => {
    const preventSpaceScroll = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
      }
    };
    
    document.addEventListener('keydown', preventSpaceScroll);
    return () => document.removeEventListener('keydown', preventSpaceScroll);
  }, []);

  // WASD movement
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (!event.key) return;
    
    if (['w', 'a', 's', 'd', ' ', 'e'].includes(event.key.toLowerCase())) {
      event.preventDefault();
    }
    
    const speed = 10;
    const key = event.key.toLowerCase();
    
    setPlayerPosition(prev => {
      let newX = prev.x;
      let newY = prev.y;
      
      switch (key) {
        case 'w':
          newY = Math.max(150, prev.y - speed);
          break;
        case 's':
          newY = Math.min(600, prev.y + speed);
          break;
        case 'a':
          newX = Math.max(100, prev.x - speed);
          break;
        case 'd':
          newX = Math.min(750, prev.x + speed);
          break;
        case 'e':
        case ' ':
          if (currentArea) {
            handleAreaInteraction(currentArea);
          } else if (currentPatient) {
            handlePatientInteraction(currentPatient);
          }
          break;
        default:
          return prev;
      }
      
      return { x: newX, y: newY };
    });
  }, [currentArea, currentPatient]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Collision detection
  useEffect(() => {
    const inArea = gameAreas.find(area => 
      playerPosition.x >= area.x && 
      playerPosition.x <= area.x + area.width &&
      playerPosition.y >= area.y && 
      playerPosition.y <= area.y + area.height
    );
    
    const nearPatient = patients.find(patient => 
      !patient.helped &&
      Math.abs(playerPosition.x - patient.x) < 40 &&
      Math.abs(playerPosition.y - patient.y) < 40
    );
    
    setCurrentArea(inArea || null);
    setCurrentPatient(nearPatient || null);
  }, [playerPosition, patients]);

  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  const handleAreaInteraction = async (area: GameArea) => {
    if (!isAuthenticated) {
      addNotification('🔐 Sign in to interact!');
      return;
    }

    if (playerStats.energy < 10) {
      addNotification('😴 Too tired! Rest at the gym first.');
      return;
    }

    if (area.type === 'shop') {
      setShowShop(true);
    } else if (area.type === 'pharmacy') {
      setShowPharmacy(true);
    } else if (area.type === 'gym') {
      setShowGym(true);
    }
  };

  const handlePatientInteraction = (patient: Patient) => {
    if (!isAuthenticated) {
      addNotification('🔐 Sign in to help patients!');
      return;
    }
    
    if (playerStats.energy < 20) {
      addNotification('😴 Too tired to help patients!');
      return;
    }
    
    setShowPatientDiagnosis(true);
  };

  const handlePatientDiagnosed = async (patient: Patient, correct: boolean) => {
    if (correct) {
      const reward = patient.difficulty * 50;
      const coinReward = patient.difficulty * 30;
      
      await addExperience(reward);
      await addCoins(coinReward);
      await helpPatient();
      
      setPatients(prev => prev.map(p => 
        p.id === patient.id ? { ...p, helped: true } : p
      ));
      
      setPlayerStats(prev => ({ 
        ...prev, 
        energy: prev.energy - 20,
        stress: Math.max(0, prev.stress - 5)
      }));
      
      addNotification(`🎉 Correct! +${reward} XP, +${coinReward} coins!`);
      
      // Spawn new patient after 10 seconds
      setTimeout(() => {
        const newPatient: Patient = {
          id: `patient-${Date.now()}`,
          name: ['Anna', 'Bob', 'Carol', 'David'][Math.floor(Math.random() * 4)],
          emoji: ['👶', '👧', '👦', '👩', '👨'][Math.floor(Math.random() * 5)],
          symptoms: [['fever', 'headache'], ['cough', 'sore throat']][Math.floor(Math.random() * 2)],
          condition: ['flu', 'cold'][Math.floor(Math.random() * 2)],
          difficulty: Math.floor(Math.random() * 2) + 1,
          x: 200 + Math.random() * 100,
          y: 250 + Math.random() * 100,
          helped: false,
          urgency: ['low', 'medium'][Math.floor(Math.random() * 2)] as 'low' | 'medium'
        };
        setPatients(prev => [...prev, newPatient]);
        addNotification('🚑 New patient arrived!');
      }, 10000);
      
    } else {
      setPlayerStats(prev => ({ 
        ...prev, 
        energy: prev.energy - 15,
        stress: Math.min(100, prev.stress + 15)
      }));
      addNotification('❌ Wrong diagnosis! -15 energy, +15 stress');
    }
    setShowPatientDiagnosis(false);
  };

  const handleGymVisit = async () => {
    await addCoins(20);
    await addExperience(30);
    setPlayerStats(prev => ({ 
      ...prev, 
      energy: 100,
      stress: 0
    }));
    addNotification('💪 Fully rested! +30 XP, +20 coins');
    setShowGym(false);
  };

  const handleExitGame = () => {
    window.REACT_APP_NAVIGATE('/');
  };

  const getUrgencyColor = (urgency: Patient['urgency'] | string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500 animate-pulse';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-green-100 to-green-200 relative overflow-hidden select-none">
      {/* Character Customization - Full Screen Overlay */}
      {showCharacterCustomization && (
        <CharacterCustomization
          isOpen={showCharacterCustomization}
          onClose={() => setShowCharacterCustomization(false)}
          onComplete={() => setShowCharacterCustomization(false)}
        />
      )}

      {/* Game HUD */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 z-40 shadow-xl">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                {gameProgress.character_avatar === 'doctor-female' ? '👩‍⚕️' : '👨‍⚕️'}
              </div>
              <div>
                <div className="font-bold text-lg">Dr. {gameProgress.character_name || 'Player'}</div>
                <div className="text-sm opacity-90">Level {gameProgress.level}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Energy */}
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2">
                <span className="text-lg">⚡</span>
                <div className="w-20 h-2 bg-white/30 rounded-full">
                  <div 
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${playerStats.energy}%` }}
                  />
                </div>
                <span className="text-sm font-bold">{Math.round(playerStats.energy)}</span>
              </div>
              
              {/* Stress */}
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2">
                <span className="text-lg">😰</span>
                <div className="w-20 h-2 bg-white/30 rounded-full">
                  <div 
                    className="h-full bg-red-400 rounded-full transition-all"
                    style={{ width: `${playerStats.stress}%` }}
                  />
                </div>
                <span className="text-sm font-bold">{Math.round(playerStats.stress)}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2">
                <span className="text-lg">🪙</span>
                <span className="text-lg font-bold">{gameProgress.coins}</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-white/20 rounded-full px-3 py-2">
                <span className="text-lg">⭐</span>
                <span className="text-lg font-bold">{gameProgress.experience}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right mr-4">
              <div className="text-xl font-bold">🏥 MedWorld</div>
              <div className="text-sm opacity-90">WASD to move • SPACE to interact</div>
            </div>
            <button
              onClick={handleExitGame}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              🏠 Exit Game
            </button>
          </div>
        </div>
      </div>

      {/* Game World */}
      <div className="absolute inset-0 pt-24">
        {/* Decorations */}
        <div className="absolute top-20 left-40 text-3xl opacity-60">🌳</div>
        <div className="absolute top-32 right-60 text-2xl opacity-50">🌸</div>
        <div className="absolute bottom-32 left-30 text-3xl opacity-60">🌳</div>
        <div className="absolute bottom-48 right-40 text-2xl opacity-50">🌺</div>
      </div>

      {/* Game Areas */}
      {gameAreas.map(area => (
        <div
          key={area.id}
          className="absolute rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-4 border-white/70 hover:border-yellow-400"
          style={{
            left: `${area.x}px`,
            top: `${area.y + 100}px`,
            width: `${area.width}px`,
            height: `${area.height}px`,
            backgroundColor: area.color,
            backgroundImage: `linear-gradient(135deg, ${area.color}ee, ${area.color}cc)`
          }}
        >
          <div className="flex flex-col items-center justify-center h-full p-4 text-center text-white">
            <div className="text-5xl mb-3 drop-shadow-lg animate-bounce">{area.emoji}</div>
            <h3 className="text-lg font-bold leading-tight drop-shadow-md">{area.name}</h3>
            <p className="text-sm mt-1 opacity-90">{area.description}</p>
            {currentArea === area && (
              <div className="mt-3 text-sm bg-yellow-400 text-black px-4 py-2 rounded-full font-bold animate-pulse">
                Press SPACE
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Patients */}
      {patients.filter(p => !p.helped).map(patient => (
        <div
          key={patient.id}
          className="absolute transition-all duration-300 z-30 cursor-pointer"
          style={{
            left: `${patient.x}px`,
            top: `${patient.y + 100}px`
          }}
        >
          <div className="relative">
            <div className="text-4xl animate-bounce hover:scale-110 transition-transform">
              {patient.emoji}
            </div>
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black text-sm px-3 py-1 rounded-full whitespace-nowrap font-bold border-2 border-gray-300">
              {patient.name}
            </div>
            <div className={`absolute -bottom-2 -right-2 w-4 h-4 ${getUrgencyColor(patient.urgency)} rounded-full border-2 border-white`}></div>
            {currentPatient === patient && (
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-red-400 text-white text-sm px-3 py-1 rounded-full font-bold animate-pulse">
                Help! (SPACE)
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Player Character */}
      <PlayerCharacter 
        position={playerPosition} 
        avatar={gameProgress.character_avatar}
      />

      {/* Notifications */}
      <div className="absolute top-32 left-6 z-50 space-y-3">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-sm border-2 border-green-300 rounded-xl px-4 py-3 shadow-xl animate-slide-in-left"
          >
            <span className="text-base font-bold text-green-700">{notification}</span>
          </div>
        ))}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 left-6 z-50 flex space-x-3">
        <button
          onClick={() => setShowCharacterCustomization(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-3 rounded-xl font-bold text-base transition-all transform hover:scale-105 whitespace-nowrap flex items-center shadow-xl cursor-pointer"
        >
          <span className="text-xl mr-2">🎨</span>
          Customize Character
        </button>
        <button
          onClick={() => onModeChange('quiz')}
          className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-5 py-3 rounded-xl font-bold text-base transition-all transform hover:scale-105 whitespace-nowrap flex items-center shadow-xl cursor-pointer"
        >
          <span className="text-xl mr-2">🧠</span>
          Quiz Mode
        </button>
      </div>

      {/* Shop Interface */}
      {showShop && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 border-4 border-green-400 max-h-[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">🏪 Medical Shop</h2>
                <button
                  onClick={() => setShowShop(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl cursor-pointer"
                >
                  ✖️
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'stethoscope', name: 'Professional Stethoscope', cost: 100, xp: 20, emoji: '🩺' },
                  { id: 'thermometer', name: 'Digital Thermometer', cost: 50, xp: 10, emoji: '🌡️' },
                  { id: 'bandages', name: 'Medical Bandages', cost: 30, xp: 5, emoji: '🩹' },
                  { id: 'syringe', name: 'Medical Syringe Kit', cost: 80, xp: 15, emoji: '💉' }
                ].map(item => (
                  <div key={item.id} className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border-2 border-green-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{item.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">+{item.xp} XP</p>
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        if (gameProgress.coins >= item.cost) {
                          await addCoins(-item.cost);
                          await addExperience(item.xp);
                          setPlayerStats(prev => ({ 
                            ...prev, 
                            equipment: [...prev.equipment, item.id]
                          }));
                          addNotification(`🛒 Bought ${item.name}!`);
                          setShowShop(false);
                        } else {
                          addNotification('❌ Not enough coins!');
                        }
                      }}
                      className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                    >
                      Buy {item.cost} 🪙
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pharmacy Interface */}
      {showPharmacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 border-4 border-purple-400 max-h=[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">💊 Pharmacy</h2>
                <button
                  onClick={() => setShowPharmacy(false)}
                  className="text-gray-500 hover:text-gray-700 text-3xl cursor-pointer"
                >
                  ✖️
                </button>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'aspirin', name: 'Aspirin', cost: 20, xp: 5, emoji: '💊' },
                  { id: 'antibiotics', name: 'Antibiotics', cost: 60, xp: 15, emoji: '💊' },
                  { id: 'vitamins', name: 'Multivitamins', cost: 40, xp: 10, emoji: '💊' },
                  { id: 'painkillers', name: 'Pain Relief', cost: 35, xp: 8, emoji: '💊' }
                ].map(item => (
                  <div key={item.id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{item.emoji}</span>
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">+{item.xp} XP</p>
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        if (gameProgress.coins >= item.cost) {
                          await addCoins(-item.cost);
                          await addExperience(item.xp);
                          addNotification(`💊 Bought ${item.name}!`);
                          setShowPharmacy(false);
                        } else {
                          addNotification('❌ Not enough coins!');
                        }
                      }}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                    >
                      Buy {item.cost} 🪙
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gym Interface */}
      {showGym && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 border-4 border-pink-400">
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">💪</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Fitness Center</h2>
              <p className="text-lg text-gray-600 mb-6">Rest and recharge your energy!</p>
              
              <div className="bg-gradient-to-r from-pink-50 to-red-50 rounded-xl p-6 mb-6 border-2 border-pink-200">
                <p className="text-gray-800 font-bold mb-2">Benefits:</p>
                <ul className="text-left space-y-2">
                  <li className="flex items-center">
                    <span className="text-xl mr-2">⚡</span>
                    <span>Restore energy to 100%</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-xl mr-2">😌</span>
                    <span>Reduce stress to 0%</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-xl mr-2">⭐</span>
                    <span>Gain +30 XP</span>
                  </li>
                  <li className="flex items-center">
                    <span className="text-xl mr-2">🪙</span>
                    <span>Earn +20 coins</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowGym(false)}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGymVisit}
                  className="flex-1 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                >
                  Rest Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient Diagnosis */}
      {showPatientDiagnosis && currentPatient && (
        <PatientDiagnosis
          patient={currentPatient}
          onClose={() => setShowPatientDiagnosis(false)}
          // Wrap async handler so the prop remains () => void
          onDiagnose={(p, c) => { void handlePatientDiagnosed(p, c); }}
        />
      )}
    </div>
  );
}
