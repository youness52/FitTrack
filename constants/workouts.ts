import { Workout, WorkoutCategory } from '@/types/workout';

export const WORKOUT_CATEGORIES: WorkoutCategory[] = [
  { id: 'strength', name: 'Strength', icon: 'dumbbell' },
  { id: 'cardio', name: 'Cardio', icon: 'heart' },
  { id: 'flexibility', name: 'Flexibility', icon: 'stretch' },
  { id: 'hiit', name: 'HIIT', icon: 'timer' },
  { id: 'custom', name: 'Custom', icon: 'settings' },
];

export const SAMPLE_WORKOUTS: Workout[] = [
  {
    id: '1',
    name: 'Full Body Strength',
    description: 'A complete workout targeting all major muscle groups',
    category: 'strength',
    duration: 45,
    difficulty: 'intermediate',
    exercises: [
      { id: '1', name: 'Push-ups', sets: 3, reps: 12, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '2', name: 'Squats', sets: 3, reps: 15, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '3', name: 'Lunges', sets: 3, reps: 10, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '4', name: 'Plank', sets: 3, duration: 60, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '2',
    name: 'HIIT Cardio Blast',
    description: 'High intensity interval training to boost your cardio',
    category: 'hiit',
    duration: 30,
    difficulty: 'advanced',
    exercises: [
      { id: '5', name: 'Jumping Jacks', duration: 45, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '6', name: 'Mountain Climbers', duration: 45, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '7', name: 'Burpees', duration: 45, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '8', name: 'High Knees', duration: 45, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '3',
    name: 'Yoga Flow',
    description: 'Improve flexibility and mindfulness with this yoga routine',
    category: 'flexibility',
    duration: 40,
    difficulty: 'beginner',
    exercises: [
      { id: '9', name: 'Downward Dog', duration: 60, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '10', name: 'Warrior Pose', duration: 60, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '11', name: 'Tree Pose', duration: 60, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '12', name: 'Child Pose', duration: 60, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '4',
    name: 'Core Crusher',
    description: 'Focus on your abs and core strength',
    category: 'strength',
    duration: 25,
    difficulty: 'intermediate',
    exercises: [
      { id: '13', name: 'Crunches', sets: 3, reps: 20, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '14', name: 'Russian Twists', sets: 3, reps: 16, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '15', name: 'Leg Raises', sets: 3, reps: 12, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '16', name: 'Plank', sets: 3, duration: 45, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1566241142559-40e1dab266c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '5',
    name: '30-Min Cardio',
    description: 'Quick cardio session to get your heart pumping',
    category: 'cardio',
    duration: 30,
    difficulty: 'beginner',
    exercises: [
      { id: '17', name: 'Jogging in Place', duration: 300, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '18', name: 'Jumping Jacks', duration: 300, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '19', name: 'High Knees', duration: 300, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '20', name: 'Butt Kicks', duration: 300, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];