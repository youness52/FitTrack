import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useWorkoutStore } from '@/store/workoutStore';
import Colors from '@/constants/colors';
import { generateWorkoutFromAI } from '@/services/aiService';

export default function AiCoachScreen() {
    const router = useRouter();
    const { addCustomWorkout } = useWorkoutStore();
    const geminiApiKey = 'AIzaSyCW_BN7C2UeABRthg0Ekjm6s37ZM_T7JRw';


    const [goals, setGoals] = useState('');
    const [experience, setExperience] = useState('');
    const [equipment, setEquipment] = useState('');
    const [duration, setDuration] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // If no API key is set, show the setup screen first
    if (!geminiApiKey) {
        return (
            <View style={styles.container}>
                <View style={styles.setupContainer}>
                    <View style={styles.iconContainer}>
                        <Feather name="alert-triangle" size={48} color={Colors.dark.primary} />
                    </View>
                    <Text style={styles.setupTitle}>API Key Missing</Text>
                    <Text style={styles.setupDescription}>
                        Please add EXPO_PUBLIC_GEMINI_API_KEY to your .env file to use the AI Coach.
                    </Text>
                </View>
            </View>
        );
    }

    const handleGenerate = async () => {
        if (!goals || !experience || !equipment || !duration) {
            if (Platform.OS === 'web') {
                alert("Please answer all questions");
            } else {
                Alert.alert("Missing Details", "Please tell me a bit more so I can create a good workout!");
            }
            return;
        }

        setIsLoading(true);

        // Construct the prompt manually based on answers
        const prompt = `Goal: ${goals}, Experience Level: ${experience}, Equipment: ${equipment}, Time available: ${duration} minutes. Give me a structured workout.`;

        try {
            const generatedWorkout = await generateWorkoutFromAI(geminiApiKey, prompt);

            // Save to store
            addCustomWorkout(generatedWorkout);

            // Navigate Home
            router.replace('/');

            if (Platform.OS === 'web') {
                alert("Workout generated successfully!");
            } else {
                Alert.alert("Success", "Your AI workout has been created and added to your custom workouts!");
            }
        } catch (error) {
            console.error(error);
            if (Platform.OS === 'web') {
                alert("Wait, there was an issue generating the workout. Please check your API key or try again.");
            } else {
                Alert.alert("Generation Failed", "There was an issue generating the workout. Please check your API key or try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
                <Feather name="cpu" size={32} color={Colors.dark.primary} />
                <Text style={styles.headerTitle}>AI Personal Coach</Text>
                <Text style={styles.headerSubtitle}>Answer a few questions and I'll build the perfect workout for you.</Text>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>1. What is your primary fitness goal?</Text>
                <TextInput
                    style={styles.input}
                    value={goals}
                    onChangeText={setGoals}
                    placeholder="e.g. Build muscle, lose weight, endurance"
                    placeholderTextColor={Colors.dark.subtext}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>2. What is your experience level?</Text>
                <TextInput
                    style={styles.input}
                    value={experience}
                    onChangeText={setExperience}
                    placeholder="e.g. Beginner, intermediate, advanced"
                    placeholderTextColor={Colors.dark.subtext}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>3. What equipment do you have access to?</Text>
                <TextInput
                    style={styles.input}
                    value={equipment}
                    onChangeText={setEquipment}
                    placeholder="e.g. Full gym, dumbbells only, bodyweight"
                    placeholderTextColor={Colors.dark.subtext}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>4. How much time do you have? (minutes)</Text>
                <TextInput
                    style={styles.input}
                    value={duration}
                    onChangeText={setDuration}
                    keyboardType="number-pad"
                    placeholder="e.g. 45"
                    placeholderTextColor={Colors.dark.subtext}
                />
            </View>

            <TouchableOpacity
                style={[styles.generateButton, isLoading && styles.generateButtonDisabled]}
                onPress={handleGenerate}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color={Colors.dark.text} size="small" />
                ) : (
                    <>
                        <Feather name="zap" size={20} color={Colors.dark.text} />
                        <Text style={styles.generateButtonText}>Generate Workout</Text>
                    </>
                )}
            </TouchableOpacity>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.dark.text,
        marginTop: 12,
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 14,
        color: Colors.dark.subtext,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.dark.text,
        marginBottom: 8,
    },
    input: {
        backgroundColor: Colors.dark.card,
        borderRadius: 8,
        padding: 14,
        color: Colors.dark.text,
        borderWidth: 1,
        borderColor: Colors.dark.border,
        fontSize: 16,
    },
    generateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.primary,
        padding: 16,
        borderRadius: 12,
        marginTop: 10,
        gap: 8,
    },
    generateButtonDisabled: {
        opacity: 0.7,
    },
    generateButtonText: {
        color: Colors.dark.text,
        fontSize: 16,
        fontWeight: 'bold',
    },
    setupContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    setupTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.dark.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    setupDescription: {
        fontSize: 15,
        color: Colors.dark.subtext,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 22,
    },

});
