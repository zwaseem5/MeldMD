import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useUserData } from '../../hooks/useUserData';
import LoadingAnimation from '../../components/feature/LoadingAnimation';

export default function ProfilePage() {
  const { user, changePassword } = useAuth();
  const { userProfile, gameProgress, updateUserProfile, loading } = useUserData();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    company: '',
    phone: '',
    location: '',
    website: '',
    bio: '',
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (userProfile) {
      setProfileForm({
        full_name: userProfile.full_name || '',
        company: userProfile.company || '',
        phone: userProfile.phone || '',
        location: userProfile.location || '',
        website: userProfile.website || '',
        bio: userProfile.bio || '',
      });
    }
  }, [userProfile]);

  if (loading) {
    // Add onComplete to satisfy LoadingAnimationProps
    return <LoadingAnimation onComplete={() => { /* no-op for profile loading */ }} />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your profile.</p>
          <button
            onClick={() => window.REACT_APP_NAVIGATE('/')}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await updateUserProfile(profileForm);

      if (error) {
        showMessage('Failed to update profile. Please try again.', 'error');
      } else {
        showMessage('Profile updated successfully!', 'success');
        setIsEditing(false);
      }
    } catch (error) {
      showMessage('An error occurred. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage('Passwords do not match.', 'error');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      showMessage('Password must be at least 6 characters long.', 'error');
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await changePassword(passwordForm.newPassword);

      if (error) {
        showMessage('Failed to change password. Please try again.', 'error');
      } else {
        showMessage('Password changed successfully!', 'success');
        setPasswordForm({ newPassword: '', confirmPassword: '' });
      }
    } catch (error) {
      showMessage('An error occurred. Please try again.', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <i className="ri-user-line text-2xl text-teal-600"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {userProfile?.full_name || 'User Profile'}
                </h1>
                <p className="text-teal-100">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div
              className={`mx-8 mt-6 p-4 rounded-lg ${
                messageType === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-center">
                <i
                  className={`${
                    messageType === 'success' ? 'ri-check-line' : 'ri-error-warning-line'
                  } mr-2`}
                ></i>
                {message}
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex px-8">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'profile'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Profile Information
              </button>
              <button
                onClick={() => setActiveTab('game')}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'game'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Game Progress
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`py-4 px-6 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === 'password'
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Change Password
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors whitespace-nowrap"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                <form onSubmit={handleProfileSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.full_name}
                        onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={user.email || ''}
                        disabled
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                      <input
                        type="text"
                        value={profileForm.company}
                        onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      <input
                        type="url"
                        value={profileForm.website}
                        onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    <textarea
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:bg-gray-50"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 mt-6">
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                      >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Game Tab */}
            {activeTab === 'game' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Game Progress</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <i className="ri-trophy-line text-2xl text-blue-600"></i>
                      <span className="text-2xl font-bold text-blue-600">{gameProgress.level}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Level</h3>
                    <p className="text-sm text-gray-600">Current level achieved</p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <i className="ri-flashlight-line text-2xl text-green-600"></i>
                      <span className="text-2xl font-bold text-green-600">{gameProgress.experience}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Experience</h3>
                    <p className="text-sm text-gray-600">Total XP earned</p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <i className="ri-coin-line text-2xl text-yellow-600"></i>
                      <span className="text-2xl font-bold text-yellow-600">{gameProgress.coins}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Coins</h3>
                    <p className="text-sm text-gray-600">Currency earned</p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <i className="ri-brain-line text-2xl text-purple-600"></i>
                      <span className="text-2xl font-bold text-purple-600">{gameProgress.knowledge_points}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Knowledge</h3>
                    <p className="text-sm text-gray-600">Knowledge points</p>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <i className="ri-heart-pulse-line text-2xl text-red-600"></i>
                      <span className="text-2xl font-bold text-red-600">{gameProgress.patients_helped}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Patients</h3>
                    <p className="text-sm text-gray-600">Patients helped</p>
                  </div>

                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-2">
                      <i className="ri-star-line text-2xl text-teal-600"></i>
                      <span className="text-2xl font-bold text-teal-600">{gameProgress.reputation}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900">Reputation</h3>
                    <p className="text-sm text-gray-600">Professional reputation</p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => window.REACT_APP_NAVIGATE('/medgame')}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
                  >
                    Continue Playing
                  </button>
                </div>
              </div>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Change Password</h2>

                <form onSubmit={handlePasswordSubmit} className="max-w-md">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                      <input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter new password"
                        required
                        minLength={6}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Confirm new password"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
                    >
                      {isSaving ? 'Changing...' : 'Change Password'}
                    </button>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Minimum 6 characters long</li>
                      <li>• Use a strong, unique password</li>
                      <li>• Consider using a password manager</li>
                    </ul>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
