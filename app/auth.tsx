import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronDown, Mail, Phone, Lock, Facebook, User, ChevronRight, Globe } from 'lucide-react-native';
import CountryFlag from 'react-native-country-flag';

// Country data for selection
const countries = [
  { code: 'US', name: 'United States', languages: ['English', 'Spanish'] },
  { code: 'GB', name: 'United Kingdom', languages: ['English'] },
  { code: 'CA', name: 'Canada', languages: ['English', 'French'] },
  { code: 'AU', name: 'Australia', languages: ['English'] },
  { code: 'IN', name: 'India', languages: ['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'] },
  { code: 'SG', name: 'Singapore', languages: ['English', 'Mandarin', 'Malay', 'Tamil'] },
  { code: 'DE', name: 'Germany', languages: ['German', 'English'] },
  { code: 'FR', name: 'France', languages: ['French', 'English'] },
  { code: 'JP', name: 'Japan', languages: ['Japanese', 'English'] },
];

export default function AuthScreen() {
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | 'username' | 'facebook'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showCountrySelector, setShowCountrySelector] = useState(false);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(countries[0].languages[0]);

  const handleLogin = () => {
    // In a real app, you would validate inputs and authenticate the user
    router.replace('/profile-setup');
  };

  const handleFacebookLogin = () => {
    // In a real app, you would implement Facebook OAuth
    router.replace('/profile-setup');
  };

  const selectCountry = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setSelectedLanguage(country.languages[0]);
    setShowCountrySelector(false);
  };

  const selectLanguage = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200&auto=format&fit=crop' }} 
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Finance Assist</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.regionContainer}>
          <TouchableOpacity 
            style={styles.countrySelector} 
            onPress={() => setShowCountrySelector(!showCountrySelector)}
          >
            <CountryFlag isoCode={selectedCountry.code} size={24} />
            <Text style={styles.selectorText}>{selectedCountry.name}</Text>
            <ChevronDown size={20} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.languageSelector} 
            onPress={() => setShowLanguageSelector(!showLanguageSelector)}
          >
            <Globe size={20} color="#0EA5E9" />
            <Text style={styles.selectorText}>{selectedLanguage}</Text>
            <ChevronDown size={20} color="#64748B" />
          </TouchableOpacity>
        </View>

        {showCountrySelector && (
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
              {countries.map((country) => (
                <TouchableOpacity 
                  key={country.code} 
                  style={styles.dropdownItem}
                  onPress={() => selectCountry(country)}
                >
                  <CountryFlag isoCode={country.code} size={20} />
                  <Text style={styles.dropdownText}>{country.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {showLanguageSelector && (
          <View style={styles.dropdownContainer}>
            <ScrollView style={styles.dropdown} nestedScrollEnabled={true}>
              {selectedCountry.languages.map((language) => (
                <TouchableOpacity 
                  key={language} 
                  style={styles.dropdownItem}
                  onPress={() => selectLanguage(language)}
                >
                  <Text style={styles.dropdownText}>{language}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.authMethodsContainer}>
          <TouchableOpacity 
            style={[
              styles.authMethodButton, 
              authMethod === 'email' && styles.activeAuthMethod
            ]}
            onPress={() => setAuthMethod('email')}
          >
            <Mail size={20} color={authMethod === 'email' ? '#FFFFFF' : '#64748B'} />
            <Text style={[
              styles.authMethodText,
              authMethod === 'email' && styles.activeAuthMethodText
            ]}>Email</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.authMethodButton, 
              authMethod === 'phone' && styles.activeAuthMethod
            ]}
            onPress={() => setAuthMethod('phone')}
          >
            <Phone size={20} color={authMethod === 'phone' ? '#FFFFFF' : '#64748B'} />
            <Text style={[
              styles.authMethodText,
              authMethod === 'phone' && styles.activeAuthMethodText
            ]}>Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.authMethodButton, 
              authMethod === 'username' && styles.activeAuthMethod
            ]}
            onPress={() => setAuthMethod('username')}
          >
            <User size={20} color={authMethod === 'username' ? '#FFFFFF' : '#64748B'} />
            <Text style={[
              styles.authMethodText,
              authMethod === 'username' && styles.activeAuthMethodText
            ]}>Username</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.authMethodButton, 
              authMethod === 'facebook' && styles.activeAuthMethod
            ]}
            onPress={() => setAuthMethod('facebook')}
          >
            <Facebook size={20} color={authMethod === 'facebook' ? '#FFFFFF' : '#64748B'} />
            <Text style={[
              styles.authMethodText,
              authMethod === 'facebook' && styles.activeAuthMethodText
            ]}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {authMethod === 'email' && (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Mail size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
        )}

        {authMethod === 'phone' && (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Phone size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
        )}

        {authMethod === 'username' && (
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <User size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.inputWrapper}>
              <Lock size={20} color="#64748B" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>
        )}

        {authMethod === 'facebook' && (
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity 
              style={styles.facebookButton}
              onPress={handleFacebookLogin}
            >
              <Facebook size={24} color="#FFFFFF" />
              <Text style={styles.facebookButtonText}>Continue with Facebook</Text>
            </TouchableOpacity>
          </View>
        )}

        {authMethod !== 'facebook' && (
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={handleLogin}
          >
            <Text style={styles.loginButtonText}>Sign In</Text>
            <ChevronRight size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <TouchableOpacity>
            <Text style={styles.signupText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    width: 80,
    height: 80,
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
  regionContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  countrySelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
  },
  languageSelector: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginLeft: 8,
  },
  selectorText: {
    flex: 1,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
    marginLeft: 8,
  },
  dropdownContainer: {
    marginBottom: 16,
  },
  dropdown: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  dropdownText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    marginLeft: 8,
  },
  authMethodsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  authMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
    marginBottom: 8,
    minWidth: '48%',
  },
  activeAuthMethod: {
    backgroundColor: '#0EA5E9',
  },
  authMethodText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  activeAuthMethodText: {
    color: '#FFFFFF',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginBottom: 16,
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
  socialLoginContainer: {
    marginBottom: 24,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1877F2',
    borderRadius: 12,
    padding: 16,
  },
  facebookButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0EA5E9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  loginButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  footerText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginRight: 4,
  },
  signupText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#0EA5E9',
  },
});