import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Workout } from '@/types/workout';
import { useWorkoutStore } from '@/store/workoutStore';
import Colors from '@/constants/colors';

type WorkoutCardProps = {
  workout: Workout;
  onPress: (workout: Workout) => void;
};

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

export default function WorkoutCard({ workout, onPress }: WorkoutCardProps) {
  const { deleteCustomWorkout } = useWorkoutStore();
  const isCustomWorkout = workout.category === 'custom';

  const handleDelete = () => {
    const showConfirm = () => {
      if (Platform.OS === 'web') {
        if (window.confirm(`Are you sure you want to delete "${workout.name}"?`)) {
          deleteCustomWorkout(workout.id);
        }
      } else {
        Alert.alert('Delete Workout', `Are you sure you want to delete "${workout.name}"?`, [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteCustomWorkout(workout.id),
          },
        ]);
      }
    };
    showConfirm();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(workout)}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: workout.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      />

      {isCustomWorkout && (
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Feather name="trash-2" size={16} color={Colors.dark.secondary} />
        </TouchableOpacity>
      )}

      <View style={styles.content}>
        <Text style={styles.title}>{workout.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {workout.description}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Feather name="clock" size={16} color={Colors.dark.primary} />
            <Text style={styles.metaText}>{workout.duration} min</Text>
          </View>
          <View style={styles.metaItem}>
            <FontAwesome5 name="dumbbell" size={16} color={Colors.dark.primary} />
            <Text style={styles.metaText}>{workout.exercises.length} exercises</Text>
          </View>
          <View style={styles.metaItem}>
            <MaterialCommunityIcons name="chart-bar" size={16} color={Colors.dark.primary} />
            <Text style={styles.metaText}>{workout.difficulty}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: Colors.dark.card,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  deleteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.subtext,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: Colors.dark.primary,
  },
});
