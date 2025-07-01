import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus, Trash2, Save } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workoutStore';
import ImagePicker from '@/components/ImagePicker';
import Colors from '@/constants/colors';
import { Exercise, Workout } from '@/types/workout';

export default function CreateWorkoutScreen() {
  const router = useRouter();
  const { addCustomWorkout } = useWorkoutStore();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [workoutImage, setWorkoutImage] = useState('');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [exercises, setExercises] = useState<Partial<Exercise>[]>([
    { 
      id: Date.now().toString(), 
      name: '', 
      sets: 3, 
      reps: 10, 
      restTime: 60,
      imageUrl: ''
    }
  ]);

  const difficulties = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  const addExercise = () => {
    setExercises([
      ...exercises,
      { 
        id: Date.now().toString(), 
        name: '', 
        sets: 3, 
        reps: 10, 
        restTime: 60,
        imageUrl: ''
      }
    ]);
  };

  const removeExercise = (id: string) => {
    if (exercises.length <= 1) {
      showAlert('Cannot remove', 'You need at least one exercise in your workout.');
      return;
    }
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: string, field: string, value: string | number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const updateExerciseImage = (id: string, imageUrl: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, imageUrl } : ex
    ));
  };

  const showAlert = (title: string, message: string) => {
    if (Platform.OS === 'web') {
      alert(`${title}: ${message}`);
    } else {
      Alert.alert(title, message);
    }
  };

  const validateForm = () => {
    if (!name.trim()) {
      showAlert('Missing Information', 'Please enter a workout name.');
      return false;
    }

    if (!description.trim()) {
      showAlert('Missing Information', 'Please enter a workout description.');
      return false;
    }

    for (const exercise of exercises) {
      if (!exercise.name?.trim()) {
        showAlert('Missing Information', 'Please enter a name for all exercises.');
        return false;
      }
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    // Calculate estimated duration based on exercises
    const totalExerciseTime = exercises.reduce((total, ex) => {
      const exerciseTime = (ex.sets || 1) * ((ex.duration || 0) + (ex.restTime || 0));
      return total + exerciseTime;
    }, 0);
    
    const durationInMinutes = Math.ceil(totalExerciseTime / 60);

    const newWorkout: Workout = {
      id: Date.now().toString(),
      name,
      description,
      category: 'custom',
      duration: durationInMinutes || 30,
      difficulty,
      exercises: exercises.map(ex => ({
        id: ex.id!,
        name: ex.name!,
        sets: ex.sets,
        reps: ex.reps,
        duration: ex.duration,
        restTime: ex.restTime || 60,
        imageUrl: ex.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      })),
      imageUrl: workoutImage || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    };

    addCustomWorkout(newWorkout);
    router.replace('/');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Workout Image</Text>
        <ImagePicker
          currentImage={workoutImage}
          onImageSelected={setWorkoutImage}
          placeholder="Add workout image"
          size="medium"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Workout Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter workout name"
          placeholderTextColor={Colors.dark.subtext}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your workout"
          placeholderTextColor={Colors.dark.subtext}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Difficulty</Text>
        <View style={styles.difficultyContainer}>
          {difficulties.map(diff => (
            <TouchableOpacity
              key={diff.value}
              style={[
                styles.difficultyButton,
                difficulty === diff.value && styles.selectedDifficulty
              ]}
              onPress={() => setDifficulty(diff.value as any)}
            >
              <Text 
                style={[
                  styles.difficultyText,
                  difficulty === diff.value && styles.selectedDifficultyText
                ]}
              >
                {diff.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Exercises</Text>
        {exercises.map((exercise, index) => (
          <View key={exercise.id} style={styles.exerciseContainer}>
            <View style={styles.exerciseHeader}>
              <Text style={styles.exerciseIndex}>#{index + 1}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeExercise(exercise.id!)}
              >
                <Trash2 size={16} color={Colors.dark.secondary} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.exerciseImageRow}>
              <ImagePicker
                currentImage={exercise.imageUrl}
                onImageSelected={(uri) => updateExerciseImage(exercise.id!, uri)}
                placeholder="Exercise image"
                size="small"
              />
              <TextInput
                style={[styles.input, styles.exerciseNameInput]}
                value={exercise.name}
                onChangeText={(value) => updateExercise(exercise.id!, 'name', value)}
                placeholder="Exercise name"
                placeholderTextColor={Colors.dark.subtext}
              />
            </View>
            
            <View style={styles.exerciseDetails}>
              <View style={styles.exerciseDetail}>
                <Text style={styles.detailLabel}>Sets</Text>
                <TextInput
                  style={[styles.input, styles.numberInput]}
                  value={exercise.sets?.toString()}
                  onChangeText={(value) => updateExercise(exercise.id!, 'sets', parseInt(value) || 0)}
                  keyboardType="number-pad"
                  placeholder="3"
                  placeholderTextColor={Colors.dark.subtext}
                />
              </View>
              
              <View style={styles.exerciseDetail}>
                <Text style={styles.detailLabel}>Reps</Text>
                <TextInput
                  style={[styles.input, styles.numberInput]}
                  value={exercise.reps?.toString()}
                  onChangeText={(value) => updateExercise(exercise.id!, 'reps', parseInt(value) || 0)}
                  keyboardType="number-pad"
                  placeholder="10"
                  placeholderTextColor={Colors.dark.subtext}
                />
              </View>
              
              <View style={styles.exerciseDetail}>
                <Text style={styles.detailLabel}>Rest (sec)</Text>
                <TextInput
                  style={[styles.input, styles.numberInput]}
                  value={exercise.restTime?.toString()}
                  onChangeText={(value) => updateExercise(exercise.id!, 'restTime', parseInt(value) || 0)}
                  keyboardType="number-pad"
                  placeholder="60"
                  placeholderTextColor={Colors.dark.subtext}
                />
              </View>
            </View>
          </View>
        ))}
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={addExercise}
        >
          <Plus size={20} color={Colors.dark.text} />
          <Text style={styles.addButtonText}>Add Exercise</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Save size={20} color={Colors.dark.text} />
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  contentContainer: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    padding: 12,
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.dark.card,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  selectedDifficulty: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  difficultyText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
  selectedDifficultyText: {
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  exerciseContainer: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.primary,
  },
  removeButton: {
    padding: 4,
  },
  exerciseImageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  exerciseNameInput: {
    flex: 1,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  exerciseDetail: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.dark.subtext,
    marginBottom: 4,
  },
  numberInput: {
    textAlign: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderStyle: 'dashed',
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.primary,
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 24,
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
});