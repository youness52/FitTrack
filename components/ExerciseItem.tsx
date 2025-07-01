import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Feather } from '@expo/vector-icons'; // ← Use Feather icons
import { Exercise } from '@/types/workout';
import Colors from '@/constants/colors';

type ExerciseItemProps = {
  exercise: Exercise;
  index: number;
  isActive?: boolean;
};

export default function ExerciseItem({ exercise, index, isActive = false }: ExerciseItemProps) {
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return remainingSeconds > 0 
      ? `${minutes}m ${remainingSeconds}s` 
      : `${minutes}m`;
  };

  return (
    <View style={[styles.container, isActive && styles.activeContainer]}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{index + 1}</Text>
      </View>
      <Image
        source={{ uri: exercise.imageUrl }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <View style={styles.content}>
        <Text style={styles.name}>{exercise.name}</Text>
        <View style={styles.detailsContainer}>
          {exercise.sets && exercise.reps && (
            <View style={styles.detail}>
              <Feather name="repeat" size={14} color={Colors.dark.primary} />
              <Text style={styles.detailText}>
                {exercise.sets} × {exercise.reps}
              </Text>
            </View>
          )}
          {exercise.duration && (
            <View style={styles.detail}>
              <Feather name="clock" size={14} color={Colors.dark.primary} />
              <Text style={styles.detailText}>
                {formatDuration(exercise.duration)}
              </Text>
            </View>
          )}
          <View style={styles.detail}>
            <Feather name="clock" size={14} color={Colors.dark.secondary} />
            <Text style={[styles.detailText, { color: Colors.dark.secondary }]}>
              Rest: {formatDuration(exercise.restTime)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  activeContainer: {
    borderColor: Colors.dark.primary,
    backgroundColor: `${Colors.dark.primary}20`,
  },
  indexContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  index: {
    color: Colors.dark.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: Colors.dark.primary,
  },
});