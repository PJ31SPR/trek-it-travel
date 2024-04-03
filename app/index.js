import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import icons
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Header from '../components/Header';
import DestinationScreen from '../screens/DestinationScreen';
import ItineraryScreen from '../screens/ItineraryScreen'
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import CreateItinerary from '../screens/CreateItinerary'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Destinations') {
            iconName = 'map';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'Itinerary') {
            iconName = 'calendar';
          }

          // Return the icon component with custom color
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#556C2F', // Change the color of active tab icons
        tabBarInactiveTintColor: 'gray', // Change the color of inactive tab icons
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Destinations" component={DestinationScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Itinerary" component={ItineraryScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
};


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [fontsLoaded] = useFonts({
    Poppins: Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async (email, password, setIsAuthenticated, setError) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setIsAuthenticated(true);
      setError('');
    } catch (error) {
      setError('Error signing in: ' + error.message);
    }
  };

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Itinerary" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Header" component={Header} options={{ headerShown: false }} />
        <Stack.Screen name="CreateItinerary" component={CreateItinerary} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4E5C2'
  },
});
