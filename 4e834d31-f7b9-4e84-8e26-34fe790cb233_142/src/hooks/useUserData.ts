
import { useState, useEffect } from 'react';
import { supabase } from './useAuth';
import { useAuth } from './useAuth';

export interface UserGameProgress {
  id?: string;
  user_id: string;
  level: number;
  experience: number;
  coins: number;
  knowledge_points: number;
  reputation: number;
  patients_helped: number;
  character_avatar: string;
  character_name?: string;
  character_specialization?: string;
  specialization: string;
  achievements: string[];
  inventory: string[];
  research_projects: string[];
  has_completed_tutorial?: boolean;
  last_played?: string;
  character?: any;
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company?: string;
  phone?: string;
  location?: string;
  website?: string;
  bio?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Default data for non-authenticated users
const defaultGameProgress: UserGameProgress = {
  user_id: 'guest',
  level: 1,
  experience: 0,
  coins: 100,
  knowledge_points: 0,
  reputation: 0,
  patients_helped: 0,
  character_avatar: 'doctor-male',
  specialization: 'general',
  achievements: [],
  inventory: [],
  research_projects: [],
  has_completed_tutorial: false
};

export function useUserData() {
  const { user } = useAuth();
  const [gameProgress, setGameProgress] = useState<UserGameProgress>(defaultGameProgress);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  // Load user data when user changes
  useEffect(() => {
    if (user) {
      loadUserData();
    } else {
      // Reset to default data when no user is logged in
      setGameProgress(defaultGameProgress);
      setUserProfile(null);
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Load user profile
      const { data: profileData, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      setUserProfile(profileData);

      // Load game progress
      const { data: gameData, error: gameError } = await supabase
        .from('game_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (gameError && gameError.code !== 'PGRST116') {
        throw gameError;
      }

      if (gameData) {
        setGameProgress(gameData);
      } else {
        // Create initial game progress if it doesn't exist
        await createInitialGameProgress();
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const createInitialGameProgress = async () => {
    if (!user) return;

    try {
      const initialProgress = {
        ...defaultGameProgress,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from('game_progress')
        .insert([initialProgress])
        .select()
        .single();

      if (error) throw error;

      setGameProgress(data);
    } catch (error) {
      console.error('Error creating initial game progress:', error);
    }
  };

  const updateGameProgress = async (updates: Partial<UserGameProgress>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      const updatedProgress = { ...gameProgress, ...updates };
      
      const { data, error } = await supabase
        .from('game_progress')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      setGameProgress(data);
      return { data, error: null };
    } catch (error) {
      console.error('Error updating game progress:', error);
      return { data: null, error };
    }
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      // First check if profile exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      let data, error;

      if (existingProfile) {
        // Update existing profile
        const result = await supabase
          .from('user_profiles')
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id)
          .select()
          .single();
        
        data = result.data;
        error = result.error;
      } else {
        // Create new profile if it doesn't exist
        const result = await supabase
          .from('user_profiles')
          .insert([{
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || '',
            ...updates,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select()
          .single();
        
        data = result.data;
        error = result.error;
      }

      if (error) throw error;

      setUserProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Error updating user profile:', error);
      return { data: null, error };
    }
  };

  const addExperience = async (amount: number) => {
    const newExperience = gameProgress.experience + amount;
    const newLevel = Math.floor(newExperience / 1000) + 1;
    
    return updateGameProgress({
      experience: newExperience,
      level: newLevel
    });
  };

  const addCoins = async (amount: number) => {
    return updateGameProgress({
      coins: gameProgress.coins + amount
    });
  };

  const addKnowledgePoints = async (amount: number) => {
    return updateGameProgress({
      knowledge_points: gameProgress.knowledge_points + amount
    });
  };

  const addAchievement = async (achievement: string) => {
    if (gameProgress.achievements.includes(achievement)) return;
    
    return updateGameProgress({
      achievements: [...gameProgress.achievements, achievement]
    });
  };

  const addToInventory = async (item: string) => {
    if (gameProgress.inventory.includes(item)) return;
    
    return updateGameProgress({
      inventory: [...gameProgress.inventory, item]
    });
  };

  const helpPatient = async () => {
    return updateGameProgress({
      patients_helped: gameProgress.patients_helped + 1,
      reputation: gameProgress.reputation + 10
    });
  };

  const updateCharacter = async (avatar: string, specialization?: string) => {
    const updates: Partial<UserGameProgress> = { character_avatar: avatar };
    if (specialization) {
      updates.specialization = specialization;
    }
    
    return updateGameProgress(updates);
  };

  return {
    gameProgress,
    userProfile,
    loading,
    isAuthenticated: !!user,
    updateGameProgress,
    updateUserProfile,
    addExperience,
    addCoins,
    addKnowledgePoints,
    addAchievement,
    addToInventory,
    helpPatient,
    updateCharacter,
    loadUserData
  };
}
