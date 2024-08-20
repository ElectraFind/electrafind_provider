import { View, Text, Image, ScrollView, Dimensions,TouchableWithoutFeedback, Keyboard,KeyboardAvoidingView} from 'react-native'

import { StyleSheet } from 'react-native'
import React, {useEffect, useContext,useRef} from 'react'
import { images } from '../../../constants'
import SearchBar from './SearchBar'
import DistanceSlider from './DistanceSlider'
import IonIcons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native'
import { UserLocationContext } from '../../Context/UserLocationContext'
import BottomSheet from 'reanimated-bottom-sheet';
import { useState } from 'react';

const { height: screenHeight } = Dimensions.get('window');
const SNAP_POINT = screenHeight * 0.7;

export default function Header({onSearchFocus}) {

  const {location,setLocation}=useContext(UserLocationContext);
  
  const bottomSheetRef = useRef(null);
  

  const renderContent = () => (
    <View style={styles.bottomSheetContent}>
      <Text style={styles.bottomSheetText}>Options</Text>
      {/* Add more options here */}
    </View>
  );

  const handleOpenBottomSheet = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapTo(0);
    }
  };

  

  return (
  
    
      <View style={styles.container}>
        
        {/* <Image 
          source={images.logoverticalshort}
          style={{width:250,height:60,objectFit:'contain',}}
        /> */}

        <View style={{display: 'flex',flexDirection:'row',justifyContent:'space-between'}}>

          
        
          

          <TouchableOpacity style={{width:'80%', borderColor:'#161622', borderWidth: 1 }}>
            <SearchBar onFocus={onSearchFocus} searchedLocation={(location)=>
            setLocation({
              latitude: location.lat,
              longitude: location.lng
            })

            

            }/>
          </TouchableOpacity>

          
    
          

          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <IonIcons name="options-outline" size={30} color="#ffffff" style={{paddingTop:8,paddingLeft:14}}/>
          </TouchableOpacity>

        </View>
        
        {/* <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[SNAP_POINT, 0]}
          borderRadius={10}
          renderContent={renderContent}
        /> */}

        {/* <DistanceSlider/> */}

        
      </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: 'white',
  },
  bottomSheetText: {
    fontSize: 18,
  },
})

