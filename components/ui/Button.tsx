import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
  TextStyle
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'medium',
  loading = false,
  icon,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[`${variant}Button`],
    styles[`${size}Button`],
    style,
  ];

  const textStyles = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
    textStyle,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'outline' ? '#4F46E5' : '#FFFFFF'} 
          size="small" 
        />
      ) : (
        <>
          {icon && icon}
          <Text style={textStyles}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#4F46E5',
  },
  secondaryButton: {
    backgroundColor: '#E0E7FF',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4F46E5',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  text: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#4F46E5',
  },
  outlineText: {
    color: '#4F46E5',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});