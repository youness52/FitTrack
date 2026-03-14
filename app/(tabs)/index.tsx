import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';  // <-- import Feather icons here
import { useWorkoutStore } from '@/store/workoutStore';
import { WORKOUT_CATEGORIES } from '@/constants/workouts';
import { Workout } from '@/types/workout';
import WorkoutCard from '@/components/WorkoutCard';
import CategoryPill from '@/components/CategoryPill';
import Colors from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  const { workouts, customWorkouts, favoriteWorkoutIds } = useWorkoutStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const allWorkouts = [...workouts, ...customWorkouts];

  const filteredWorkouts = (selectedCategory
    ? allWorkouts.filter(workout => workout.category === selectedCategory)
    : allWorkouts).sort((a, b) => {
      const aFav = favoriteWorkoutIds.includes(a.id);
      const bFav = favoriteWorkoutIds.includes(b.id);
      if (aFav && !bFav) return -1;
      if (!aFav && bFav) return 1;
      return 0;
    });

  const handleCategoryPress = useCallback((categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  }, []);

  const handleWorkoutPress = useCallback((workout: Workout) => {
    router.push(`/workout/${workout.id}`);
  }, [router]);

  const handleCreateWorkout = useCallback(() => {
    router.push('/workout/create');
  }, [router]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextGroup}>
          <Text style={styles.greeting}>Ready to crush it?</Text>
          <Text style={styles.title}>Find Your Workout</Text>
        </View>
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleCreateWorkout}
        >
          <Feather name="plus" size={24} color={Colors.dark.background} />
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={WORKOUT_CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CategoryPill
            category={item}
            isSelected={selectedCategory === item.id}
            onPress={handleCategoryPress}
          />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      />

      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutCard workout={item} onPress={handleWorkoutPress} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.workoutsContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workouts found</Text>
            <TouchableOpacity
              style={styles.emptyCreateButton}
              onPress={handleCreateWorkout}
            >
              <Feather name="plus" size={20} color={Colors.dark.text} />  {/* replaced Plus */}
              <Text style={styles.createButtonText}>Create Workout</Text>
            </TouchableOpacity>
          </View>
        }
      />


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTextGroup: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: Colors.dark.secondary,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.dark.text,
    letterSpacing: -0.5,
  },
  createButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.dark.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  categoriesContainer: {
    height: 70,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  workoutsContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.dark.subtext,
    marginBottom: 16,
  },
  emptyCreateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  createButtonText: {
    color: Colors.dark.text,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});
