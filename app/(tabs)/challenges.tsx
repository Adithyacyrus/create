import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SavingsChallenge } from '../../components/challenges/SavingsChallenge';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Trophy, Filter, Plus } from 'lucide-react-native';

export default function ChallengesScreen() {
  // Mock data for demonstration
  const challenges = [
    {
      id: '1',
      title: 'Coffee Break Challenge',
      description: 'Save money by making coffee at home instead of buying it. Put the difference into your savings.',
      target: 60,
      current: 45,
      daysLeft: 5,
      reward: 'Unlock exclusive budgeting tips',
    },
    {
      id: '2',
      title: '30-Day No Takeout',
      description: 'Cook all meals at home for 30 days and save the difference between grocery costs and takeout.',
      target: 200,
      current: 120,
      daysLeft: 12,
      reward: '$20 gift card to your favorite grocery store',
    },
    {
      id: '3',
      title: 'Weekend Spending Freeze',
      description: 'No spending on non-essentials during weekends for a month.',
      target: 300,
      current: 300,
      daysLeft: 0,
      reward: 'Premium budget template',
    },
  ];
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Savings Challenges</Text>
            <Text style={styles.subtitle}>Complete challenges to boost your savings</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#4F46E5" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsContainer}>
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Active Challenges</Text>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>$465</Text>
            <Text style={styles.statLabel}>Total Saved</Text>
          </Card>
          
          <Card variant="elevated" style={styles.statCard}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </Card>
        </View>
        
        {challenges.map((challenge) => (
          <SavingsChallenge key={challenge.id} challenge={challenge} />
        ))}
        
        <Card variant="outlined" style={styles.newChallengeCard}>
          <View style={styles.newChallengeIcon}>
            <Plus size={24} color="#4F46E5" />
          </View>
          <Text style={styles.newChallengeTitle}>Create Custom Challenge</Text>
          <Text style={styles.newChallengeDescription}>
            Design your own savings challenge based on your personal goals and habits.
          </Text>
          <Button 
            title="Create Challenge" 
            variant="outline"
            style={styles.newChallengeButton}
          />
        </Card>
        
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#4F46E5',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  newChallengeCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    alignItems: 'center',
  },
  newChallengeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  newChallengeTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  newChallengeDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  newChallengeButton: {
    width: '100%',
  },
  spacer: {
    height: 100,
  },
});