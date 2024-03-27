import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen'
import Header from '../components/Header'
import DestinationScreen from '../screens/DestinationScreen';

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Destinations" component={DestinationScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />

     
    </Tab.Navigator>
  );
};

export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage authentication state

  const handleLogin = async (email, password, setIsAuthenticated, setError) => {
    try {
      // Authenticate the user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // If authentication is successful, set isAuthenticated to true
      setIsAuthenticated(true);
  
      // Optionally, you can perform additional actions here after successful login, such as fetching user data
      // For example, you can fetch user data from Firebase Firestore
      // const userData = await db.collection('users').doc(userCredential.user.uid).get();
      // Then, you can set the user data to the state or perform any other actions based on your application's logic
  
      // Clear any previous error message
      setError('');
    } catch (error) {
      // If there's an error during login, set the error message
      setError('Error signing in: ' + error.message);
    }
  };




  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
