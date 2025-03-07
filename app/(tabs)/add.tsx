import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { ShoppingBag, Coffee, Chrome as Home, Car, Smartphone, Plus, Minus, DollarSign } from 'lucide-react-native';

export default function AddTransactionScreen() {
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const categories = [
    { id: 'housing', name: 'Housing', icon: <Home size={24} color="#6366F1" /> },
    { id: 'food', name: 'Food', icon: <Coffee size={24} color="#10B981" /> },
    { id: 'transport', name: 'Transport', icon: <Car size={24} color="#EC4899" /> },
    { id: 'shopping', name: 'Shopping', icon: <ShoppingBag size={24} color="#F59E0B" /> },
    { id: 'utilities', name: 'Utilities', icon: <Smartphone size={24} color="#8B5CF6" /> },
  ];
  
  const handleAddTransaction = () => {
    // Logic to add transaction
    console.log({
      type: transactionType,
      amount: parseFloat(amount),
      description,
      category: selectedCategory,
      date: new Date(),
    });
    
    // Reset form
    setAmount('');
    setDescription('');
    setSelectedCategory('');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Add Transaction</Text>
        </View>
        
        <Card variant="elevated" style={styles.card}>
          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'expense' && styles.selectedTypeButton
              ]}
              onPress={() => setTransactionType('expense')}
            >
              <Minus size={20} color={transactionType === 'expense' ? '#FFFFFF' : '#64748B'} />
              <Text style={[
                styles.typeText,
                transactionType === 'expense' && styles.selectedTypeText
              ]}>
                Expense
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.typeButton,
                transactionType === 'income' && styles.selectedTypeButton,
                transactionType === 'income' && styles.incomeButton
              ]}
              onPress={() => setTransactionType('income')}
            >
              <Plus size={20} color={transactionType === 'income' ? '#FFFFFF' : '#64748B'} />
              <Text style={[
                styles.typeText,
                transactionType === 'income' && styles.selectedTypeText
              ]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <DollarSign size={24} color="#64748B" />
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor="#94A3B8"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              placeholder="What was this for?"
              placeholderTextColor="#94A3B8"
            />
          </View>
          
          {transactionType === 'expense' && (
            <View style={styles.categoriesContainer}>
              <Text style={styles.categoriesLabel}>Category</Text>
              <View style={styles.categoriesGrid}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryItem,
                      selectedCategory === category.id && styles.selectedCategoryItem
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <View style={[
                      styles.categoryIcon,
                      selectedCategory === category.id && styles.selectedCategoryIcon
                    ]}>
                      {category.icon}
                    </View>
                    <Text style={[
                      styles.categoryText,
                      selectedCategory === category.id && styles.selectedCategoryText
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          <Button
            title="Add Transaction"
            variant="primary"
            style={styles.button}
            onPress={handleAddTransaction}
            disabled={!amount || (transactionType === 'expense' && !selectedCategory)}
          />
        </Card>
        
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
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#1E293B',
  },
  card: {
    marginHorizontal: 16,
    padding: 20,
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  selectedTypeButton: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  incomeButton: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  typeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  selectedTypeText: {
    color: '#FFFFFF',
  },
  amountContainer: {
    marginBottom: 20,
  },
  amountLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#1E293B',
    paddingVertical: 16,
    marginLeft: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#1E293B',
    backgroundColor: '#FFFFFF',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#334155',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  categoryItem: {
    width: '33%',
    padding: 4,
  },
  categoryIcon: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginBottom: 8,
  },
  selectedCategoryIcon: {
    backgroundColor: '#EFF6FF',
  },
  categoryText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  selectedCategoryItem: {
    opacity: 1,
  },
  selectedCategoryText: {
    color: '#4F46E5',
  },
  button: {
    width: '100%',
  },
  spacer: {
    height: 100,
  },
});