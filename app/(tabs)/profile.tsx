import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Settings, CreditCard, Bell, Lock, CircleHelp as HelpCircle, LogOut, ChevronRight, Award } from 'lucide-react-native';

export default function ProfileScreen() {
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    savingsStreak: 42,
    savingsLevel: 'Gold Saver',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
  
  const menuItems = [
    { 
      icon: <CreditCard size={20} color="#4F46E5" />, 
      title: 'Payment Methods',
      description: 'Manage your cards and accounts'
    },
    { 
      icon: <Bell size={20} color="#4F46E5" />, 
      title: 'Notifications',
      description: 'Customize your alert preferences'
    },
    { 
      icon: <Lock size={20} color="#4F46E5" />, 
      title: 'Privacy & Security',
      description: 'Control your data and security settings'
    },
    { 
      icon: <HelpCircle size={20} color="#4F46E5" />, 
      title: 'Help & Support',
      description: 'Get assistance and find answers'
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Settings size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>
        
        <Card variant="elevated" style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <Image 
              source={{ uri: user.profileImage }} 
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Award size={20} color="#4F46E5" />
              </View>
              <Text style={styles.statValue}>{user.savingsStreak} days</Text>
              <Text style={styles.statLabel}>Savings Streak</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, { backgroundColor: '#FEF3C7' }]}>
                <Award size={20} color="#F59E0B" />
              </View>
              <Text style={styles.statValue}>{user.savingsLevel}</Text>
              <Text style={styles.statLabel}>Saver Level</Text>
            </View>
          </View>
          
          <Button 
            title="Edit Profile" 
            variant="outline"
            style={styles.editButton}
          />
        </Card>
        
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                <Text style={styles.menuDescription}>{item.description}</Text>
              </View>
              <ChevronRight size={20} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity style={styles.logoutButton}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
        
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
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  settingsButton: {
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
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 20,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 4,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  editButton: {
    width: '100%',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#1E293B',
    marginBottom: 2,
  },
  menuDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#64748B',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
    paddingVertical: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
  },
  logoutText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#EF4444',
    marginLeft: 8,
  },
  spacer: {
    height: 100,
  },
});