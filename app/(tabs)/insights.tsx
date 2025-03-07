import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpendingChart } from '../../components/insights/SpendingChart';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { TrendingUp, TrendingDown, DollarSign, Calendar } from 'lucide-react-native';

export default function InsightsScreen() {
  // Mock data for demonstration
  const spendingData = [
    { category: 'Housing', amount: 1200, color: '#6366F1' },
    { category: 'Food', amount: 450, color: '#10B981' },
    { category: 'Transport', amount: 350, color: '#EC4899' },
    { category: 'Shopping', amount: 280, color: '#F59E0B' },
    { category: 'Utilities', amount: 180, color: '#8B5CF6' },
    { category: 'Other', amount: 140, color: '#94A3B8' },
  ];
  
  const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0);
  
  const savingsRate = 30; // 30% savings rate
  const monthlyIncome = 5000;
  const monthlySavings = 1500; // 30% of income
  const actualSavingsRate = (monthlySavings / monthlyIncome) * 100;
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Financial Insights</Text>
          <View style={styles.periodSelector}>
            <Calendar size={16} color="#4F46E5" />
            <Text style={styles.periodText}>September 2025</Text>
          </View>
        </View>
        
        <View style={styles.summaryCards}>
          <Card variant="elevated" style={styles.summaryCard}>
            <View style={styles.summaryIconContainer}>
              <DollarSign size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.summaryLabel}>Monthly Income</Text>
            <Text style={styles.summaryValue}>${monthlyIncome.toLocaleString()}</Text>
          </Card>
          
          <Card variant="elevated" style={styles.summaryCard}>
            <View style={[styles.summaryIconContainer, { backgroundColor: actualSavingsRate >= savingsRate ? '#10B981' : '#EF4444' }]}>
              {actualSavingsRate >= savingsRate ? (
                <TrendingUp size={20} color="#FFFFFF" />
              ) : (
                <TrendingDown size={20} color="#FFFFFF" />
              )}
            </View>
            <Text style={styles.summaryLabel}>Savings Rate</Text>
            <Text style={[
              styles.summaryValue,
              actualSavingsRate >= savingsRate ? styles.positiveValue : styles.negativeValue
            ]}>
              {actualSavingsRate.toFixed(1)}%
            </Text>
          </Card>
        </View>
        
        <SpendingChart data={spendingData} totalSpending={totalSpending} />
        
        <Card variant="elevated" style={styles.insightCard}>
          <Text style={styles.insightTitle}>AI Financial Analysis</Text>
          <Text style={styles.insightDescription}>
            Based on your spending patterns, you're on track to reach your 30% savings goal this month. Your food expenses are 15% lower than last month, which is contributing positively to your savings.
          </Text>
          <View style={styles.insightHighlight}>
            <Text style={styles.highlightText}>
              Tip: Consider setting up automatic transfers of 30% of your income to your savings account on payday to make saving effortless.
            </Text>
          </View>
          <Button 
            title="Get Detailed Analysis" 
            variant="primary"
            style={styles.insightButton}
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
    marginBottom: 8,
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  periodText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4F46E5',
    marginLeft: 6,
  },
  summaryCards: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  summaryCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    alignItems: 'center',
  },
  summaryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#1E293B',
  },
  positiveValue: {
    color: '#10B981',
  },
  negativeValue: {
    color: '#EF4444',
  },
  insightCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  insightTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
  },
  insightDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 16,
  },
  insightHighlight: {
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  highlightText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 22,
  },
  insightButton: {
    width: '100%',
  },
  spacer: {
    height: 100,
  },
});