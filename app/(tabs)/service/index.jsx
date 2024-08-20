import {Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import ServiceStation from '../../screens/service/ServiceStationsList'
import Mechanics from '../../screens/service/MechanicsList'
import ServiceStations from '../../screens/service/ServiceStationsList'
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../../constants'
import * as Haptics from 'expo-haptics'


export default function ServiceScreen() {

  const [activeButton, setActiveButton] = useState("Service Stations");

  const handleButtonPress = (buttonName) => {
    setActiveButton(buttonName);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View>

          <View className="flex items-center bg-black">
           <Image 
            source={images.logoverticalshort}
            style={{width:250,height:60,objectFit:'contain',}}
          /> 
          </View>

          <View style={{flexDirection: "row", justifyContent: "center", marginTop: 10, marginHorizontal: 15, backgroundColor: "#E9E9E9", borderRadius: 40, borderWidth: 2,borderColor: "#000000",  }}>

              <TouchableOpacity style={{flex: 1,alignItems: 'center',justifyContent: 'center',paddingVertical: 15, paddingHorizontal: 45, margin: 2, backgroundColor: activeButton === "Service Stations" ? "#000000" : "transparent", borderRadius: activeButton === "Service Stations" ? 35 : 0}}
                onPress={() => handleButtonPress("Service Stations")}
              >
                <Text style={{color: activeButton === "Service Stations" ? "#fff" : "#000",}} className={"font-psemibold"}>Service Stations</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{flex:1,alignItems: 'center',justifyContent: 'center',paddingVertical: 15, paddingHorizontal: 45, margin: 2, backgroundColor: activeButton === "Mechanics" ? "#000000" : "transparent", borderRadius: activeButton === "Mechanics" ? 35 : 0}}
                onPress={() => handleButtonPress("Mechanics")}
              >
                <Text style={{color: activeButton === "Mechanics" ? "#fff" : "#000",}} className={"font-psemibold"}>Mechanics</Text>
              </TouchableOpacity>

          </View>
        
            {
              activeButton === "Service Stations" && (
                <View style={{marginHorizontal: 16, marginVertical: 25}}>
                  <ServiceStations/>
                </View>
              )
            }

            {
              activeButton === "Mechanics" && (
                <View style={{marginHorizontal: 16, marginVertical: 25}}>
                  <Mechanics/>
                </View>
              )
            }

          

      </View>
      
      
    </SafeAreaView>
  )
}


