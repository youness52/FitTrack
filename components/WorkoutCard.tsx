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
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
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
  const { deleteCustomWorkout, toggleFavoriteWorkout, favoriteWorkoutIds } = useWorkoutStore();
  const isCustomWorkout = workout.category === 'custom';
  const isFavorited = favoriteWorkoutIds.includes(workout.id);

  const handleFavorite = () => {
    Haptics.selectionAsync();
    toggleFavoriteWorkout(workout.id);
  };

  const handleDelete = () => {
    const showConfirm = () => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
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
      onPress={() => {
        Haptics.selectionAsync();
        onPress(workout);
      }}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: workout.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['transparent', 'rgba(10, 10, 12, 0.4)', 'rgba(10, 10, 12, 0.95)']}
        style={styles.gradient}
      />

      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavorite}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
        <FontAwesome5
          name="heart"
          solid={isFavorited}
          size={16}
          color={isFavorited ? Colors.dark.secondary : Colors.dark.text}
        />
      </TouchableOpacity>

      {isCustomWorkout && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDelete}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          <Feather name="trash-2" size={16} color={Colors.dark.secondary} />
        </TouchableOpacity>
      )}

      <View style={styles.contentWrapper}>
        <BlurView intensity={20} tint="dark" style={styles.blurBackground} />
        <View style={styles.content}>
          <Text style={styles.title}>{workout.name}</Text>
          <Text style={styles.description} numberOfLines={2}>
            {workout.description}
          </Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Feather name="clock" size={14} color={Colors.dark.primary} />
              <Text style={styles.metaText}>{workout.duration} min</Text>
            </View>
            <View style={styles.metaItem}>
              <FontAwesome5 name="dumbbell" size={12} color={Colors.dark.primary} />
              <Text style={styles.metaText}>{workout.exercises.length} exercises</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons name="chart-bar" size={16} color={Colors.dark.primary} />
              <Text style={[styles.metaText, { textTransform: 'capitalize', color: Colors.dark.subtext, fontSize: 13, fontWeight: '500' }]}>{workout.difficulty}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: 220, // slightly taller for better imagery
    borderRadius: 24, // increased for a softer squircle look
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: Colors.dark.surface,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    elevation: 5, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
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
    height: '80%',
  },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.glass,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  deleteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.dark.glass,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  contentWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  blurBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.dark.text,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: Colors.dark.subtext,
    marginBottom: 12,
    lineHeight: 20,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: Colors.dark.text,
    fontWeight: '600',
  },
});
