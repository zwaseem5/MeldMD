
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function UserMenu() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setIsOpen(false);
  };

  const handleGameClick = () => {
    navigate('/medgame');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 transition-colors"
      >
        <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
          <i className="ri-user-line text-white text-sm"></i>
        </div>
        <span className="text-sm font-medium text-gray-700">
          {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
        </span>
        <i className={`ri-arrow-down-s-line text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                {user.user_metadata?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            
            <button
              onClick={handleGameClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <i className="ri-gamepad-line text-teal-600"></i>
              <span>Medical Game</span>
            </button>
            
            <button
              onClick={handleProfileClick}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
            >
              <i className="ri-settings-line text-gray-600"></i>
              <span>Profile Settings</span>
            </button>
            
            <hr className="my-1" />
            
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
            >
              <i className="ri-logout-box-line"></i>
              <span>Sign Out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
