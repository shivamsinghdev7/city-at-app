import googleAuthService from './googleAuthService';
import facebookAuthService from './facebookAuthService';
import { OAuthUserInfo, OAuthTokens } from '../types';

export interface OAuthResult {
  userInfo: OAuthUserInfo;
  tokens: OAuthTokens;
}

class OAuthService {
  // Google OAuth methods
  async signInWithGoogle(): Promise<OAuthResult> {
    return await googleAuthService.signIn();
  }

  async signOutFromGoogle(): Promise<void> {
    return await googleAuthService.signOut();
  }

  async isGoogleSignedIn(): Promise<boolean> {
    return await googleAuthService.isSignedIn();
  }

  // Facebook OAuth methods
  async signInWithFacebook(): Promise<OAuthResult> {
    return await facebookAuthService.signIn();
  }

  async signOutFromFacebook(): Promise<void> {
    return await facebookAuthService.signOut();
  }

  async isFacebookLoggedIn(): Promise<boolean> {
    return await facebookAuthService.isLoggedIn();
  }

  // General OAuth methods
  async signOutFromAll(): Promise<void> {
    await Promise.all([
      this.signOutFromGoogle(),
      this.signOutFromFacebook(),
    ]);
  }

  // Helper method to determine if user is signed in with any provider
  async isSignedInWithAnyProvider(): Promise<boolean> {
    const [googleSignedIn, facebookLoggedIn] = await Promise.all([
      this.isGoogleSignedIn(),
      this.isFacebookLoggedIn(),
    ]);

    return googleSignedIn || facebookLoggedIn;
  }
}

export default new OAuthService();