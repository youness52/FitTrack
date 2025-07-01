import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProfile {
  name: string;
  bio: string;
  profileImage: string;
  joinDate: string;
  goals: string[];
  preferences: {
    units: 'metric' | 'imperial';
    notifications: boolean;
    darkMode: boolean;
  };
}

interface UserState {
  profile: UserProfile;
  isProfileComplete: boolean;
  
  // Actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  updatePreferences: (preferences: Partial<UserProfile['preferences']>) => void;
  setProfileImage: (imageUri: string) => void;
  addGoal: (goal: string) => void;
  removeGoal: (goal: string) => void;
}

const defaultProfile: UserProfile = {
  name: '',
  bio: '',
  profileImage: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  joinDate: new Date().toISOString(),
  goals: [],
  preferences: {
    units: 'metric',
    notifications: true,
    darkMode: true,
  },
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      isProfileComplete: false,

      updateProfile: (updates) => {
        set((state) => ({
          profile: { ...state.profile, ...updates },
          isProfileComplete: !!(updates.name || state.profile.name),
        }));
      },

      updatePreferences: (preferences) => {
        set((state) => ({
          profile: {
            ...state.profile,
            preferences: { ...state.profile.preferences, ...preferences },
          },
        }));
      },

      setProfileImage: (imageUri) => {
        set((state) => ({
          profile: { ...state.profile, profileImage: imageUri },
        }));
      },

      addGoal: (goal) => {
        set((state) => ({
          profile: {
            ...state.profile,
            goals: [...state.profile.goals, goal],
          },
        }));
      },

      removeGoal: (goal) => {
        set((state) => ({
          profile: {
            ...state.profile,
            goals: state.profile.goals.filter((g) => g !== goal),
          },
        }));
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);