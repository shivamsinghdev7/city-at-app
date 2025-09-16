import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { useGoogleLoginMutation, useFacebookLoginMutation } from '../../store/api/apiSlice';
import { oauthService } from '../../services';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  OTPVerification: { phone: string };
  RoleSelection: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Register'
>;

const RegisterScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'facebook' | null>(null);
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const dispatch = useDispatch();
  
  // OAuth mutations
  const [googleLogin] = useGoogleLoginMutation();
  const [facebookLogin] = useFacebookLoginMutation();

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return false;
    }
    if (!formData.phone.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return false;
    }
    if (!/^[6-9]\d{9}$/.test(formData.phone.trim())) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return false;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // In a real app, this would create account and send OTP
      navigation.navigate('OTPVerification', { phone: formData.phone });
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGoogleSignup = async () => {
    setOauthLoading('google');
    dispatch(loginStart());

    try {
      const { tokens } = await oauthService.signInWithGoogle();
      
      const result = await googleLogin({
        accessToken: tokens.accessToken,
        idToken: tokens.idToken || tokens.accessToken,
      }).unwrap();

      if (result.success && result.data) {
        dispatch(loginSuccess(result.data));
        Alert.alert('Success', 'Account created successfully with Google!');
      } else {
        throw new Error(result.error || 'Google signup failed');
      }
    } catch (error: any) {
      console.error('Google signup error:', error);
      dispatch(loginFailure(error.message || 'Google signup failed'));
      Alert.alert('Error', error.message || 'Google signup failed. Please try again.');
    } finally {
      setOauthLoading(null);
    }
  };

  const handleFacebookSignup = async () => {
    setOauthLoading('facebook');
    dispatch(loginStart());

    try {
      const { tokens } = await oauthService.signInWithFacebook();
      
      const result = await facebookLogin({
        accessToken: tokens.accessToken,
      }).unwrap();

      if (result.success && result.data) {
        dispatch(loginSuccess(result.data));
        Alert.alert('Success', 'Account created successfully with Facebook!');
      } else {
        throw new Error(result.error || 'Facebook signup failed');
      }
    } catch (error: any) {
      console.error('Facebook signup error:', error);
      dispatch(loginFailure(error.message || 'Facebook signup failed'));
      Alert.alert('Error', error.message || 'Facebook signup failed. Please try again.');
    } finally {
      setOauthLoading(null);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us to get started</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={formData.name}
              onChangeText={(value) => updateFormData('name', value)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter phone number"
                value={formData.phone}
                onChangeText={(value) => updateFormData('phone', value)}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email (Optional)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => updateFormData('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={[styles.registerButton, isLoading && styles.disabledButton]}
            onPress={handleRegister}
            disabled={isLoading}
          >
            <Text style={styles.registerButtonText}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By creating an account, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.socialButton, oauthLoading === 'google' && styles.disabledButton]}
            onPress={handleGoogleSignup}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'google' ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={[styles.socialButtonText, styles.loadingText]}>
                  Creating account...
                </Text>
              </View>
            ) : (
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, oauthLoading === 'facebook' && styles.disabledButton]}
            onPress={handleFacebookSignup}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'facebook' ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={[styles.socialButtonText, styles.loadingText]}>
                  Creating account...
                </Text>
              </View>
            ) : (
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333333',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  countryCode: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333333',
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333333',
  },
  registerButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  termsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: '#007AFF',
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666666',
    fontSize: 14,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  socialButtonText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 16,
    color: '#666666',
  },
  footerLink: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
});

export default RegisterScreen;