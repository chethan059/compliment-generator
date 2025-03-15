
# Android Notification Setup

To ensure notifications display properly on Android devices, follow these additional steps:

## 1. Create notification icon

Android requires a specific notification icon. The default icon in the Capacitor config is `ic_stat_icon_config_sample`, which needs to be created.

1. Create a white and transparent PNG icon (24x24dp)
2. Add this icon to the Android resources folder:
   ```
   android/app/src/main/res/drawable/ic_stat_icon_config_sample.png
   ```

## 2. Test notifications

After building and installing the app on your Android device:

1. Make sure to launch the app at least once
2. Grant notification permissions when prompted
3. Keep the app in the background (don't force close it)
4. Wait for a scheduled notification or set up a test notification

## Troubleshooting

If notifications don't appear:

1. Check Android settings to ensure the app has notification permissions
2. Check that the app is not battery optimized (which can prevent background services)
3. Verify the console logs for any errors
4. Try using the `npx cap run android` command for development, which provides better debugging

