//Do not push to git
import { authorize, refresh, revoke } from "react-native-app-auth";
const GOOGLE_OAUTH_APP_GUID = "REDACTED"; // it looks something like 12345678912-k50abcdefghijkabcdefghijkabcdefv
const config = {
  issuer: "https://accounts.google.com",
  clientId: `${GOOGLE_OAUTH_APP_GUID}.apps.googleusercontent.com`,
  redirectUrl: `com.googleusercontent.apps.${GOOGLE_OAUTH_APP_GUID}:/oauth2redirect/google`,
  scopes: ["openid", "profile"],
};

// Log in to get an authentication token
const authState = await authorize(config);

// Refresh token
const refreshedState = await refresh(config, {
  refreshToken: authState.refreshToken,
});

// Revoke token
await revoke(config, {
  tokenToRevoke: refreshedState.refreshToken,
});

/*
Note for Android
To capture the authorization redirect, add the following property to the defaultConfig in android/app/build.gradle:

android {
  defaultConfig {
    manifestPlaceholders = [
      appAuthRedirectScheme: 'com.googleusercontent.apps.YOUR_GOOGLE_OAUTH_APP_GUID'
      // your url will look like com.googleusercontent.apps.12345678912-k50abcdefghijkabcdefghijkabcdefv
    ]
  }
}


You need to check custom URI scheme under APIs & Services -> Credentials -> OAuth 2.0 Client IDs -> Your Client Name -> Advanced Settings
It may take 5 minutes to a few hours for settings to take effect.
*/
