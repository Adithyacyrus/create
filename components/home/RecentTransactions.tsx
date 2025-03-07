import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Card } from '../ui/Card';
import { ShoppingBag, Coffee, Chrome as Home, Car, Smartphone, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: 'shopping' | 'food' | 'housing' | 'transport' | 'utilities' | 'income' | 'other';
  type: 'expense' | 'income';
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getCategoryIcon = (category: string, size = 20) => {
    switch (category) {
      case 'shopping':
        return <ShoppingBag size={size} color="#F59E0B" />;
      case 'food':
        return <Coffee size={size} color="#10B981" />;
      case 'housing':
        return <Home size={size} color="#6366F1" />;
      case 'transport':
        return <Car size={size} color="#EC4899" />;
      case 'utilities':
        return <Smartphone size={size} color="#8B5CF6" />;
      default:
        return <ShoppingBag size={size} color="#94A3B8" />;
    }
  };

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <View style={styles.iconContainer}>
        {item.type === 'income' ? (
          <ArrowDownLeft size={20} color="#10B981" />
        ) : (
          getCategoryIcon(item.category)
        )}
      </View>
      
      <View style={styles.transactionDetails}>
        <Text style={styles.transactionTitle}>{item.title}</Text>
        <Text style={styles.transactionDate}>{item.date}</Text>
      </View>
      
      <Text style={[
        styles.transactionAmount,
        item.type === 'income' ? styles.incomeText : styles.expenseText
      ]}>
        {item.type === 'income' ? '+' : '-'}${Math.abs(item.amount).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
  },
  viewAll: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#4F46E5',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#334155',
    marginBottom: 2,
  },
  transactionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#64748B',
  },
  transactionAmount: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  incomeText: {
    color: '#10B981',
  },
  expenseText: {
    color: '#EF4444',
  },
  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
});