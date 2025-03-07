import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowRight, Check } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const onboardingData = [
  {
    id: '1',
    title: 'Welcome to Finance Assist',
    description: 'Your personal financial wellness companion that helps you manage your finances with ease.',
    image: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Set Financial Goals',
    description: 'Define your savings goals, track your progress, and achieve financial freedom.',
    image: 'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Smart Notifications',
    description: 'Never miss a payment with timely reminders for loans, investments, and savings goals.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=500&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations and insights to optimize your financial decisions.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const progressValue = useSharedValue(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      router.replace('/auth');
    }
  };

  const handleSkip = () => {
    router.replace('/auth');
  };

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setCurrentIndex(index);
    progressValue.value = withTiming(index / (onboardingData.length - 1));
  };

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${(progressValue.value * 100)}%`,
      backgroundColor: interpolateColor(
        progressValue.value,
        [0, 0.33, 0.66, 1],
        ['#0EA5E9', '#0284C7', '#0369A1', '#0C4A6E']
      ),
    };
  });

  const renderItem = ({ item }: { item: typeof onboardingData[0] }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
      />

      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground} />
          <Animated.View style={[styles.progressBar, progressBarStyle]} />
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          {currentIndex === onboardingData.length - 1 ? (
            <Check size={24} color="#FFFFFF" />
          ) : (
            <ArrowRight size={24} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  skipContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  skipText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#64748B',
  },
  slide: {
    width,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  imageContainer: {
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#0C4A6E',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  progressContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginRight: 24,
    overflow: 'hidden',
  },
  progressBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E2E8F0',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  nextButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#0EA5E9',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});