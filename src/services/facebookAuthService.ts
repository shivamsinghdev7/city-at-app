import {
  AccessToken,
  LoginManager,
  Profile,
  Settings,
} from 'react-native-fbsdk-next';
import { OAuthUserInfo, OAuthTokens } from '../types';

class FacebookAuthService {
  private isConfigured = false;

  // Configure Facebook SDK
  configure() {
    if (this.isConfigured) return;

    // Initialize Facebook SDK
    Settings.setAppID('YOUR_FACEBOOK_APP_ID'); // TODO: Replace with your Facebook App ID
    Settings.initializeSDK();

    this.isConfigured = true;
  }

  // Sign in with Facebook
  async signIn(): Promise<{ userInfo: OAuthUserInfo; tokens: OAuthTokens }> {
    try {
      this.configure();

      // Login with permissions
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (result.isCancelled) {
        throw new Error('Facebook login was cancelled');
      }

      // Get access token
      const accessTokenData = await AccessToken.getCurrentAccessToken();
      
      if (!accessTokenData) {
        throw new Error('Failed to get Facebook access token');
      }

      // Get user profile
      const profile = await Profile.getCurrentProfile();
      
      if (!profile) {
        throw new Error('Failed to get Facebook user profile');
      }

      const oAuthUserInfo: OAuthUserInfo = {
        id: profile.userID,
        name: profile.name || '',
        email: profile.email || '', // Note: Email might not be available
        profilePhoto: profile.imageURL || undefined,
        provider: 'facebook',
      };

      const tokens: OAuthTokens = {
        accessToken: accessTokenData.accessToken,
      };

      return { userInfo: oAuthUserInfo, tokens };
    } catch (error: any) {
      console.error('Facebook Sign-In Error:', error);
      throw new Error('Facebook sign-in failed: ' + error.message);
    }
  }

  // Sign out
  async signOut(): Promise<void> {
    try {
      LoginManager.logOut();
    } catch (error) {
      console.error('Facebook Sign-Out Error:', error);
    }
  }

  // Get current access token
  async getCurrentAccessToken() {
    try {
      return await AccessToken.getCurrentAccessToken();
    } catch (error) {
      console.log('No Facebook access token available');
      return null;
    }
  }

  // Get current profile
  async getCurrentProfile() {
    try {
      return await Profile.getCurrentProfile();
    } catch (error) {
      console.log('No Facebook profile available');
      return null;
    }
  }

  // Check if user is logged in
  async isLoggedIn(): Promise<boolean> {
    try {
      const accessToken = await AccessToken.getCurrentAccessToken();
      return !!accessToken;
    } catch (error) {
      return false;
    }
  }
}

export default new FacebookAuthService();