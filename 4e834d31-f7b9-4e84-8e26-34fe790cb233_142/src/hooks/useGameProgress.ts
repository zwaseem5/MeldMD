import { useState, useEffect } from 'react';
import { useAuth, supabase } from './useAuth';

interface GameProgress {
  level: number;
  experience: number;
  coins: number;
  knowledge_points: number;
  reputation: number;
  patients_helped: number;
  character_avatar: string;
  specialization: string;
  achievements: string[];
  inventory: any[];
  research_projects: any[];
}

export function useGameProgress() {
  const { user } = useAuth();
  const [gameProgress, setGameProgress] = useState<GameProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGameProgress();
    } else {
      setGameProgress(null);
      setLoading(false);
    }
  }, [user]);

  const loadGameProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('game_progress')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setGameProgress(data);
      } else {
        // Create initial game progress if it doesn't exist
        await createInitialProgress();
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const createInitialProgress = async () => {
    if (!user) return;

    const initialProgress = {
      user_id: user.id,
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
      research_projects: []
    };

    try {
      const { data, error } = await supabase
        .from('game_progress')
        .insert([initialProgress])
        .select()
        .single();

      if (error) throw error;
      setGameProgress(data);
    } catch (error) {
      console.error('Error creating initial progress:', error);
    }
  };

  const updateGameProgress = async (updates: Partial<GameProgress>) => {
    if (!user || !gameProgress) return;

    try {
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

      // Track activity
      await supabase
        .from('user_activity')
        .insert([
          {
            user_id: user.id,
            activity_type: 'game_progress_update',
            activity_data: updates,
            page_visited: window.location.pathname
          }
        ]);

      return data;
    } catch (error) {
      console.error('Error updating game progress:', error);
      return null;
    }
  };

  const addExperience = async (amount: number) => {
    if (!gameProgress) return;

    const newExperience = gameProgress.experience + amount;
    const newLevel = Math.floor(newExperience / 100) + 1;
    
    await updateGameProgress({
      experience: newExperience,
      level: Math.max(gameProgress.level, newLevel)
    });
  };

  const addCoins = async (amount: number) => {
    if (!gameProgress) return;
    
    await updateGameProgress({
      coins: gameProgress.coins + amount
    });
  };

  const addKnowledgePoints = async (amount: number) => {
    if (!gameProgress) return;
    
    await updateGameProgress({
      knowledge_points: gameProgress.knowledge_points + amount
    });
  };

  const helpPatient = async () => {
    if (!gameProgress) return;
    
    await updateGameProgress({
      patients_helped: gameProgress.patients_helped + 1,
      reputation: gameProgress.reputation + 10
    });
  };

  const unlockAchievement = async (achievementId: string) => {
    if (!gameProgress || gameProgress.achievements.includes(achievementId)) return;
    
    await updateGameProgress({
      achievements: [...gameProgress.achievements, achievementId]
    });
  };

  const updateCharacter = async (avatar: string, specialization?: string) => {
    if (!gameProgress) return;
    
    const updates: any = { character_avatar: avatar };
    if (specialization) {
      updates.specialization = specialization;
    }
    
    await updateGameProgress(updates);
  };

  const addToInventory = async (item: any) => {
    if (!gameProgress) return;
    
    await updateGameProgress({
      inventory: [...gameProgress.inventory, item]
    });
  };

  const removeFromInventory = async (itemId: string) => {
    if (!gameProgress) return;
    
    await updateGameProgress({
      inventory: gameProgress.inventory.filter(item => item.id !== itemId)
    });
  };

  return {
    gameProgress,
    loading,
    updateGameProgress,
    addExperience,
    addCoins,
    addKnowledgePoints,
    helpPatient,
    unlockAchievement,
    updateCharacter,
    addToInventory,
    removeFromInventory,
    refreshProgress: loadGameProgress
  };
}