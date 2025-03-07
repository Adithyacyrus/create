import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';

export default function SplashScreen() {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    opacity.value = withTiming(1, { duration: 1000 });
    scale.value = withTiming(1, { duration: 1000 });
    
    // Animate text with delay
    textOpacity.value = withDelay(500, withTiming(1, { duration: 800 }));
    
    // Navigate to onboarding after splash
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  const textAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: textOpacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=200&auto=format&fit=crop' }} 
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
      
      <Animated.View style={[styles.textContainer, textAnimatedStyle]}>
        <Text style={styles.title}>Finance Assist</Text>
        <Text style={styles.subtitle}>Your Financial Wellness Partner</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderRadius: 30,
    backgroundColor: '#F0F9FF',
    marginBottom: 24,
    shadowColor: '#0369A1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: 100,
    height: 100,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#0C4A6E',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
  },
});