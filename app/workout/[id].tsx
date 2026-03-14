import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

import { useWorkoutStore } from '@/store/workoutStore';
import ExerciseItem from '@/components/ExerciseItem';
import Colors from '@/constants/colors';

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { workouts, customWorkouts, startWorkout, toggleFavoriteWorkout, favoriteWorkoutIds } = useWorkoutStore();

  const allWorkouts = [...workouts, ...customWorkouts];
  const workout = allWorkouts.find(w => w.id === id);

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Workout not found</Text>
      </View>
    );
  }

  const handleStartWorkout = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    startWorkout(workout);
    router.push('/workout/active');
  };

  const isFavorited = favoriteWorkoutIds.includes(workout.id);

  const handleFavorite = () => {
    Haptics.selectionAsync();
    toggleFavoriteWorkout(workout.id);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: workout.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
          <LinearGradient
            colors={['transparent', 'rgba(10, 10, 12, 0.4)', 'rgba(10, 10, 12, 1)']}
            style={styles.gradient}
          />
          <View style={styles.imageContentWrapper}>
            <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
            <View style={styles.imageContent}>
              <View style={styles.titleRow}>
                <Text style={styles.title}>{workout.name}</Text>
                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={handleFavorite}
                  >
                    <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
                    <FontAwesome5
                      name="heart"
                      solid={isFavorited}
                      size={16}
                      color={isFavorited ? Colors.dark.secondary : Colors.dark.background}
                    />
                  </TouchableOpacity>
                  {(workout.category === 'custom' || workout.category === 'ai-generated') && (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => {
                        Haptics.selectionAsync();
                        router.push(`/workout/edit/${workout.id}`);
                      }}
                    >
                      <BlurView intensity={40} tint="light" style={StyleSheet.absoluteFill} />
                      <Feather name="edit-2" size={16} color={Colors.dark.background} />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
              <Text style={styles.description}>{workout.description}</Text>
            </View>
          </View>
        </View>

        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Feather name="clock" size={20} color={Colors.dark.primary} />
            <Text style={styles.metaText}>{workout.duration} min</Text>
          </View>
          <View style={styles.metaItem}>
            <FontAwesome5 name="dumbbell" size={18} color={Colors.dark.primary} />
            <Text style={styles.metaText}>{workout.exercises.length} exercises</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="chart-bar" size={22} color={Colors.dark.primary} />
            <Text style={[styles.metaText, { textTransform: 'capitalize' }]}>{workout.difficulty}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          {workout.exercises.map((exercise, index) => (
            <ExerciseItem key={exercise.id} exercise={exercise} index={index} />
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.startButton} onPress={handleStartWorkout}>
          <Feather name="play" size={20} color={Colors.dark.text} />
          <Text style={styles.startButtonText}>Start Workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  errorText: {
    fontSize: 16,
    color: Colors.dark.text,
    textAlign: 'center',
    marginTop: 24,
  },
  imageContainer: {
    height: 320, // Increased height for better hero feel
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '80%', // longer gradient fade
  },
  imageContentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
    borderTopLeftRadius: 24, // Optional: if we want a card-like pop
    borderTopRightRadius: 24,
  },
  imageContent: {
    padding: 24,
    paddingBottom: 32,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.dark.text,
    flex: 1,
    letterSpacing: 0.5,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 12,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // to contain the blur
  },
  description: {
    fontSize: 15,
    color: Colors.dark.subtext,
    lineHeight: 22,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    backgroundColor: Colors.dark.surface, // Distinct pop from background
    marginHorizontal: 16,
    marginTop: -20, // Pull it up over the image gradient slightly
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  metaItem: {
    alignItems: 'center',
    gap: 8,
  },
  metaText: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: '600',
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    borderRadius: 12,
    paddingVertical: 16,
    gap: 8,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
});
