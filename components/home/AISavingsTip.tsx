import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Sparkles } from 'lucide-react-native';

interface AISavingsTipProps {
  tip: {
    title: string;
    description: string;
    potentialSavings: number;
  };
}

export function AISavingsTip({ tip }: AISavingsTipProps) {
  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View style={styles.aiIconContainer}>
          <Sparkles size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.aiLabel}>AI Savings Tip</Text>
      </View>
      
      <Text style={styles.title}>{tip.title}</Text>
      <Text style={styles.description}>{tip.description}</Text>
      
      <View style={styles.savingsContainer}>
        <Text style={styles.savingsLabel}>Potential monthly savings</Text>
        <Text style={styles.savingsAmount}>${tip.potentialSavings.toLocaleString()}</Text>
      </View>
      
      <View style={styles.actions}>
        <Button 
          title="Apply Tip" 
          variant="primary"
          style={styles.applyButton}
        />
        <Button 
          title="Dismiss" 
          variant="outline"
          style={styles.dismissButton}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  aiLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4F46E5',
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    lineHeight: 22,
    marginBottom: 16,
  },
  savingsContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  savingsLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#047857',
    marginBottom: 4,
  },
  savingsAmount: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: '#047857',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  applyButton: {
    flex: 1,
    marginRight: 8,
  },
  dismissButton: {
    flex: 1,
    marginLeft: 8,
  },
});