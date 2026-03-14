import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Colors from '@/constants/colors';
import { WorkoutCategory } from '@/types/workout';

type CategoryPillProps = {
  category: WorkoutCategory;
  isSelected: boolean;
  onPress: (id: string) => void;
};

export default function CategoryPill({ category, isSelected, onPress }: CategoryPillProps) {
  const getIcon = () => {
    const color = isSelected ? Colors.dark.text : Colors.dark.primary;
    const size = 16;

    switch (category.icon) {
      case 'dumbbell':
        return <FontAwesome5 name="dumbbell" size={size} color={color} />;
      case 'heart':
        return <Feather name="heart" size={size} color={color} />;
      case 'stretch':
        return <MaterialCommunityIcons name="account-voice" size={size} color={color} />;
      case 'timer':
        return <Feather name="clock" size={size} color={color} />;
      case 'settings':
        return <Feather name="settings" size={size} color={color} />;
      default:
        return <FontAwesome5 name="dumbbell" size={size} color={color} />;
    }
  };

  const content = (
    <>
      {getIcon()}
      <Text
        style={[
          styles.text,
          isSelected ? styles.selectedText : null,
        ]}
      >
        {category.name}
      </Text>
    </>
  );

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.containerBaseSelected, // base style when selected just for layout
      ]}
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress(category.id);
      }}
      activeOpacity={0.7}
    >
      {isSelected ? (
        <LinearGradient
          colors={[Colors.dark.primary, Colors.dark.secondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientContainer}
        >
          {content}
        </LinearGradient>
      ) : (
        content
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    

    backgroundColor: Colors.dark.surface,
    marginRight: 12, // more spacing
    marginBottom: 32,
  
    borderWidth: 1,
    borderColor: Colors.dark.border,
    justifyContent: 'center',
   
        flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8
  },
  containerBaseSelected: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 0,
  },
  gradientContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    gap: 8,
  },
  text: {
    fontSize: 14,
    color: Colors.dark.subtext, // slightly faded when inactive
    fontWeight: '600',
    marginLeft: 8, // margin instead of gap since we handle content manually now if not in gradient
  },
  selectedText: {
    color: Colors.dark.background, // high contrast text on light neon gradient
    fontWeight: '800',
    marginLeft: 0, // In the active state, the gap from gradientContainer takes over or we just zero it out, lets keep it 0 here and add a wrapper or use the gap property if we keep content as flex-row. Actually, I will fix the default layout below to ensure flex-row always.
  },
});
