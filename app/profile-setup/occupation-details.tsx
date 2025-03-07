import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DollarSign, Calendar, ArrowLeft, ChevronRight } from 'lucide-react-native';

export default function OccupationDetailsScreen() {
  const { occupation } = useLocalSearchParams<{ occupation: string }>();
  const [incomeAmount, setIncomeAmount] = useState('');
  const [incomeFrequency, setIncomeFrequency] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const getTitle = () => {
    switch (occupation) {
      case 'employee':
        return 'Employee Income Details';
      case 'business':
        return 'Business Income Details';
      case 'daily-wage':
        return 'Daily Wage Details';
      case 'student':
        return 'Student Income Details';
      default:
        return 'Income Details';
    }
  };

  const getSubtitle = () => {
    switch (occupation) {
      case 'employee':
        return 'Enter your monthly salary information';
      case 'business':
        return 'Enter your business revenue information';
      case 'daily-wage':
        return 'Enter your wage information';
      case 'student':
        return 'Enter your allowance or part-time income';
      default:
        return 'Enter your income information';
    }
  };

  const handleNext = () => {
    router.push('/profile-setup/financial-assessment');
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
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.subtitle}>{getSubtitle()}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Income Amount</Text>
          <View style={styles.inputWrapper}>
            <DollarSign size={20} color="#64748B" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              value={incomeAmount}
              onChangeText={setIncomeAmount}
              keyboardType="numeric"
            />
          </View>

          <Text style={styles.sectionTitle}>Income Frequency</Text>
          <View style={styles.frequencyContainer}>
            <TouchableOpacity 
              style={[
                styles.frequencyButton,
                incomeFrequency === 'daily' && styles.activeFrequency
              ]}
              onPress={() => setIncomeFrequency('daily')}
            >
              <Text style={[
                styles.frequencyText,
                incomeFrequency === 'daily' && styles.activeFrequencyText
              ]}>Daily</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.frequencyButton,
                incomeFrequency === 'weekly' && styles.activeFrequency
              ]}
              onPress={() => setIncomeFrequency('weekly')}
            >
              <Text style={[
                styles.frequencyText,
                incomeFrequency === 'weekly' && styles.activeFrequencyText
              ]}>Weekly</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[
                styles.frequencyButton,
                incomeFrequency === 'monthly' && styles.activeFrequency
              ]}
              onPress={() => setIncomeFrequency('monthly')}
            >
              <Text style={[
                styles.frequencyText,
                incomeFrequency === 'monthly' && styles.activeFrequencyText
              ]}>Monthly</Text>
            </TouchableOpacity>
          </View>

          {occupation === 'employee' && (
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.sectionTitle}>Payment Date</Text>
              <View style={styles.inputWrapper}>
                <Calendar size={20} color="#64748B" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 1st of every month"
                />
              </View>
            </View>
          )}

          {occupation === 'business' && (
            <View style={styles.additionalInfoContainer}>
              <Text style={styles.sectionTitle}>Business Type</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., Retail, Service, etc."
                />
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={styles.nextButton}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Continue</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Step 2 of 6</Text>
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
    marginBottom: 32,
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
  formContainer: {
    flex: 1,
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#334155',
    marginBottom: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#334155',
    paddingVertical: 16,
  },
  frequencyContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  frequencyButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingVertical: 16,
    marginHorizontal: 4,
  },
  activeFrequency: {
    backgroundColor: '#0EA5E9',
  },
  frequencyText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  activeFrequencyText: {
    color: '#FFFFFF',
  },
  additionalInfoContainer: {
    marginBottom: 16,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
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
    width: '33.33%', // 2/6 of the total
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
});