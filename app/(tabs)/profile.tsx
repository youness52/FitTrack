import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { Settings, Award, BarChart2, Calendar, Edit3, Plus, X } from 'lucide-react-native';
import { useWorkoutStore } from '@/store/workoutStore';
import { useUserStore } from '@/store/userStore';
import ImagePicker from '@/components/ImagePicker';
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  const { workoutHistory } = useWorkoutStore();
  const { profile, updateProfile, addGoal, removeGoal } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [editForm, setEditForm] = useState({
    name: profile.name,
    bio: profile.bio,
  });
  
  const completedWorkouts = workoutHistory.filter(w => w.completed).length;
  const totalWorkoutTime = workoutHistory.reduce((total, w) => total + w.duration, 0);
  
  const stats = [
    { 
      id: 'completed',
      label: 'Workouts Completed',
      value: completedWorkouts,
      icon: <Award size={24} color={Colors.dark.primary} />,
    },
    { 
      id: 'time',
      label: 'Total Workout Time',
      value: `${totalWorkoutTime} min`,
      icon: <BarChart2 size={24} color={Colors.dark.primary} />,
    },
    { 
      id: 'streak',
      label: 'Current Streak',
      value: '3 days',
      icon: <Calendar size={24} color={Colors.dark.primary} />,
    },
  ];

  const handleSaveProfile = () => {
    updateProfile(editForm);
    setIsEditing(false);
  };

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      addGoal(newGoal.trim());
      setNewGoal('');
      setShowGoalModal(false);
    }
  };

  const formatJoinDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return `${diffMonths} month${diffMonths !== 1 ? 's' : ''} with FitTrack`;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}
        >
          <Edit3 size={20} color={Colors.dark.text} />
          <Text style={styles.editButtonText}>
            {isEditing ? 'Cancel' : 'Edit'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.profileSection}>
        <ImagePicker
          currentImage={profile.profileImage}
          onImageSelected={(uri) => updateProfile({ profileImage: uri })}
          placeholder="Add Photo"
          size="large"
        />
        
        {isEditing ? (
          <View style={styles.editForm}>
            <TextInput
              style={styles.nameInput}
              value={editForm.name}
              onChangeText={(text) => setEditForm({ ...editForm, name: text })}
              placeholder="Enter your name"
              placeholderTextColor={Colors.dark.subtext}
            />
            <TextInput
              style={styles.bioInput}
              value={editForm.bio}
              onChangeText={(text) => setEditForm({ ...editForm, bio: text })}
              placeholder="Tell us about yourself"
              placeholderTextColor={Colors.dark.subtext}
              multiline
              numberOfLines={3}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>
              {profile.name || 'Add your name'}
            </Text>
            <Text style={styles.profileBio}>
              {profile.bio || 'Add a bio to tell others about yourself'}
            </Text>
            <Text style={styles.joinDate}>
              {formatJoinDate(profile.joinDate)}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.statsContainer}>
        {stats.map(stat => (
          <View key={stat.id} style={styles.statCard}>
            {stat.icon}
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Goals</Text>
          <TouchableOpacity 
            style={styles.addGoalButton}
            onPress={() => setShowGoalModal(true)}
          >
            <Plus size={16} color={Colors.dark.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.goalsContainer}>
          {profile.goals.length > 0 ? (
            profile.goals.map((goal, index) => (
              <View key={index} style={styles.goalItem}>
                <Text style={styles.goalText}>{goal}</Text>
                <TouchableOpacity onPress={() => removeGoal(goal)}>
                  <X size={16} color={Colors.dark.secondary} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.emptyGoals}>No goals set yet. Add your first goal!</Text>
          )}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsContainer}>
          <View style={styles.achievement}>
            <View style={[styles.achievementIcon, { backgroundColor: `${Colors.dark.primary}20` }]}>
              <Award size={24} color={Colors.dark.primary} />
            </View>
            <Text style={styles.achievementTitle}>First Workout</Text>
          </View>
          {completedWorkouts >= 5 && (
            <View style={styles.achievement}>
              <View style={[styles.achievementIcon, { backgroundColor: `${Colors.dark.secondary}20` }]}>
                <BarChart2 size={24} color={Colors.dark.secondary} />
              </View>
              <Text style={styles.achievementTitle}>5 Workouts Completed</Text>
            </View>
          )}
        </View>
      </View>

      <Modal
        visible={showGoalModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGoalModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Goal</Text>
            <TextInput
              style={styles.goalInput}
              value={newGoal}
              onChangeText={setNewGoal}
              placeholder="Enter your goal"
              placeholderTextColor={Colors.dark.subtext}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton}
                onPress={() => setShowGoalModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.primaryModalButton]}
                onPress={handleAddGoal}
              >
                <Text style={[styles.modalButtonText, styles.primaryModalButtonText]}>
                  Add Goal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  header: {
    paddingTop:30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 4,
  },
  editButtonText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.dark.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  profileBio: {
    fontSize: 14,
    color: Colors.dark.subtext,
    textAlign: 'center',
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 12,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  editForm: {
    width: '100%',
    marginTop: 16,
    gap: 12,
  },
  nameInput: {
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    padding: 12,
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  bioInput: {
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    padding: 12,
    color: Colors.dark.text,
    textAlign: 'center',
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  saveButton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Colors.dark.text,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.dark.subtext,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
  },
  addGoalButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: `${Colors.dark.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goalsContainer: {
    gap: 8,
  },
  goalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 8,
    padding: 12,
  },
  goalText: {
    flex: 1,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  emptyGoals: {
    color: Colors.dark.subtext,
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 16,
  },
  achievementsContainer: {
    gap: 12,
  },
  achievement: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.card,
    borderRadius: 12,
    padding: 16,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.dark.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  goalInput: {
    backgroundColor: Colors.dark.background,
    borderRadius: 8,
    padding: 12,
    color: Colors.dark.text,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: Colors.dark.background,
  },
  primaryModalButton: {
    backgroundColor: Colors.dark.primary,
  },
  modalButtonText: {
    color: Colors.dark.text,
    fontWeight: '500',
  },
  primaryModalButtonText: {
    fontWeight: 'bold',
  },
});