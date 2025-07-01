import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Dumbbell, Heart, Speech, Timer, Settings } from 'lucide-react-native';
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
        return <Dumbbell size={size} color={color} />;
      case 'heart':
        return <Heart size={size} color={color} />;
      case 'stretch':
        return <Speech size={size} color={color} />;
      case 'timer':
        return <Timer size={size} color={color} />;
      case 'settings':
        return <Settings size={size} color={color} />;
      default:
        return <Dumbbell size={size} color={color} />;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected ? styles.selectedContainer : null,
      ]}
      onPress={() => onPress(category.id)}
      activeOpacity={0.7}
    >
      {getIcon()}
      <Text
        style={[
          styles.text,
          isSelected ? styles.selectedText : null,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    gap: 6,
  },
  selectedContainer: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  text: {
    fontSize: 14,
    color: Colors.dark.primary,
  },
  selectedText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
});