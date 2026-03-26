import { GoogleGenerativeAI } from '@google/generative-ai';
import { Workout, Exercise } from '@/types/workout';

const SYSTEM_PROMPT = `
You are an expert AI personal trainer.
The user will provide their fitness goals, timeline, and available equipment.
You MUST respond ONLY with a valid JSON object representing a workout.

The JSON MUST match the following TypeScript structure exactly:
{
  "name": "string (Short, catchy name for the workout)",
  "description": "string (A brief motivation and summary)",
  "category": "ai-generated",
  "difficulty": "beginner" | "intermediate" | "advanced",
  "duration": number (total minutes, must be greater than 0),
  "imageUrl": "string",
  "exercises": [
    {
      "id": "string (unique random id)",
      "name": "string (name of exercise)",
      "sets": number,
      "reps": number,
      "duration": number (in seconds, 0 if using reps),
      "restTime": number (in seconds),
      "imageUrl": "string",
      "notes": "string (optional tips)"
    }
  ]
}

DO NOT include markdown block markers like \`\`\`json. Just the raw JSON.

CRITICAL IMAGE RULE:
1. YOU MUST provide direct, working URLs from Pexels or Unsplash. 
2. FORMATS ONLY: 
   - https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=800
   - https://images.unsplash.com/photo-[ID]?auto=format&fit=crop&q=80&w=800
3. USE THESE VERIFIED FITNESS IDs FOR ACCURACY:
   - Squats: 1552242 (Pexels) / 1571019614242-c5c5dee9f50b (Unsplash)
   - Pushups: 176782 (Pexels) / 1571019613454-1cb2f99b2d8b (Unsplash)
   - Dumbbells: 949126 (Pexels) / 1517836357463-d25dfeac3438 (Unsplash)
   - Running/Treadmill: 4753996 (Pexels) / 1534438327276-14e5300c3a48 (Unsplash)
   - Yoga/Plank: 3822906 (Pexels) / 1506150645046-10f47d04f12b (Unsplash)
4. NEVER use "source.unsplash.com" or "loremflickr". They are too generic.
5. If you use a different exercise, you MUST ensure the [ID] used is a known, valid ID for that specific movement.

Ensure the workout is safe, progressive, and fits the user's constraints.
`;


export const generateWorkoutFromAI = async (
    apiKey: string,
    userPrompt: string
): Promise<Workout> => {
    if (!apiKey) {
        throw new Error('Gemini API Key is required');
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await model.generateContent({
            contents: [
                { role: 'user', parts: [{ text: SYSTEM_PROMPT + '\n\nUser Request: ' + userPrompt }] },
            ],
            generationConfig: {
                temperature: 0.7,
                responseMimeType: "application/json",
            }
        });

        const responseText = result.response.text();

        // Attempt to parse JSON
        let parsed: any;
        try {
            // Clean up markdown markers if the model ignored instructions
            const cleanText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
            parsed = JSON.parse(cleanText);
        } catch (e) {
            console.error("Failed to parse AI response: ", responseText);
            throw new Error('Failed to parse AI response into a valid workout.');
        }

        // Assign dynamic IDs
        const newWorkout: Workout = {
            id: Date.now().toString(),
            name: parsed.name || 'AI Generated Workout',
            description: parsed.description || 'Custom workout built for you',
            category: 'ai-generated',
            duration: parsed.duration || 30,
            difficulty: parsed.difficulty || 'intermediate',
            imageUrl: parsed.imageUrl || 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
            exercises: Array.isArray(parsed.exercises) ? parsed.exercises.map((ex: any, index: number) => ({
                id: Date.now().toString() + '-' + index,
                name: ex.name || 'Unknown Exercise',
                sets: ex.sets || 3,
                reps: ex.reps || 10,
                duration: ex.duration || 0,
                restTime: ex.restTime || 60,
                imageUrl: ex.imageUrl || 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
                notes: ex.notes || ''
            })) : []
        };

        return newWorkout;

    } catch (error) {
        console.error("Error generating workout:", error);
        throw error;
    }
};
