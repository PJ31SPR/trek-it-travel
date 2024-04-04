# Trek-It Travel

Trek-It Travel is a project that provides information about popular destinations around the world. It includes details about attractions, landmarks, and restaurants in each destination.

## Features
- SignUp and Login with Email Account
- Search for destination by city
- Browse attractions, restaurants and landmarks of the specific city
- Create, save and delete itineraries
- View user Profile details, upload/change avatar

## What's Included

**Data**: The project includes a data folder containing JSON files with information about destinations such as Rome, Barcelona, Dubai, and Mexico City. Each destination contains data about attractions, restaurants, and landmarks.

**Firebase Configuration**: To use Firebase features such as authentication and Firestore, you need to create a firebase.js file in the root directory. Here's an example of what the file should contain:

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "<YOUR_API_KEY>",
authDomain: "<YOUR_AUTH_DOMAIN>",
projectId: "<YOUR_PROJECT_ID>",
storageBucket: "<YOUR_STORAGE_BUCKET>",
messagingSenderId: "<YOUR_MESSAGING_SENDER_ID>",
appId: "<YOUR_APP_ID>"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp)

export { auth };
export const db = getFirestore(firebaseApp)
```

Replace:   

<YOUR_API_KEY>,  <YOUR_AUTH_DOMAIN>, 
<YOUR_PROJECT_ID>, <YOUR_STORAGE_BUCKET>, 
<YOUR_MESSAGING_SENDER_ID>,  <YOUR_APP_ID> 

with your Firebase project's configuration values.

## How to Run

### To run the project, follow these steps:

Clone the repository to your local machine.

Create a firebase.js file in the root directory with your Firebase configuration (as shown above).

Install dependencies by running **npm install**.

Start the development server:

For Android: **npm run android**
For iOS: **npm run ios**
For web: **npm run web**

Open your preferred web browser and navigate to the specified URL to view the application.

Alternatively use the **Expo Go** app on your phone, scan the QR code from your terminal to run the application. 
Sometimes if any of the above do not show product on Expo Go, please run: **npx expo start --tunnel**

## Dependencies

This project uses the following dependencies:

    @expo-google-fonts/poppins: ^0.2.3
    @react-navigation/bottom-tabs: ^6.5.20
    @react-navigation/core: ^6.4.16
    @react-navigation/native: ^6.1.17
    @react-navigation/stack: ^6.3.29
    date-fns: ^3.6.0
    expo: ~50.0.14
    expo-constants: ~15.4.5
    expo-image-picker: ~14.7.1
    expo-linking: ~6.2.2
    expo-router: ~3.4.8
    expo-status-bar: ~1.11.1
    firebase: ^10.9.0
    react: 18.2.0
    react-dom: 18.2.0
    react-native: 0.73.6
    react-native-calendar-picker: ^8.0.2
    react-native-elements: ^3.4.3
    react-native-safe-area-context: 4.8.2
    react-native-screens: ~3.29.0
    react-native-web: ~0.19.6