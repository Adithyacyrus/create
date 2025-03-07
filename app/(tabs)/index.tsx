import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SavingsProgress } from '../../components/home/SavingsProgress';
import { RecentTransactions } from '../../components/home/RecentTransactions';
import { AISavingsTip } from '../../components/home/AISavingsTip';
import { Bell } from 'lucide-react-native';

export default function HomeScreen() {
  // Mock data for demonstration
  const userData = {
    name: 'Alex',
    monthlyIncome: 5000,
    currentSavings: 1200,
    targetSavings: 1500,
  };
  
  const recentTransactions = [
    {
      id: '1',
      title: 'Grocery Shopping',
      amount: 85.75,
      date: 'Today, 2:30 PM',
      category: 'shopping',
      type: 'expense',
    },
    {
      id: '2',
      title: 'Coffee Shop',
      amount: 4.50,
      date: 'Today, 9:15 AM',
      category: 'food',
      type: 'expense',
    },
    {
      id: '3',
      title: 'Monthly Salary',
      amount: 5000,
      date: 'Yesterday',
      category: 'income',
      type: 'income',
    },
    {
      id: '4',
      title: 'Rent Payment',
      amount: 1200,
      date: '2 days ago',
      category: 'housing',
      type: 'expense',
    },
  ];
  
  const aiTip = {
    title: 'Reduce subscription costs',
    description: 'You have 5 active subscriptions totaling $79.95/month. Consider canceling unused services like Premium Music ($12.99) which you haven\'t used in 3 months.',
    potentialSavings: 12.99,
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good afternoon,</Text>
            <Text style={styles.name}>{userData.name}</Text>
          </View>
          <View style={styles.notificationIcon}>
            <Bell size={24} color="#1E293B" />
            <View style={styles.notificationBadge} />
          </View>
        </View>
        
        <SavingsProgress 
          currentSavings={userData.currentSavings}
          targetSavings={userData.targetSavings}
          monthlyIncome={userData.monthlyIncome}
        />
        
        <AISavingsTip tip={aiTip} />
        
        <RecentTransactions transactions={recentTransactions} />
        
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
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
  name: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  notificationIcon: {
    position: 'relative',
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
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  spacer: {
    height: 100,
  },
});