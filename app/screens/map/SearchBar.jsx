import { View, Text, style ,TextInput} from 'react-native'
import React,  { useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { useFonts } from 'expo-font';
import { StyleSheet } from 'react-native';

export default function SearchBar({searchedLocation, onFocus}) {

  let [fontsLoaded, fontError] = useFonts({
    'psemibold': require('../../../assets/fonts/Poppins-SemiBold.ttf'),
  });

  const searchRef = useRef(null);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      paddingHorizontal: 35,
      borderRadius: 10,
      backgroundColor: '#ffffff',
      borderColor: '#000000',
      backgroundshadowColor: '#ffffff',
    }}>
      
      <IonIcons name="location-sharp" size={24} color="#000000" style={{paddingTop:10}}/>

      <GooglePlacesAutocomplete
      placeholder='Search EV charging station'
      fetchDetails={true}
      onFocus={() => {
        searchRef.current?.focus();
        onFocus && onFocus();
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true 
        searchedLocation(details?.geometry?.location);
      }}
      query={{
        key: 'AIzaSyDTYD4DNXMdQCRcjy0-ePWn5OpM0Ggki54',
        language: 'en',
      }}
      styles={{
        textInput: styles.textInput,
      }}
    />
    </View>
  )
}

const styles = StyleSheet.create({

  textInput: {
    fontFamily: 'psemibold',
    fontSize: 16,
    marginTop:3
    
    
  }
})