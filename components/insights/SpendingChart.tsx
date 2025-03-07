import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Card } from '../ui/Card';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface CategorySpending {
  category: string;
  amount: number;
  color: string;
}

interface SpendingChartProps {
  data: CategorySpending[];
  totalSpending: number;
}

export function SpendingChart({ data, totalSpending }: SpendingChartProps) {
  // Sort data by amount (descending)
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  
  return (
    <Card variant="elevated" style={styles.card}>
      <Text style={styles.title}>Monthly Spending Breakdown</Text>
      
      <View style={styles.chartContainer}>
        {sortedData.map((item, index) => {
          const percentage = (item.amount / totalSpending) * 100;
          
          // Animation for bar width
          const width = useSharedValue(0);
          
          React.useEffect(() => {
            width.value = withTiming(percentage, { duration: 1000 });
          }, [percentage]);
          
          const barStyle = useAnimatedStyle(() => {
            return {
              width: `${width.value}%`,
              backgroundColor: item.color,
            };
          });
          
          return (
            <View key={index} style={styles.categoryRow}>
              <View style={styles.categoryInfo}>
                <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
                <Text style={styles.categoryName}>{item.category}</Text>
              </View>
              
              <View style={styles.barContainer}>
                <Animated.View style={[styles.bar, barStyle]} />
              </View>
              
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>${item.amount.toLocaleString()}</Text>
                <Text style={styles.percentage}>{percentage.toFixed(1)}%</Text>
              </View>
            </View>
          );
        })}
      </View>
      
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Spending</Text>
        <Text style={styles.totalAmount}>${totalSpending.toLocaleString()}</Text>
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
    marginBottom: 20,
  },
  chartContainer: {
    marginBottom: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
  },
  barContainer: {
    flex: 1,
    height: 12,
    backgroundColor: '#F1F5F9',
    borderRadius: 6,
    overflow: 'hidden',
    marginHorizontal: 12,
  },
  bar: {
    height: '100%',
    borderRadius: 6,
  },
  amountContainer: {
    width: 80,
    alignItems: 'flex-end',
  },
  amount: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
  },
  percentage: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  totalLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#334155',
  },
  totalAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
});