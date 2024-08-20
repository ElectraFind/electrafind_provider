import { Platform, Text, View, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router'
import { useFonts} from 'expo-font'
import * as Location from 'expo-location'
import {UserLocationContext} from './Context/UserLocationContext'
import { ClerkProvider, ClerkLoaded, SignedOut,SignedIn } from "@clerk/clerk-expo"
import { StatusBar } from 'expo-status-bar';
import SignIn from './(auth)/sign-in'
import { Slot } from "expo-router"
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import TabsLayout from './(tabs)/_layout';
import HomeScreen from './(tabs)/market';
import Splash from './splashscreen'





SplashScreen.preventAutoHideAsync()

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      
      
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  

  const [fontsLoaded,error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded) {
    return null;
  }

  if (!fontsLoaded && !error) {
    return null;
  }

  return(
    <ClerkProvider publishableKey={'pk_test_cnVsaW5nLXN0dWQtNi5jbGVyay5hY2NvdW50cy5kZXYk'} tokenCache={tokenCache}>

      <UserLocationContext.Provider value={{location,setLocation}}>
      
      {/* <Splash/> */}
      <SignedIn>
        <NavigationContainer independent={true}>
          <TabsLayout />
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <SignIn />
      </SignedOut>
      {/* // </UserLocationContext.Provider> */}
      <StatusBar style="auto" />
      
        </UserLocationContext.Provider>
    </ClerkProvider>
    
  
   
  )
}

export default RootLayout