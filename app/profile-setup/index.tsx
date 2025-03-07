import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Briefcase, Building2, Clock, GraduationCap, ChevronRight } from 'lucide-react-native';

export default function ProfileSetupScreen() {
  const handleOccupationSelect = (occupation: string) => {
    router.push({
      pathname: '/profile-setup/occupation-details',
      params: { occupation }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200&auto=format&fit=crop' }} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Let's set up your profile</Text>
        <Text style={styles.subtitle}>Select your occupation category</Text>
      </View>

      <View style={styles.occupationsContainer}>
        <TouchableOpacity 
          style={styles.occupationCard}
          onPress={() => handleOccupationSelect('employee')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
            <Briefcase size={28} color="#2563EB" />
          </View>
          <View style={styles.occupationInfo}>
            <Text style={styles.occupationTitle}>Employee</Text>
            <Text style={styles.occupationDescription}>Regular salary from an employer</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.occupationCard}
          onPress={() => handleOccupationSelect('business')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
            <Building2 size={28} color="#16A34A" />
          </View>
          <View style={styles.occupationInfo}>
            <Text style={styles.occupationTitle}>Business Owner</Text>
            <Text style={styles.occupationDescription}>Run your own business or company</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.occupationCard}
          onPress={() => handleOccupationSelect('daily-wage')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FEF2F2' }]}>
            <Clock size={28} color="#DC2626" />
          </View>
          <View style={styles.occupationInfo}>
            <Text style={styles.occupationTitle}>Daily Wage Worker</Text>
            <Text style={styles.occupationDescription}>Earn on a daily or weekly basis</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.occupationCard}
          onPress={() => handleOccupationSelect('student')}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#F5F3FF' }]}>
            <GraduationCap size={28} color="#7C3AED" />
          </View>
          <View style={styles.occupationInfo}>
            <Text style={styles.occupationTitle}>Student</Text>
            <Text style={styles.occupationDescription}>Part-time income or allowance</Text>
          </View>
          <ChevronRight size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Step 1 of 6</Text>
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
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#0C4A6E',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  occupationsContainer: {
    flex: 1,
  },
  occupationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  occupationInfo: {
    flex: 1,
  },
  occupationTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  occupationDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
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
    width: '16.67%', // 1/6 of the total
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
});