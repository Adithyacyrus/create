import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trophy } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface SavingsChallengeProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    daysLeft: number;
    reward: string;
  };
}

export function SavingsChallenge({ challenge }: SavingsChallengeProps) {
  const progressPercentage = Math.min((challenge.current / challenge.target) * 100, 100);
  
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
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Trophy size={20} color="#FFFFFF" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{challenge.title}</Text>
          <Text style={styles.daysLeft}>{challenge.daysLeft} days left</Text>
        </View>
      </View>
      
      <Text style={styles.description}>{challenge.description}</Text>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>Progress</Text>
          <Text style={styles.progressPercentage}>{progressPercentage.toFixed(0)}%</Text>
        </View>
        
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={styles.currentAmount}>${challenge.current.toLocaleString()}</Text>
          <Text style={styles.targetAmount}>/${challenge.target.toLocaleString()}</Text>
        </View>
      </View>
      
      <View style={styles.rewardContainer}>
        <Text style={styles.rewardLabel}>Reward</Text>
        <Text style={styles.rewardText}>{challenge.reward}</Text>
      </View>
      
      <Button 
        title={progressPercentage >= 100 ? "Claim Reward" : "View Details"} 
        variant={progressPercentage >= 100 ? "primary" : "outline"}
        style={styles.button}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
  },
  daysLeft: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#EF4444',
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
    lineHeight: 20,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
  },
  progressPercentage: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#4F46E5',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E2E8F0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 5,
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  currentAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#334155',
  },
  targetAmount: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  rewardContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  rewardLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#047857',
    marginBottom: 4,
  },
  rewardText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: '#047857',
  },
  button: {
    width: '100%',
  },
});