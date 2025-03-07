import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../ui/Card';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface SavingsProgressProps {
  currentSavings: number;
  targetSavings: number;
  monthlyIncome: number;
}

export function SavingsProgress({ 
  currentSavings, 
  targetSavings, 
  monthlyIncome 
}: SavingsProgressProps) {
  // Calculate percentage of target reached
  const targetPercentage = 30; // 30% savings goal
  const targetAmount = monthlyIncome * (targetPercentage / 100);
  const progressPercentage = Math.min((currentSavings / targetAmount) * 100, 100);
  
  // Animate progress bar
  const progress = useSharedValue(0);
  
  React.useEffect(() => {
    progress.value = withTiming(progressPercentage / 100, { duration: 1000 });
  }, [progressPercentage]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.title}>Monthly Savings Goal</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
        <Text style={styles.progressText}>{progressPercentage.toFixed(0)}%</Text>
      </View>
      
      <View style={styles.detailsContainer}>
        <View>
          <Text style={styles.detailLabel}>Current</Text>
          <Text style={styles.detailValue}>${currentSavings.toLocaleString()}</Text>
        </View>
        <View>
          <Text style={styles.detailLabel}>Target (30%)</Text>
          <Text style={styles.detailValue}>${targetAmount.toLocaleString()}</Text>
        </View>
      </View>
      
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
          {progressPercentage >= 100 
            ? "Congratulations! You've reached your savings goal this month! 🎉" 
            : `You're ${(targetAmount - currentSavings).toLocaleString()} away from your 30% savings goal.`}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 12,
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 6,
  },
  progressText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#4F46E5',
    width: 50,
    textAlign: 'right',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  detailValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  messageContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
  },
  message: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
  },
});