
import { useState } from 'react';

interface GameArea {
  id: string;
  name: string;
  type: string;
  emoji: string;
  color: string;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  experience: number;
  emoji: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface ShopInterfaceProps {
  area: GameArea;
  onClose: () => void;
  onPurchase: (item: ShopItem) => void;
}

const shopItems: ShopItem[] = [
  {
    id: 'stethoscope',
    name: 'Digital Stethoscope',
    description: 'High-tech stethoscope with digital display and recording capabilities',
    cost: 50,
    experience: 15,
    emoji: '🩺',
    category: 'diagnostic',
    rarity: 'common'
  },
  {
    id: 'thermometer',
    name: 'Infrared Thermometer',
    description: 'Non-contact thermometer for quick temperature readings',
    cost: 25,
    experience: 10,
    emoji: '🌡️',
    category: 'diagnostic',
    rarity: 'common'
  },
  {
    id: 'syringe',
    name: 'Safety Syringe Set',
    description: 'Pack of 10 safety syringes with retractable needles',
    cost: 30,
    experience: 8,
    emoji: '💉',
    category: 'supplies',
    rarity: 'common'
  },
  {
    id: 'bandages',
    name: 'Medical Bandage Kit',
    description: 'Complete bandage kit with various sizes and types',
    cost: 20,
    experience: 5,
    emoji: '🩹',
    category: 'supplies',
    rarity: 'common'
  },
  {
    id: 'ultrasound',
    name: 'Portable Ultrasound',
    description: 'Compact ultrasound device for bedside diagnostics',
    cost: 200,
    experience: 50,
    emoji: '📱',
    category: 'equipment',
    rarity: 'rare'
  },
  {
    id: 'defibrillator',
    name: 'AED Defibrillator',
    description: 'Automated external defibrillator for emergency situations',
    cost: 500,
    experience: 100,
    emoji: '⚡',
    category: 'equipment',
    rarity: 'epic'
  },
  {
    id: 'microscope',
    name: 'Digital Microscope',
    description: 'High-resolution microscope with digital imaging',
    cost: 300,
    experience: 75,
    emoji: '🔬',
    category: 'lab',
    rarity: 'rare'
  },
  {
    id: 'xray',
    name: 'Portable X-Ray',
    description: 'Mobile X-ray machine for bedside imaging',
    cost: 1000,
    experience: 200,
    emoji: '🦴',
    category: 'imaging',
    rarity: 'legendary'
  }
];

export default function ShopInterface({ area, onClose, onPurchase }: ShopInterfaceProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<ShopItem | null>(null);

  const categories = [
    { id: 'all', name: 'All Items', emoji: '🛒' },
    { id: 'diagnostic', name: 'Diagnostic', emoji: '🩺' },
    { id: 'supplies', name: 'Supplies', emoji: '💉' },
    { id: 'equipment', name: 'Equipment', emoji: '⚡' },
    { id: 'lab', name: 'Laboratory', emoji: '🔬' },
    { id: 'imaging', name: 'Imaging', emoji: '🦴' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? shopItems 
    : shopItems.filter(item => item.category === selectedCategory);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50';
      case 'rare': return 'border-blue-300 bg-blue-50';
      case 'epic': return 'border-purple-300 bg-purple-50';
      case 'legendary': return 'border-yellow-300 bg-yellow-50';
      default: return 'border-gray-300 bg-gray-50';
    }
  };

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case 'common': return { text: 'Common', color: 'bg-gray-500' };
      case 'rare': return { text: 'Rare', color: 'bg-blue-500' };
      case 'epic': return { text: 'Epic', color: 'bg-purple-500' };
      case 'legendary': return { text: 'Legendary', color: 'bg-yellow-500' };
      default: return { text: 'Common', color: 'bg-gray-500' };
    }
  };

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto border-4 border-blue-400">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl font-bold text-gray-900 flex items-center">
              <span className="text-5xl mr-4">{area.emoji}</span>
              {area.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-4xl transition-colors"
            >
              ✖️
            </button>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-2">📂</span>
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all transform hover:scale-105 ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 border-2 border-blue-400 shadow-lg'
                        : 'bg-gray-50 border-2 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg mr-2">{category.emoji}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Cute Shop Keeper */}
              <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 border-2 border-green-200">
                <div className="text-center">
                  <div className="text-4xl mb-2">👨‍💼</div>
                  <h4 className="font-bold text-gray-900 mb-1">Shop Keeper Mike</h4>
                  <p className="text-xs text-gray-600">"Welcome to our medical supply store! We have the best equipment for all your medical needs!"</p>
                </div>
              </div>
            </div>

            {/* Items Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Available Items ({filteredItems.length})
                </h3>
                <div className="text-sm text-gray-600">
                  💡 Click on items to see details and purchase
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredItems.map(item => {
                  const rarityBadge = getRarityBadge(item.rarity);
                  return (
                    <div
                      key={item.id}
                      className={`rounded-2xl border-3 p-6 cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl ${getRarityColor(item.rarity)}`}
                      onClick={() => setSelectedItem(item)}
                    >
                      <div className="text-center mb-4">
                        <div className="text-5xl mb-3">{item.emoji}</div>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-bold text-white ${rarityBadge.color} mb-2`}>
                          {rarityBadge.text}
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">{item.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">Cost:</span>
                          <span className="font-bold text-yellow-600 flex items-center">
                            <span className="text-lg mr-1">🪙</span>
                            {item.cost}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">XP Reward:</span>
                          <span className="font-bold text-purple-600 flex items-center">
                            <span className="text-lg mr-1">⭐</span>
                            {item.experience}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Purchase Modal */}
      {selectedItem && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-60">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 border-4 border-green-400">
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">{selectedItem.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedItem.name}</h3>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold text-white ${getRarityBadge(selectedItem.rarity).color} mb-4`}>
                {getRarityBadge(selectedItem.rarity).text}
              </div>
              <p className="text-gray-600 mb-6">{selectedItem.description}</p>
              
              <div className="bg-gradient-to-r from-yellow-50 to-purple-50 rounded-2xl p-4 mb-6 border-2 border-yellow-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Cost:</span>
                  <span className="font-bold text-yellow-600 text-xl flex items-center">
                    <span className="text-2xl mr-1">🪙</span>
                    {selectedItem.cost}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">XP Reward:</span>
                  <span className="font-bold text-purple-600 text-xl flex items-center">
                    <span className="text-2xl mr-1">⭐</span>
                    {selectedItem.experience}
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onPurchase(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-4 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
                >
                  <span className="text-lg mr-2">🛒</span>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
