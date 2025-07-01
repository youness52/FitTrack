export type WorkoutCategory = {
  id: string;
  name: string;
  icon: string;
};

export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';

export type Exercise = {
  id: string;
  name: string;
  sets?: number;
  reps?: number;
  duration?: number; // in seconds
  restTime: number; // in seconds
  imageUrl: string;
  notes?: string;
};

export type Workout = {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number; // in minutes
  difficulty: ExerciseDifficulty;
  exercises: Exercise[];
  imageUrl: string;
};

export type WorkoutHistory = {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  duration: number; // actual duration in minutes
  completed: boolean;
};