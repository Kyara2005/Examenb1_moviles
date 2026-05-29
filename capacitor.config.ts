import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'videojuegos-crud',
  webDir: 'www',
  server: {
    androidScheme: 'https'  // 👈 importante
  },
  plugins: {
  SplashScreen: {
    launchShowDuration: 500,
    launchAutoHide: true,
    launchFadeOutDuration: 200,
    backgroundColor: "#ffffffff",
    androidSplashResourceName: "splash",
    androidScaleType: "CENTER_CROP",
    showSpinner: false,
    splashFullScreen: true,
    splashImmersive: true
  }
}
};

export default config;
