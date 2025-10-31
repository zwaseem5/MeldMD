import { useState, useEffect, createContext, useContext } from 'react';
import { createClient } from '@supabase/supabase-js';
import type { User, Session, AuthChangeEvent } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData?: unknown) => Promise<{ data: unknown; error: unknown }>;
  signIn: (email: string, password: string) => Promise<{ data: unknown; error: unknown }>;
  signOut: () => Promise<void>;
  updateProfile: (data: Record<string, unknown>) => Promise<{ error: unknown | null }>;
  changePassword: (newPassword: string) => Promise<{ error: unknown | null }>;
  trackActivity: (activityType: string, data?: unknown) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useAuthProvider(): AuthContextType {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    (async () => {
      const {
        data: { session },
      }: { data: { session: Session | null } } = await supabase.auth.getSession();

      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    })();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Create user profile if new user
        if (event === 'SIGNED_UP' && session?.user) {
          await createUserProfile(session.user);
        }

        // Track activity
        if (session?.user) {
          await trackActivity('auth_event', { event });
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const createUserProfile = async (user: User) => {
    try {
      // Check if profile already exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        // Create user profile only if it doesn't exist
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || '',
              avatar_url: user.user_metadata?.avatar_url || '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);

        if (profileError) throw profileError;
      }

      // Check if game progress already exists
      const { data: existingProgress } = await supabase
        .from('game_progress')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!existingProgress) {
        // Create initial game progress only if it doesn't exist
        const { error: gameError } = await supabase
          .from('game_progress')
          .insert([
            {
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
              research_projects: [],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]);

        if (gameError) throw gameError;
      }
    } catch (error) {
      console.error('Error creating user profile:', error);
    }
  };

  const trackActivity = async (activityType: string, data?: unknown) => {
    if (!user) return;

    try {
      await supabase.from('user_activity').insert([
        {
          user_id: user.id,
          activity_type: activityType,
          activity_data: data,
          page_visited: window.location.pathname,
        },
      ]);
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: unknown) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: userData },
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signOut = async () => {
    try {
      await trackActivity('sign_out');
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (profileData: Record<string, unknown>) => {
    if (!user) return { error: 'No user logged in' };

    try {
      // Check if profile exists first
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      let error: unknown;

      if (existingProfile) {
        const result = await supabase
          .from('user_profiles')
          .update({
            ...profileData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        error = result.error;
      } else {
        const result = await supabase.from('user_profiles').insert([
          {
            id: user.id,
            email: user.email,
            ...profileData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);

        error = result.error;
      }

      if (error) throw error;

      await trackActivity('profile_update', profileData);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const changePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;

      await trackActivity('password_change');
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    changePassword,
    trackActivity,
  };
}

export { AuthContext };
