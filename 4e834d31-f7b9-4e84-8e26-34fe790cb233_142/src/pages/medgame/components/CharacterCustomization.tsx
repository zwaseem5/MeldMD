
import { useState, useEffect } from 'react';
import { useUserData } from '../../../hooks/useUserData';

interface CharacterCustomizationProps {
  onModeChange?: (mode: 'world' | 'quiz' | 'customize') => void;
  isOpen?: boolean;
  onClose?: () => void;
  onComplete?: (characterData: any) => void;
}

interface CharacterData {
  gender: 'male' | 'female';
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  outfit: string;
  accessory: string;
  name: string;
}

const skinTones = [
  { id: 'light', name: 'Light', color: '#FDBCB4' },
  { id: 'medium-light', name: 'Medium Light', color: '#E0AC69' },
  { id: 'medium', name: 'Medium', color: '#C68642' },
  { id: 'medium-dark', name: 'Medium Dark', color: '#8D5524' },
  { id: 'dark', name: 'Dark', color: '#654321' }
];

const hairStyles = [
  { id: 'short', name: 'Short & Professional', emoji: '👨‍⚕️' },
  { id: 'medium', name: 'Medium Length', emoji: '👩‍⚕️' },
  { id: 'long', name: 'Long & Styled', emoji: '👩‍🦰' },
  { id: 'curly', name: 'Curly', emoji: '👨‍🦱' },
  { id: 'wavy', name: 'Wavy', emoji: '👩‍🦳' },
  { id: 'bald', name: 'Bald/Very Short', emoji: '👨‍🦲' }
];

const hairColors = [
  { id: 'black', name: 'Black', color: '#000000' },
  { id: 'brown', name: 'Brown', color: '#8B4513' },
  { id: 'blonde', name: 'Blonde', color: '#DAA520' },
  { id: 'red', name: 'Red', color: '#DC143C' },
  { id: 'gray', name: 'Gray', color: '#808080' },
  { id: 'white', name: 'White', color: '#F5F5F5' }
];

const outfits = [
  { id: 'scrubs-blue', name: 'Blue Scrubs', emoji: '👨‍⚕️', color: '#4A90E2' },
  { id: 'scrubs-green', name: 'Green Scrubs', emoji: '👩‍⚕️', color: '#7ED321' },
  { id: 'lab-coat', name: 'White Lab Coat', emoji: '🥼', color: '#FFFFFF' },
  { id: 'surgeon', name: 'Surgical Gown', emoji: '⚕️', color: '#50E3C2' },
  { id: 'casual', name: 'Casual Wear', emoji: '👔', color: '#BD10E0' },
  { id: 'formal', name: 'Formal Attire', emoji: '🤵', color: '#9013FE' }
];

const accessories = [
  { id: 'stethoscope', name: 'Stethoscope', emoji: '🩺' },
  { id: 'glasses', name: 'Glasses', emoji: '👓' },
  { id: 'mask', name: 'Medical Mask', emoji: '😷' },
  { id: 'cap', name: 'Medical Cap', emoji: '👨‍⚕️' },
  { id: 'badge', name: 'ID Badge', emoji: '🏷️' },
  { id: 'none', name: 'None', emoji: '✨' }
];

export default function CharacterCustomization({ 
  onModeChange, 
  isOpen = true, 
  onClose, 
  onComplete 
}: CharacterCustomizationProps) {
  const { gameProgress, updateCharacter, isAuthenticated } = useUserData();
  const [characterData, setCharacterData] = useState<CharacterData>({
    gender: 'female',
    skinTone: 'medium',
    hairStyle: 'medium',
    hairColor: 'brown',
    outfit: 'scrubs-blue',
    accessory: 'stethoscope',
    name: gameProgress?.character_name || 'Dr. Player'
  });

  const [activeTab, setActiveTab] = useState<'basic' | 'style' | 'outfit' | 'final'>('basic');
  const [isSaving, setIsSaving] = useState(false);

  // Load existing character data
  useEffect(() => {
    if (gameProgress) {
      setCharacterData(prev => ({
        ...prev,
        name: gameProgress.character_name || 'Dr. Player',
        gender: gameProgress.character_avatar?.includes('female') ? 'female' : 'male'
      }));
    }
  }, [gameProgress]);

  const handleSaveCharacter = async () => {
    if (!isAuthenticated) {
      alert('Please sign in to save your character!');
      return;
    }

    setIsSaving(true);
    try {
      const avatarId = `doctor-${characterData.gender}-${characterData.skinTone}-${characterData.hairStyle}`;
      await updateCharacter(characterData.name, avatarId);
      
      if (onComplete) {
        onComplete(characterData);
      } else if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error('Error saving character:', error);
      alert('Failed to save character. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const getCharacterPreview = () => {
    const baseEmoji = characterData.gender === 'female' ? '👩' : '👨';
    const professionEmoji = characterData.gender === 'female' ? '👩‍⚕️' : '👨‍⚕️';
    
    switch (characterData.outfit) {
      case 'scrubs-blue':
      case 'scrubs-green':
      case 'lab-coat':
      case 'surgeon':
        return professionEmoji;
      case 'casual':
        return characterData.gender === 'female' ? '👩‍💼' : '👨‍💼';
      case 'formal':
        return characterData.gender === 'female' ? '👩‍💼' : '🤵';
      default:
        return professionEmoji;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-blue-400 z-[9999] overflow-y-auto">
      <div className="min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">🎨 Character Creator</h1>
            <div className="flex space-x-4">
              {onClose && (
                <button
                  onClick={onClose}
                  className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 whitespace-nowrap shadow-lg backdrop-blur-sm border border-white/30 cursor-pointer"
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Character Preview */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-white/50 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Character Preview</h2>
                
                <div className="text-center mb-6">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-8xl border-4 border-white shadow-xl mb-4">
                    {getCharacterPreview()}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{characterData.name}</h3>
                  <p className="text-gray-600 capitalize">{characterData.gender} • {characterData.skinTone.replace('-', ' ')} skin</p>
                </div>

                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Hair Style:</span>
                      <span className="text-sm font-bold text-blue-600 capitalize">{characterData.hairStyle}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Hair Color:</span>
                      <span className="text-sm font-bold text-purple-600 capitalize">{characterData.hairColor}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Outfit:</span>
                      <span className="text-sm font-bold text-green-600">{outfits.find(o => o.id === characterData.outfit)?.name}</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Accessory:</span>
                      <span className="text-sm font-bold text-yellow-600">{accessories.find(a => a.id === characterData.accessory)?.name}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSaveCharacter}
                  disabled={isSaving}
                  className="w-full mt-6 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 whitespace-nowrap shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? '💾 Saving...' : '💾 Save & Return to Game'}
                </button>
              </div>
            </div>

            {/* Customization Panel */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50">
                {/* Tabs */}
                <div className="flex bg-gray-100 rounded-t-3xl p-2">
                  {[
                    { id: 'basic', name: 'Basic Info', emoji: '📝' },
                    { id: 'style', name: 'Appearance', emoji: '💄' },
                    { id: 'outfit', name: 'Outfit', emoji: '👕' },
                    { id: 'final', name: 'Finish', emoji: '✨' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 px-4 py-3 rounded-xl font-bold text-sm transition-all whitespace-nowrap cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-teal-600 to-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-white hover:shadow-md'
                      }`}
                    >
                      <span className="mr-2">{tab.emoji}</span>
                      {tab.name}
                    </button>
                  ))}
                </div>

                <div className="p-8">
                  {/* Basic Info Tab */}
                  {activeTab === 'basic' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">👨‍⚕️ Basic Information</h3>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Character Name</label>
                            <input
                              type="text"
                              value={characterData.name}
                              onChange={(e) => setCharacterData(prev => ({ ...prev, name: e.target.value }))}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-lg font-medium"
                              placeholder="Enter your doctor name..."
                            />
                          </div>

                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Gender</label>
                            <div className="grid grid-cols-2 gap-4">
                              {[
                                { id: 'female', name: 'Female', emoji: '👩‍⚕️' },
                                { id: 'male', name: 'Male', emoji: '👨‍⚕️' }
                              ].map(gender => (
                                <button
                                  key={gender.id}
                                  onClick={() => setCharacterData(prev => ({ ...prev, gender: gender.id as 'male' | 'female' }))}
                                  className={`p-6 rounded-2xl border-3 font-bold text-lg transition-all transform hover:scale-105 cursor-pointer ${
                                    characterData.gender === gender.id
                                      ? 'border-teal-500 bg-teal-50 text-teal-700 shadow-lg'
                                      : 'border-gray-300 bg-white text-gray-700 hover:border-teal-300 hover:bg-teal-50'
                                  }`}
                                >
                                  <div className="text-4xl mb-2">{gender.emoji}</div>
                                  {gender.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Skin Tone</label>
                            <div className="grid grid-cols-5 gap-3">
                              {skinTones.map(tone => (
                                <button
                                  key={tone.id}
                                  onClick={() => setCharacterData(prev => ({ ...prev, skinTone: tone.id }))}
                                  className={`p-4 rounded-xl border-3 font-bold text-sm transition-all transform hover:scale-105 cursor-pointer ${
                                    characterData.skinTone === tone.id
                                      ? 'border-teal-500 shadow-lg'
                                      : 'border-gray-300 hover:border-teal-300'
                                  }`}
                                  style={{ backgroundColor: tone.color }}
                                >
                                  <div className="h-8 w-full rounded-lg mb-2" style={{ backgroundColor: tone.color }}></div>
                                  <div className="text-xs text-gray-800">{tone.name}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Appearance Tab */}
                  {activeTab === 'style' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">💄 Hair & Style</h3>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Hair Style</label>
                            <div className="grid grid-cols-3 gap-4">
                              {hairStyles.map(style => (
                                <button
                                  key={style.id}
                                  onClick={() => setCharacterData(prev => ({ ...prev, hairStyle: style.id }))}
                                  className={`p-4 rounded-2xl border-3 font-bold text-sm transition-all transform hover:scale-105 cursor-pointer ${
                                    characterData.hairStyle === style.id
                                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                                  }`}
                                >
                                  <div className="text-3xl mb-2">{style.emoji}</div>
                                  {style.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Hair Color</label>
                            <div className="grid grid-cols-6 gap-3">
                              {hairColors.map(color => (
                                <button
                                  key={color.id}
                                  onClick={() => setCharacterData(prev => ({ ...prev, hairColor: color.id }))}
                                  className={`p-3 rounded-xl border-3 font-bold text-xs transition-all transform hover:scale-105 cursor-pointer ${
                                    characterData.hairColor === color.id
                                      ? 'border-purple-500 shadow-lg'
                                      : 'border-gray-300 hover:border-purple-300'
                                  }`}
                                >
                                  <div className="h-8 w-full rounded-lg mb-2" style={{ backgroundColor: color.color }}></div>
                                  {color.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Outfit Tab */}
                  {activeTab === 'outfit' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">👕 Outfit & Accessories</h3>
                        
                        <div className="space-y-6">
                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Medical Outfit</label>
                            <div className="grid grid-cols-3 gap-4">
                              {outfits.map(outfit => (
                                <button
                                  key={outfit.id}
                                  onClick={() => setCharacterData(prev => ({ ...prev, outfit: outfit.id }))}
                                  className={`p-4 rounded-2xl border-3 font-bold text-sm transition-all transform hover:scale-105 cursor-pointer ${
                                    characterData.outfit === outfit.id
                                      ? 'border-green-500 bg-green-50 text-green-700 shadow-lg'
                                      : 'border-gray-300 bg-white text-gray-700 hover:border-green-300 hover:bg-green-50'
                                  }`}
                                >
                                  <div className="text-3xl mb-2">{outfit.emoji}</div>
                                  {outfit.name}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div>
                            <label className="block text-lg font-medium text-gray-700 mb-3">Accessory</label>
                            <div className="grid grid-cols-3 gap-4">
                              {accessories.map(accessory => (
                                <button
                                  key={accessory.id}
                                  onClick={() => setCharacterData(prev => ({ ...prev, accessory: accessory.id }))}
                                  className={`p-4 rounded-2xl border-3 font-bold text-sm transition-all transform hover:scale-105 cursor-pointer ${
                                    characterData.accessory === accessory.id
                                      ? 'border-yellow-500 bg-yellow-50 text-yellow-700 shadow-lg'
                                      : 'border-gray-300 bg-white text-gray-700 hover:border-yellow-300 hover:bg-yellow-50'
                                  }`}
                                >
                                  <div className="text-3xl mb-2">{accessory.emoji}</div>
                                  {accessory.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Final Tab */}
                  {activeTab === 'final' && (
                    <div className="text-center space-y-8">
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">✨ Character Complete!</h3>
                        <p className="text-lg text-gray-600 mb-8">Your medical character is ready to save lives in MedWorld!</p>
                        
                        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 border-2 border-teal-200 mb-8">
                          <div className="text-6xl mb-4">{getCharacterPreview()}</div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{characterData.name}</h4>
                          <p className="text-gray-600">Ready to begin your medical adventure!</p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                          <button
                            onClick={() => setActiveTab('basic')}
                            className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 whitespace-nowrap shadow-xl cursor-pointer"
                          >
                            ⬅️ Edit More
                          </button>
                          <button
                            onClick={handleSaveCharacter}
                            disabled={isSaving}
                            className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-6 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 whitespace-nowrap shadow-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSaving ? '💾 Saving...' : '🚀 Start Playing!'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
