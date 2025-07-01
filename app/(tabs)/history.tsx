import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Calendar, Clock, CheckCircle, XCircle, Trash2 } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workoutStore';
import { WorkoutHistory } from '@/types/workout';
import EmptyState from '@/components/EmptyState';
import Colors from '@/constants/colors';

export default function HistoryScreen() {
  const router = useRouter();
  const { workoutHistory, clearHistory } = useWorkoutStore();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderHistoryItem = ({ item }: { item: WorkoutHistory }) => {
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyHeader}>
          <Text style={styles.workoutName}>{item.workoutName}</Text>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: item.completed ? `${Colors.dark.success}20` : `${Colors.dark.secondary}20` }
          ]}>
            {item.completed ? (
              <CheckCircle size={14} color={Colors.dark.success} />
            ) : (
              <XCircle size={14} color={Colors.dark.secondary} />
            )}
            <Text style={[
              styles.statusText, 
              { color: item.completed ? Colors.dark.success : Colors.dark.secondary }
            ]}>
              {item.completed ? 'Completed' : 'Abandoned'}
            </Text>
          </View>
        </View>
        
        <View style={styles.historyDetails}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.dark.primary} />
            <Text style={styles.detailText}>{formatDate(item.date)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.dark.primary} />
            <Text style={styles.detailText}>{item.duration} min</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workout History</Text>
        {workoutHistory.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearHistory}
          >
            <Trash2 size={16} color={Colors.dark.secondary} />
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {workoutHistory.length > 0 ? (
        <FlatList
          data={workoutHistory}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <EmptyState
          title="No Workout History"
          message="Complete your first workout to see your history here."
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 16,
  },
  header: {
    paddingTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  clearButtonText: {
    color: Colors.dark.secondary,
    fontWeight: '500',
  },
  listContainer: {
    paddingBottom: 16,
  },
  historyItem: {
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.dark.primary,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  historyDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 14,
    color: Colors.dark.subtext,
  },
});