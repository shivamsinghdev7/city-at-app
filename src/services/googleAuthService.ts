import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { OAuthUserInfo, OAuthTokens } from '../types';

class GoogleAuthService {
  private isConfigured = false;

  // Configure Google Sign-In
  configure() {
    if (this.isConfigured) return;

    GoogleSignin.configure({
      // TODO: Replace with your actual web client ID from Google Console
      webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
      offlineAccess: true,
      hostedDomain: '',
      forceCodeForRefreshToken: true,
    });

    this.isConfigured = true;
  }

  // Sign in with Google
  async signIn(): Promise<{ userInfo: OAuthUserInfo; tokens: OAuthTokens }> {
    try {
      this.configure();

      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices();

      // Get the user's ID token
      const userInfo = await GoogleSignin.signIn();

      if (!userInfo.user || !userInfo.idToken) {
        throw new Error('Failed to get user information from Google');
      }

      const oAuthUserInfo: OAuthUserInfo = {
        id: userInfo.user.id,
        name: userInfo.user.name || '',
        email: userInfo.user.email,
        profilePhoto: userInfo.user.photo || undefined,
        provider: 'google',
      };

      const tokens: OAuthTokens = {
        accessToken: userInfo.idToken, // Using idToken as accessToken for backend
        idToken: userInfo.idToken,
      };

      return { userInfo: oAuthUserInfo, tokens };
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error('Google sign-in was cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error('Google sign-in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Google Play Services not available');
      } else {
        throw new Error('Google sign-in failed: ' + error.message);
      }
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Google Sign-Out Error:', error);
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      return userInfo;
    } catch (error) {
      console.log('No user currently signed in');
      return null;
    }
  }

  // Check if user is signed in
  async isSignedIn(): Promise<boolean> {
    return GoogleSignin.isSignedIn();
  }

  // Revoke access
  async revokeAccess(): Promise<void> {
    try {
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.error('Google Revoke Access Error:', error);
    }
  }
}

export default new GoogleAuthService();