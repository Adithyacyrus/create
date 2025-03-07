import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function Card({ children, style, variant = 'default' }: CardProps) {
  return (
    <View style={[styles.card, styles[`${variant}Card`], style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  defaultCard: {
    backgroundColor: '#FFFFFF',
  },
  elevatedCard: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
});