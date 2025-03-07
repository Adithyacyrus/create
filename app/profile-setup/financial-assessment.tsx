import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, ChevronRight, Plus, CreditCard, Home, Car, Smartphone, DollarSign, Trash2 } from 'lucide-react-native';

type Loan = {
  id: string;
  type: string;
  amount: string;
  paymentDate: string;
};

type Investment = {
  id: string;
  type: string;
  amount: string;
  dueDate: string;
};

export default function FinancialAssessmentScreen() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [showLoanForm, setShowLoanForm] = useState(false);
  const [showInvestmentForm, setShowInvestmentForm] = useState(false);
  
  // Form states
  const [loanType, setLoanType] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [loanPaymentDate, setLoanPaymentDate] = useState('');
  const [investmentType, setInvestmentType] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [investmentDueDate, setInvestmentDueDate] = useState('');

  const handleAddLoan = () => {
    if (loanType && loanAmount && loanPaymentDate) {
      const newLoan = {
        id: Date.now().toString(),
        type: loanType,
        amount: loanAmount,
        paymentDate: loanPaymentDate,
      };
      setLoans([...loans, newLoan]);
      setLoanType('');
      setLoanAmount('');
      setLoanPaymentDate('');
      setShowLoanForm(false);
    }
  };

  const handleAddInvestment = () => {
    if (investmentType && investmentAmount && investmentDueDate) {
      const newInvestment = {
        id: Date.now().toString(),
        type: investmentType,
        amount: investmentAmount,
        dueDate: investmentDueDate,
      };
      setInvestments([...investments, newInvestment]);
      setInvestmentType('');
      setInvestmentAmount('');
      setInvestmentDueDate('');
      setShowInvestmentForm(false);
    }
  };

  const handleDeleteLoan = (id: string) => {
    setLoans(loans.filter(loan => loan.id !== id));
  };

  const handleDeleteInvestment = (id: string) => {
    setInvestments(investments.filter(investment => investment.id !== id));
  };

  const handleNext = () => {
    router.push('/profile-setup/notifications');
  };

  const handleBack = () => {
    router.back();
  };

  const getLoanIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'personal':
        return <CreditCard size={20} color="#0EA5E9" />;
      case 'home':
        return <Home size={20} color="#0EA5E9" />;
      case 'car':
      case 'vehicle':
        return <Car size={20} color="#0EA5E9" />;
      default:
        return <DollarSign size={20} color="#0EA5E9" />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#0C4A6E" />
          </TouchableOpacity>
          <Text style={styles.title}>Financial Assessment</Text>
          <Text style={styles.subtitle}>Add your existing loans and investments</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Existing Loans</Text>
          <Text style={styles.sectionDescription}>
            Add any loans or credit obligations you currently have
          </Text>

          {loans.map(loan => (
            <View key={loan.id} style={styles.itemCard}>
              <View style={styles.itemIconContainer}>
                {getLoanIcon(loan.type)}
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{loan.type} Loan</Text>
                <Text style={styles.itemSubtitle}>${loan.amount} • Due on {loan.paymentDate}</Text>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteLoan(loan.id)}
              >
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          {showLoanForm ? (
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Loan Type (e.g., Personal, Home, Car)"
                  value={loanType}
                  onChangeText={setLoanType}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  value={loanAmount}
                  onChangeText={setLoanAmount}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Payment Date (e.g., 15th of every month)"
                  value={loanPaymentDate}
                  onChangeText={setLoanPaymentDate}
                />
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => setShowLoanForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.addButton]}
                  onPress={handleAddLoan}
                >
                  <Text style={styles.addButtonText}>Add Loan</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addItemButton}
              onPress={() => setShowLoanForm(true)}
            >
              <Plus size={20} color="#0EA5E9" />
              <Text style={styles.addItemText}>Add Loan</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Investments</Text>
          <Text style={styles.sectionDescription}>
            Add any investments or SIPs you currently have
          </Text>

          {investments.map(investment => (
            <View key={investment.id} style={styles.itemCard}>
              <View style={styles.itemIconContainer}>
                <DollarSign size={20} color="#10B981" />
              </View>
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>{investment.type}</Text>
                <Text style={styles.itemSubtitle}>${investment.amount} • Due on {investment.dueDate}</Text>
              </View>
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => handleDeleteInvestment(investment.id)}
              >
                <Trash2 size={18} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ))}

          {showInvestmentForm ? (
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Investment Type (e.g., SIP, Mutual Fund)"
                  value={investmentType}
                  onChangeText={setInvestmentType}
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Amount"
                  value={investmentAmount}
                  onChangeText={setInvestmentAmount}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Due Date (e.g., 5th of every month)"
                  value={investmentDueDate}
                  onChangeText={setInvestmentDueDate}
                />
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={() => setShowInvestmentForm(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.addButton]}
                  onPress={handleAddInvestment}
                >
                  <Text style={styles.addButtonText}>Add Investment</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.addItemButton}
              onPress={() => setShowInvestmentForm(true)}
            >
              <Plus size={20} color="#0EA5E9" />
              <Text style={styles.addItemText}>Add Investment</Text>
            </TouchableOpacity>
          )}
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
        <Text style={styles.footerText}>Step 3 of 6</Text>
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
    marginBottom: 8,
  },
  sectionDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
    marginBottom: 16,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#0F172A',
    marginBottom: 4,
  },
  itemSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#64748B',
  },
  deleteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF2F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0F2FE',
    borderStyle: 'dashed',
  },
  addItemText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#0EA5E9',
    marginLeft: 8,
  },
  formContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 12,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#334155',
    padding: 12,
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#64748B',
  },
  addButton: {
    backgroundColor: '#0EA5E9',
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
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
    width: '50%', // 3/6 of the total
    height: '100%',
    backgroundColor: '#0EA5E9',
    borderRadius: 4,
  },
});