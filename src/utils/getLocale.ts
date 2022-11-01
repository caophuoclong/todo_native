import { NativeModules, Platform } from "react-native";

export const getLocale = ()=>{
    let locale;
      if (Platform.OS === 'android') {
        // get locale from device
        locale = NativeModules.I18nManager.localeIdentifier;
      } else {
        // get locale from device
        locale = NativeModules.SettingsManager.settings.AppleLocale;
      }
    return locale;
}