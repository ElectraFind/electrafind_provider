import { Text, View, Image, Keyboard,  } from 'react-native'
import React from 'react'
import {Tabs, Redirect} from 'expo-router'
import { icons } from "../../constants";
import { StatusBar } from 'expo-status-bar'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MarketScreen from './market/index'
import MapScreen from './map/index'
import ChargeScreen from './charge/index'
import ServiceScreen from './service/index'
import TopupScreen from './topup/index'
import chargingStationProfile from './map/chargingStationProfile';
import App from './map/_layout'
import MapLayout from './map/_layout';
import ServiceLayout from './service/_servicelayout';
import { useState, useEffect } from 'react';



const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function TabsLayout() {

    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

  return (
    <>
    <Tab.Navigator initialRouteName="map"
      
        screenOptions={{
          
          tabBarActiveTintColor: "#22c55e",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
            height: 64,
            display: isKeyboardVisible ? 'none' : 'flex'
          },
        }}
      >

        

        <Tab.Screen
          name="_layout"
          component={MapLayout}
          options={{
            title: "MapScreen",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.map}
                color={color}
                name="Map"
                focused={focused}
                
              />
            ),
          }}
        />

        <Tab.Screen
          name="market"
          component={MarketScreen}
          
          options={{
            title: "MarketScreen",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.car}
                color={color}
                name="Market"
                focused={focused}
              />
            ),
          }}
        />

        <Tab.Screen
            name="charge"
            component={ChargeScreen}
           
           options={{
             title: "ChargeScreen",
             headerShown: false,
             tabBarIcon: ({ color, focused }) => (
               <TabIcon
                 icon={icons.charge}
                 color={color}
                 name="Charge"
                 focused={focused}
               />
             ),
           }}
        />

        <Tab.Screen
          name="_servicelayout"
          component={ServiceLayout}
          
          options={{
            title: "ServiceScreen",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.service}
                color={color}
                name="Service"
                focused={focused}
              />
            ),
          }}
        />

        <Tab.Screen
          name="topup"
          component={TopupScreen}
          
          options={{
            title: "TopupScreen",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.topup}
                color={color}
                name="Topup"
                focused={focused}
              />
            ),
          }}
        />

      
    </Tab.Navigator>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  )
}

