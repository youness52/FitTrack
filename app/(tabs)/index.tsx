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
  const { workouts, customWorkouts } = useWorkoutStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const allWorkouts = [...workouts, ...customWorkouts];
  
  const filteredWorkouts = selectedCategory
    ? allWorkouts.filter(workout => workout.category === selectedCategory)
    : allWorkouts;

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
        <Text style={styles.title}>Find Your Workout</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.searchButton}>
            <Feather name="search" size={20} color={Colors.dark.text} />  {/* replaced Search */}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateWorkout}
          >
            <Feather name="plus" size={20} color={Colors.dark.text} />   {/* replaced Plus */}
          </TouchableOpacity>
        </View>
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
    padding: 16
  },
  header: {
    paddingTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    height:70,
    justifyContent: 'center',
   
    paddingVertical: 16,
  },
  workoutsContainer: {
    marginTop:18,
    paddingBottom: 80,
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
