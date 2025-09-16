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

type LoginScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Login'
>;

const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'facebook' | null>(null);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();
  
  // OAuth mutations
  const [googleLogin] = useGoogleLoginMutation();
  const [facebookLogin] = useFacebookLoginMutation();

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone.trim());
  };

  const handleLogin = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    dispatch(loginStart());

    try {
      // In a real app, this would send OTP to the phone number
      // For now, navigate to OTP verification
      navigation.navigate('OTPVerification', { phone: phoneNumber });
    } catch (error) {
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      dispatch(loginFailure('Failed to send OTP'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
        Alert.alert('Success', 'Logged in successfully with Google!');
      } else {
        throw new Error(result.error || 'Google login failed');
      }
    } catch (error: any) {
      console.error('Google login error:', error);
      dispatch(loginFailure(error.message || 'Google login failed'));
      Alert.alert('Error', error.message || 'Google login failed. Please try again.');
    } finally {
      setOauthLoading(null);
    }
  };

  const handleFacebookLogin = async () => {
    setOauthLoading('facebook');
    dispatch(loginStart());

    try {
      const { tokens } = await oauthService.signInWithFacebook();
      
      const result = await facebookLogin({
        accessToken: tokens.accessToken,
      }).unwrap();

      if (result.success && result.data) {
        dispatch(loginSuccess(result.data));
        Alert.alert('Success', 'Logged in successfully with Facebook!');
      } else {
        throw new Error(result.error || 'Facebook login failed');
      }
    } catch (error: any) {
      console.error('Facebook login error:', error);
      dispatch(loginFailure(error.message || 'Facebook login failed'));
      Alert.alert('Error', error.message || 'Facebook login failed. Please try again.');
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
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+91</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.disabledButton]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={[styles.socialButton, oauthLoading === 'google' && styles.disabledButton]}
            onPress={handleGoogleLogin}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'google' ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={[styles.socialButtonText, styles.loadingText]}>
                  Signing in...
                </Text>
              </View>
            ) : (
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.socialButton, oauthLoading === 'facebook' && styles.disabledButton]}
            onPress={handleFacebookLogin}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'facebook' ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#333333" />
                <Text style={[styles.socialButtonText, styles.loadingText]}>
                  Signing in...
                </Text>
              </View>
            ) : (
              <Text style={styles.socialButtonText}>Continue with Facebook</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>Sign Up</Text>
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
  loginButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
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

export default LoginScreen;