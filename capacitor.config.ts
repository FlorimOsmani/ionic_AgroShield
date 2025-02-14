import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'AgroShield',
  webDir: 'www',
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    Http: {
      allowInsecure: true // 🚨 Ignore SSL verification
    },
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#de0f17',
      showSpinner: false,
      androidSpinnerStyle: 'small',
      iosSpinnerStyle: 'small',
      splashFullScreen: true,
      splashImmersive: true,
      androidSplashResourceName: 'splash',
    },
  },
};

export default config;
