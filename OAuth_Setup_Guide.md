# OAuth Configuration Guide

This app now supports Google and Facebook OAuth authentication. To enable these features, you need to configure the OAuth providers.

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Sign-In API
4. Create credentials (OAuth 2.0 Client IDs) for:
   - Web application (for the backend)
   - Android application
   - iOS application
5. Download the configuration files:
   - `google-services.json` for Android (place in `android/app/`)
   - `GoogleService-Info.plist` for iOS (add to iOS project in Xcode)
6. Update the web client ID in `src/services/googleAuthService.ts`:
   ```typescript
   webClientId: 'YOUR_GOOGLE_WEB_CLIENT_ID.apps.googleusercontent.com',
   ```

## Facebook OAuth Setup

1. Go to the [Facebook Developers Console](https://developers.facebook.com/)
2. Create a new app or use an existing one
3. Add Facebook Login product to your app
4. Configure platform settings for Android and iOS
5. Update the configuration:
   - Android: Update `android/app/src/main/res/values/strings.xml` with your Facebook App ID and Client Token
   - iOS: Update `ios/CityAtApp/Info.plist` with Facebook configuration
   - Update `src/services/facebookAuthService.ts` with your Facebook App ID:
     ```typescript
     Settings.setAppID('YOUR_FACEBOOK_APP_ID');
     ```

## Backend API Endpoints

The app expects the following API endpoints:

- `POST /auth/google` - Accepts `{ accessToken, idToken }` and returns user data
- `POST /auth/facebook` - Accepts `{ accessToken }` and returns user data

Both endpoints should return:
```json
{
  "success": true,
  "data": {
    "user": { /* user object */ },
    "token": "jwt_token",
    "refreshToken": "refresh_token"
  }
}
```

## Testing

1. Configure OAuth providers as described above
2. Update the service files with your actual App IDs and Client IDs
3. Build and run the app on a physical device (OAuth won't work in simulators/emulators)
4. Test the Google and Facebook login buttons on both Login and Register screens

## Security Notes

- Never commit real App IDs, Client IDs, or tokens to version control
- Use environment variables or secure configuration management in production
- Implement proper token validation on your backend
- Consider implementing token refresh mechanisms for long-lived sessions