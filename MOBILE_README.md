
# Mobile App Instructions

This project has been set up with Capacitor to work as a mobile application. Follow these instructions to build and run the app on your device.

## Prerequisites

- Node.js and npm installed
- For Android: Android Studio
- For iOS: Xcode (Mac only)
- Git

## Setup Instructions

1. Clone the repository to your local machine:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the web app:
   ```
   npm run build
   ```

4. Sync the web build with Capacitor:
   ```
   npx cap sync
   ```

## Running on Android

1. Add the Android platform if you haven't already:
   ```
   npx cap add android
   ```

2. Open the project in Android Studio:
   ```
   npx cap open android
   ```

3. In Android Studio, click on the "Run" button to install the app on a connected device or emulator.

## Running on iOS (Mac only)

1. Add the iOS platform if you haven't already:
   ```
   npx cap add ios
   ```

2. Open the project in Xcode:
   ```
   npx cap open ios
   ```

3. In Xcode, select a device or simulator and click on the "Run" button.

## Testing Notifications

The app has been configured to send local notifications on your device. To test:

1. Enable random notifications in the Settings page of the app
2. Wait for random notifications to appear, or trigger them manually from the app

## Updating the App

After making changes to the web app code:

1. Rebuild the web app:
   ```
   npm run build
   ```

2. Sync the changes with Capacitor:
   ```
   npx cap sync
   ```

3. Open the project in Android Studio or Xcode and run it again:
   ```
   npx cap open android
   ```
   or
   ```
   npx cap open ios
   ```
