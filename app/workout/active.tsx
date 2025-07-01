import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { X, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workoutStore';
import ExerciseItem from '@/components/ExerciseItem';
import WorkoutTimer from '@/components/WorkoutTimer';
import Colors from '@/constants/colors';

export default function ActiveWorkoutScreen() {
  const router = useRouter();
  const { activeWorkout, activeExerciseIndex, nextExercise, endWorkout, resetActiveWorkout } = useWorkoutStore();
  const [isResting, setIsResting] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [startTime] = useState(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!activeWorkout) {
      router.replace('/');
      return;
    }

    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [activeWorkout, startTime, router]);

  if (!activeWorkout) {
    return null;
  }

  const currentExercise = activeWorkout.exercises[activeExerciseIndex];
  const isLastExercise = activeExerciseIndex === activeWorkout.exercises.length - 1;

  const handleExerciseComplete = () => {
    if (isResting) {
      setIsResting(false);
      if (!isLastExercise) {
        nextExercise();
      } else {
        completeWorkout();
      }
    } else {
      setIsResting(true);
    }
  };

  const handleSkip = () => {
    if (isResting) {
      setIsResting(false);
      if (!isLastExercise) {
        nextExercise();
      } else {
        completeWorkout();
      }
    } else {
      setIsResting(true);
    }
  };

  const completeWorkout = () => {
    const durationInMinutes = Math.ceil(elapsedTime / 60);
    endWorkout(true, durationInMinutes);
    router.replace('/');
  };

  const confirmQuit = () => {
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to quit this workout?')) {
        quitWorkout();
      }
    } else {
      Alert.alert(
        'Quit Workout',
        'Are you sure you want to quit this workout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Quit', 
            style: 'destructive',
            onPress: quitWorkout
          }
        ]
      );
    }
  };

  const quitWorkout = () => {
    const durationInMinutes = Math.ceil(elapsedTime / 60);
    endWorkout(false, durationInMinutes);
    router.replace('/');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={confirmQuit}
        >
          <X size={24} color={Colors.dark.text} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.workoutName}>{activeWorkout.name}</Text>
          <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
        </View>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <WorkoutTimer
          duration={isResting ? currentExercise.restTime : (currentExercise.duration || 0)}
          isRest={isResting}
          onComplete={handleExerciseComplete}
          onSkip={handleSkip}
        />
        
        <View style={styles.exerciseStatus}>
          <Text style={styles.statusText}>
            {isResting 
              ? 'Rest' 
              : `Exercise ${activeExerciseIndex + 1} of ${activeWorkout.exercises.length}`
            }
          </Text>
          <Text style={styles.exerciseName}>
            {isResting ? 'Rest before next exercise' : currentExercise.name}
          </Text>
        </View>
        
        <View style={styles.exerciseList}>
          <Text style={styles.sectionTitle}>Workout Plan</Text>
          {activeWorkout.exercises.map((exercise, index) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              index={index}
              isActive={index === activeExerciseIndex}
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.navButton, activeExerciseIndex === 0 && styles.disabledButton]}
          disabled={activeExerciseIndex === 0}
          onPress={() => {
            if (activeExerciseIndex > 0) {
              // This is a simplified version - in a real app you'd need to handle this properly
              setIsResting(false);
              useWorkoutStore.setState({ activeExerciseIndex: activeExerciseIndex - 1 });
            }
          }}
        >
          <ChevronLeft size={24} color={activeExerciseIndex === 0 ? Colors.dark.subtext : Colors.dark.text} />
          <Text style={[styles.navButtonText, activeExerciseIndex === 0 && styles.disabledText]}>Previous</Text>
        </TouchableOpacity>
        
        {isLastExercise && !isResting ? (
          <TouchableOpacity 
            style={[styles.navButton, styles.finishButton]}
            onPress={completeWorkout}
          >
            <Text style={styles.navButtonText}>Finish Workout</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.navButton}
            onPress={handleSkip}
          >
            <Text style={styles.navButtonText}>Skip</Text>
            <ChevronRight size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.dark.card,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.dark.border}80`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  timer: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontWeight: '500',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  exerciseStatus: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    color: Colors.dark.primary,
    fontWeight: '500',
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.text,
    textAlign: 'center',
  },
  exerciseList: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: Colors.dark.card,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 4,
    gap: 4,
  },
  finishButton: {
    backgroundColor: Colors.dark.primary,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
  },
  disabledButton: {
    backgroundColor: `${Colors.dark.border}50`,
  },
  disabledText: {
    color: Colors.dark.subtext,
  },
});