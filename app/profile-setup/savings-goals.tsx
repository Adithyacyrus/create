import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Slider } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, Home, Car, Briefcase, GraduationCap, Plane, Plus, Trash2 } from 'lucide-react-native';

type Goal = {
  id: string;
  type: string;
  name: string;
  amount: string;
  timeline: string;
};

export default function SavingsGoalsScreen() {
  const [savingsPercentage, setSavingsPercentage] = useState(20);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showGoalForm, setShowGoalForm] = useState(false);
  
  // Form states
  const [goalType, setGoalType] = useState('');
  const [goalName, setGoalName] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [goalTimeline, setGoalTimeline] = useState('');

  const handleAddGoal = () => {
    if (goalType && goalName && goalAmount && goalTimeline) {
      const newGoal = {
        id: Date.now().toString(),
        type: goalType,
        name: goalName,
        amount: goalAmount,
        timeline: goalTimeline,
      };
      setGoals([...goals, newGoal]);
      setGoalType('');
      setGoalName('');
      setGoalAmount('');
      setGoalTimeline('');
      setShowGoalForm(false);
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const handleNext = () => {
    router.push('/profile-setup/ai-assistant');
  };

  const handleBack = () => {
    router.back();
  };

  const getGoalIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'property':
        return <Home size={20} color="#0EA5E9" />;
      case 'vehicle':
        return <Car size={20} color="#0EA5E9" />;
      case 'business':
        return <Briefcase size={20} color="#0EA5E9" />;
      case 'education':
        return <GraduationCap size={20} color="#0EA5E9" />;
      case 'travel':
        return <Plane size={20} color="#0EA5E9" />;
      default:
        return <Plus size={20} color="#0EA5E9" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#0C4A6E" />
          </TouchableOpacity>
          <Text style={styles.title}>Savings Goals</Text>
          <Text style={styles.subtitle}>Set your monthly savings target and goals</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Monthly Savings Target</Text>
          <Text style={styles.sectionDescription}>
            What percentage of your income would you like to save each month?
          </Text>

          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={50}
              step={5}
              value={savingsPercentage}
              onValueChange={setSavingsPercentage}
              minimumTrackTintColor="#0EA5E9"
              maximumTrackTintColor="#E2E8F0"
              thumbTintColor="#0EA5E9"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderMinLabel}>10%</Text>
              <Text style={styles.sliderValueLabel}>{savingsPercentage}%</Text>
              <Text style={styles.sliderMaxLabel}>50%</Text>
            </View>
          </View>

          <View style={styles.savingsInfoContainer}>
            <Text style={styles.savingsInfoText}>
              Saving {savingsPercentage}% of your income each month is a {getSavingsRating(savingsPercentage)} goal.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Goals</Text>
          <Text style={styles.sectionDescription}>
            Add specific goals you're saving for
          </Text>

          {goals.map(goal => (
            <View key={goal.id} style={styles.goalCard}>
              <View style={styles.goalIconContainer}>
                {getGoalIcon(goal.type)}
              </View>
              <View style={styles.goalDetails}>
                <Text style={styles.goalTitle}>{goal.name}</Text>
                <Text style={styles.goalSubtitle}>${goal.amount} • {goal.timeline}</Text>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteGoal(goal.id)}
              >
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          {showGoalForm ? (
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Goal Type (e.g., Property, Vehicle, Travel)"
                  value={goalType}
                  onChangeText={setGoalType}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Goal Name"
                  value={goalName}
                  onChangeText={setGoalName}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Target Amount"
                  value={goalAmount}
                  onChangeText={setGoalAmount}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Timeline (e.g., 2 years, 6 months)"
                  value={goalTimeline}
                  onChangeText={setGoalTimeline}
                />
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => setShowGoalForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.addButton]}
                  onPress={handleAddGoal}
                >
                  <Text style={styles.addButtonText}>Add Goal</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addGoalButton}
              onPress={() => setShowGoalForm(true)}
            >
              <Plus size={20} color="#0EA5E9" />
              <Text style={styles.addGoalText}>Add Goal</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Continue</Text>
          <ChevronRight size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Step 5 of 6</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
      </View>
    </SafeAreaView>
  );
}

function getSavingsRating(percentage: number): string {
  if (percentage <= 15) return 'modest';
  if (percentage <= 25) return 'good';
  if (percentage <= 35) return 'ambitious';
  return 'very ambitious';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#0C4A6E',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#0F172A',
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  slider: {
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  sliderMinLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  sliderValueLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0EA5E9',
  },
  sliderMaxLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  savingsInfoContainer: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
  },
  savingsInfoText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0C4A6E',
    textAlign: 'center',
  },
  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  goalIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalDetails: {
    flex: 1,
  },
  goalTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  goalSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addGoalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    borderStyle: 'dashed',
  },
  addGoalText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#0EA5E9',
    marginLeft: 8,
  },
  formContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    padding: 12,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  addButton: {
    backgroundColor: '#0EA5E9',
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  nextButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  footer: {
    marginTop: 'auto',
  },
  footerText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
    textAlign: 'center',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    width: '83.33%', // 5/6 of the total
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
});