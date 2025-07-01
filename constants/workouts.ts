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
  },
  {
    id: '6',
    name: 'Upper Body Blast',
    description: 'Target your chest, back, and arms with this focused routine',
    category: 'strength',
    duration: 40,
    difficulty: 'intermediate',
    exercises: [
      { id: '21', name: 'Pull-ups', sets: 3, reps: 8, restTime: 60, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy9Q9xG-RR68bkDkGmRfNBRYINDxQHv8mCpA&s' },
      { id: '22', name: 'Dumbbell Bench Press', sets: 3, reps: 12, restTime: 60, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/incline-bench-1548261402.jpg?resize=980:*' },
      { id: '23', name: 'Bent-over Rows', sets: 3, reps: 10, restTime: 60, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRELKa2pSBrJVQKhh2Ogd25_oqLBzzldHULXA&s' },
      { id: '24', name: 'Bicep Curls', sets: 3, reps: 15, restTime: 45, imageUrl: 'https://cdn.shopify.com/s/files/1/2384/0833/files/inner-bicep-curl-benefits.jpg?v=1689192787' },
    ],
    imageUrl: 'https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/chest_-and_-shoulder_-workout-scaled.jpg?fit=2560%2C1704&ssl=1'
  },
  {
    id: '7',
    name: 'Leg Day Strength',
    description: 'Build power and endurance in your lower body',
    category: 'strength',
    duration: 50,
    difficulty: 'advanced',
    exercises: [
      { id: '25', name: 'Deadlifts', sets: 4, reps: 8, restTime: 90, imageUrl: 'https://www.mensjournal.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk2MTM2NDk0MTk4MDM5Njk3/hex-bar-trap-bar-deadlift.jpg' },
      { id: '26', name: 'Leg Press', sets: 4, reps: 12, restTime: 90, imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2sTneNJpkomr_uyL3-8oiMoO-ObwGgqRtaw&s' },
      { id: '27', name: 'Calf Raises', sets: 4, reps: 20, restTime: 45, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/trained-mans-legs-with-muscular-calves-in-sneakers-royalty-free-image-1709850608.jpg' },
      { id: '28', name: 'Hamstring Curls', sets: 3, reps: 12, restTime: 60, imageUrl: 'https://www.prowolf.in/cdn/shop/articles/5-reasons-why-you-should-use-the-leg-extension-leg-curl-machine-236554_68cccfa0-2a04-462f-81d9-405ef04681dd.jpg?v=1750227447' },
    ],
    imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/young-man-training-on-a-leg-machine-in-the-gym-royalty-free-image-1704212901.jpg?crop=1xw:0.84415xh;center,top&resize=1200:*'
  },
  {
    id: '8',
    name: 'Core Strength & Stability',
    description: 'Strengthen your core muscles for better balance and posture',
    category: 'strength',
    duration: 30,
    difficulty: 'beginner',
    exercises: [
      { id: '29', name: 'Dead Bug', sets: 3, reps: 15, restTime: 45, imageUrl: 'https://experiencelife.lifetime.life/wp-content/uploads/2020/11/the-dead-bug-1024x577.jpg' },
      { id: '30', name: 'Side Plank', sets: 3, duration: 30, restTime: 30, imageUrl: 'https://experiencelife.lifetime.life/wp-content/uploads/2021/07/bid-side-plank.jpg' },
      { id: '31', name: 'Bird Dog', sets: 3, reps: 12, restTime: 30, imageUrl: 'https://images.ctfassets.net/hjcv6wdwxsdz/4zOtx6L8HWHTCYKFMRwbtj/da8cc023af49c7953e5fd46e6042b784/bird-dog.png?w=1200' },
      { id: '32', name: 'Russian Twists', sets: 3, reps: 20, restTime: 30, imageUrl: 'https://media1.popsugar-assets.com/files/thumbor/uHT66rs8CK8XlYQBpMJOUDglGW0=/fit-in/792x544/top/filters:format_auto():upscale()/2024/01/02/752/n/1922729/3300e166ea0ccfe2_PS23_Fitness_Workout_14_Move_10_Russian_Twist_Alt.jpg' },
    ],
    imageUrl: 'https://blog.nasm.org/hubfs/afm_nasm_opt_3.jpg'
  },
  {
    id: '9',
    name: 'Morning Stretch Routine',
    description: 'Start your day with gentle stretches to improve flexibility',
    category: 'flexibility',
    duration: 20,
    difficulty: 'beginner',
    exercises: [
      { id: '33', name: 'Neck Stretch', duration: 30, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '34', name: 'Cat-Cow Stretch', duration: 60, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '35', name: 'Seated Forward Fold', duration: 60, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '36', name: 'Shoulder Stretch', duration: 45, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '10',
    name: 'Beginner Cardio Circuit',
    description: 'Boost your heart rate with this beginner-friendly cardio circuit',
    category: 'cardio',
    duration: 25,
    difficulty: 'beginner',
    exercises: [
      { id: '37', name: 'Marching in Place', duration: 60, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '38', name: 'Step Touch', duration: 45, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '39', name: 'Side-to-Side Hops', duration: 45, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '40', name: 'Arm Circles', duration: 60, restTime: 30, imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '11',
    name: 'Advanced HIIT Challenge',
    description: 'Push your limits with this high-intensity interval training workout',
    category: 'hiit',
    duration: 35,
    difficulty: 'advanced',
    exercises: [
      { id: '41', name: 'Sprint Intervals', duration: 30, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '42', name: 'Jump Squats', duration: 45, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '43', name: 'Push-up to Plank', duration: 40, restTime: 20, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '44', name: 'High Knees', duration: 50, restTime: 20, imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '12',
    name: 'Relaxing Evening Yoga',
    description: 'Wind down with gentle yoga poses to promote relaxation and sleep',
    category: 'flexibility',
    duration: 30,
    difficulty: 'beginner',
    exercises: [
      { id: '45', name: 'Child’s Pose', duration: 90, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '46', name: 'Seated Twist', duration: 60, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '47', name: 'Legs Up The Wall', duration: 120, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '48', name: 'Corpse Pose', duration: 180, restTime: 15, imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '13',
    name: 'Quick Office Stretch',
    description: 'Simple stretches to relieve tension and improve posture during work',
    category: 'flexibility',
    duration: 15,
    difficulty: 'beginner',
    exercises: [
      { id: '49', name: 'Seated Neck Stretch', duration: 30, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '50', name: 'Wrist Flexor Stretch', duration: 30, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '51', name: 'Chest Opener', duration: 30, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1588286840104-8957b019727f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '52', name: 'Spinal Twist', duration: 45, restTime: 10, imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: '14',
    name: 'Endurance Runner',
    description: 'Build stamina and leg strength for long-distance running',
    category: 'cardio',
    duration: 60,
    difficulty: 'advanced',
    exercises: [
      { id: '53', name: 'Long Distance Jog', duration: 1800, restTime: 120, imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '54', name: 'Hill Sprints', sets: 5, reps: 1, restTime: 180, imageUrl: 'https://images.unsplash.com/photo-1593476123561-9516f2097158?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '55', name: 'Box Jumps', sets: 3, reps: 10, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1601422407692-ec4eeec1d9b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: '56', name: 'Jump Rope', duration: 600, restTime: 60, imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ],
    imageUrl: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  }
];