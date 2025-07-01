import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Use Feather icons
import Colors from '@/constants/colors';

type WorkoutTimerProps = {
  duration: number; // in seconds
  isRest?: boolean;
  onComplete: () => void;
  onSkip?: () => void;
};

export default function WorkoutTimer({
  duration,
  isRest = false,
  onComplete,
  onSkip,
}: WorkoutTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTimeLeft(duration);
    setIsActive(true);
  }, [duration]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - timeLeft / duration;
  const backgroundColor = isRest ? Colors.dark.secondary : Colors.dark.primary;
  const progressColor = `${backgroundColor}40`;

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={[styles.progressBar, { backgroundColor: progressColor }]}>
          <View
            style={[
              styles.progress,
              {
                width: `${progress * 100}%`,
                backgroundColor,
              },
            ]}
          />
        </View>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.label}>{isRest ? 'REST' : 'WORK'}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton} onPress={toggleTimer}>
          {isActive ? (
            <Feather name="pause" size={24} color={Colors.dark.text} />
          ) : (
            <Feather name="play" size={24} color={Colors.dark.text} />
          )}
        </TouchableOpacity>
        {onSkip && (
          <TouchableOpacity style={styles.controlButton} onPress={onSkip}>
            <Feather name="skip-forward" size={24} color={Colors.dark.text} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    marginBottom: 16,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 12,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: Colors.dark.subtext,
    fontWeight: '600',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.dark.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
