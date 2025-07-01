import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SAMPLE_WORKOUTS } from '@/constants/workouts';
import { Workout, WorkoutHistory, Exercise } from '@/types/workout';

interface WorkoutState {
  workouts: Workout[];
  customWorkouts: Workout[];
  workoutHistory: WorkoutHistory[];
  activeWorkout: Workout | null;
  activeExerciseIndex: number;
  isWorkoutActive: boolean;
  
  // Actions
  addCustomWorkout: (workout: Workout) => void;
  updateCustomWorkout: (workout: Workout) => void;
  deleteCustomWorkout: (id: string) => void;
  startWorkout: (workout: Workout) => void;
  endWorkout: (completed: boolean, duration: number) => void;
  nextExercise: () => void;
  resetActiveWorkout: () => void;
  clearHistory: () => void;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      workouts: SAMPLE_WORKOUTS,
      customWorkouts: [],
      workoutHistory: [],
      activeWorkout: null,
      activeExerciseIndex: 0,
      isWorkoutActive: false,

      addCustomWorkout: (workout) => {
        const newWorkout = {
          ...workout,
          id: Date.now().toString(),
          category: 'custom',
        };
        set((state) => ({
          customWorkouts: [...state.customWorkouts, newWorkout],
        }));
      },

      updateCustomWorkout: (workout) => {
        set((state) => ({
          customWorkouts: state.customWorkouts.map((w) =>
            w.id === workout.id ? workout : w
          ),
        }));
      },

      deleteCustomWorkout: (id) => {
        set((state) => ({
          customWorkouts: state.customWorkouts.filter((w) => w.id !== id),
        }));
      },

      startWorkout: (workout) => {
        set({
          activeWorkout: workout,
          activeExerciseIndex: 0,
          isWorkoutActive: true,
        });
      },

      endWorkout: (completed, duration) => {
        const { activeWorkout } = get();
        if (activeWorkout) {
          const historyEntry: WorkoutHistory = {
            id: Date.now().toString(),
            workoutId: activeWorkout.id,
            workoutName: activeWorkout.name,
            date: new Date().toISOString(),
            duration,
            completed,
          };
          set((state) => ({
            workoutHistory: [historyEntry, ...state.workoutHistory],
            activeWorkout: null,
            activeExerciseIndex: 0,
            isWorkoutActive: false,
          }));
        }
      },

      nextExercise: () => {
        const { activeWorkout, activeExerciseIndex } = get();
        if (activeWorkout && activeExerciseIndex < activeWorkout.exercises.length - 1) {
          set({ activeExerciseIndex: activeExerciseIndex + 1 });
        }
      },

      resetActiveWorkout: () => {
        set({
          activeWorkout: null,
          activeExerciseIndex: 0,
          isWorkoutActive: false,
        });
      },

      clearHistory: () => {
        set({ workoutHistory: [] });
      },
    }),
    {
      name: 'workout-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);