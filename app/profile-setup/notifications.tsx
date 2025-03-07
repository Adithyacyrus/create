import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, Bell, Clock, Calendar } from 'lucide-react-native';

export default function NotificationsScreen() {
  const [loanReminders, setLoanReminders] = useState(true);
  const [investmentReminders, setInvestmentReminders] = useState(true);
  const [savingsReminders, setSavingsReminders] = useState(true);
  const [reminderDays, setReminderDays] = useState(5);
  const [reminderTime, setReminderTime] = useState('morning');

  const handleNext = () => {
    router.push('/profile-setup/savings-goals');
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#0C4A6E" />
          </TouchableOpacity>
          <Text style={styles.title}>Smart Notifications</Text>
          <Text style={styles.subtitle}>Customize your reminder preferences</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notification Types</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: '#FEF2F2' }]}>
                <Bell size={20} color="#EF4444" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Loan Payment Reminders</Text>
                <Text style={styles.settingDescription}>Get notified before loan payments are due</Text>
              </View>
            </View>
            <Switch
              value={loanReminders}
              onValueChange={setLoanReminders}
              trackColor={{ false: '#E2E8F0', true: '#0EA5E9' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
                <Bell size={20} color="#10B981" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Investment Reminders</Text>
                <Text style={styles.settingDescription}>Get notified before investment dues</Text>
              </View>
            </View>
            <Switch
              value={investmentReminders}
              onValueChange={setInvestmentReminders}
              trackColor={{ false: '#E2E8F0', true: '#0EA5E9' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
                <Bell size={20} color="#3B82F6" />
              </View>
              <View>
                <Text style={styles.settingTitle}>Savings Goal Reminders</Text>
                <Text style={styles.settingDescription}>Get notified about your savings progress</Text>
              </View>
            </View>
            <Switch
              value={savingsReminders}
              onValueChange={setSavingsReminders}
              trackColor={{ false: '#E2E8F0', true: '#0EA5E9' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminder Settings</Text>
          
          <Text style={styles.settingLabel}>Days in advance</Text>
          <View style={styles.daysContainer}>
            {[1, 3, 5, 7].map(days => (
              <TouchableOpacity 
                key={days}
                style={[
                  styles.dayButton,
                  reminderDays === days && styles.activeDayButton
                ]}
                onPress={() => setReminderDays(days)}
              >
                <Text style={[
                  styles.dayButtonText,
                  reminderDays === days && styles.activeDayButtonText
                ]}>{days} {days === 1 ? 'day' : 'days'}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.settingLabel}>Preferred time</Text>
          <View style={styles.timeContainer}>
            <TouchableOpacity 
              style={[
                styles.timeButton,
                reminderTime === 'morning' && styles.activeTimeButton
              ]}
              onPress={() => setReminderTime('morning')}
            >
              <Clock size={18} color={reminderTime === 'morning' ? '#FFFFFF' : '#64748B'} />
              <Text style={[
                styles.timeButtonText,
                reminderTime === 'morning' && styles.activeTimeButtonText
              ]}>Morning (9 AM)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.timeButton,
                reminderTime === 'afternoon' && styles.activeTimeButton
              ]}
              onPress={() => setReminderTime('afternoon')}
            >
              <Clock size={18} color={reminderTime === 'afternoon' ? '#FFFFFF' : '#64748B'} />
              <Text style={[
                styles.timeButtonText,
                reminderTime === 'afternoon' && styles.activeTimeButtonText
              ]}>Afternoon (1 PM)</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.timeButton,
                reminderTime === 'evening' && styles.activeTimeButton
              ]}
              onPress={() => setReminderTime('evening')}
            >
              <Clock size={18} color={reminderTime === 'evening' ? '#FFFFFF' : '#64748B'} />
              <Text style={[
                styles.timeButtonText,
                reminderTime === 'evening' && styles.activeTimeButtonText
              ]}>Evening (6 PM)</Text>
            </TouchableOpacity>
          </View>
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
        <Text style={styles.footerText}>Step 4 of 6</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>
      </View>
    </SafeAreaView>
  );
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
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  settingLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
  },
  daysContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  dayButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 4,
  },
  activeDayButton: {
    backgroundColor: '#0EA5E9',
  },
  dayButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeDayButtonText: {
    color: '#FFFFFF',
  },
  timeContainer: {
    marginBottom: 16,
  },
  timeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  activeTimeButton: {
    backgroundColor: '#0EA5E9',
  },
  timeButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  activeTimeButtonText: {
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
    width: '66.67%', // 4/6 of the total
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
});