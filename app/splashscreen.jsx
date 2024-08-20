import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from '../constants';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  // const navigation = useNavigation();
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     router.push('/sign-in'); // Navigate to sign-in screen after timeout
  //   }, 1500); // Adjust duration as needed (e.g., 2000 milliseconds)
    
  //   return () => clearTimeout(timer); // Clear timeout on component unmount
  // }, [navigation]);

  


  return (

    
    <SafeAreaView className = "bg-primary h-full" >
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">

          <Image source={images.logo} className="max-w-[480px] w-full h-[400px]" resizeMode="contain"/>

          {/* <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" resizeMode="contain"/> */}

          <View className="relative mt-5"> 
            <Text className="text-3xl text-white font-bold text-center mb-50">Power up anywhere</Text>
            
            <ActivityIndicator size="large" color="#00FF00" mt="50"/> 
          </View>

          {/* <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Electrafind</Text> */}

          
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#161622' style='light' />

    </SafeAreaView>

  );
}


export default Splash;