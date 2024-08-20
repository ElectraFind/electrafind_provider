// import { View, Text, Image } from 'react-native'
// import React from 'react'
// import { Marker } from 'react-native-maps'
// import images from '../../../constants/images'
// import { useContext } from 'react'
// import { SelectMarkerContext } from '../../Context/SelectMarkerContext'


// export default function Markers({index,place}) {

//   const {selectedMarker,setSelectedMarker}=useContext(SelectMarkerContext);
//   return place && (
//     <Marker
//             coordinate={{
//               latitude: place.location?.latitude,
//               longitude: place.location?.longitude,
//               //change to the location of the user
//             }}

//             onPress={()=>setSelectedMarker(index)}
            
//             description="Your Location"
//           >
            
//             <Image source={images.evchargerheader} style={{height: 70, width: 60, position:'absolute'}} /> 
//     </Marker>
//   )
// }

//newly added delete in case of error

import { View, Image } from 'react-native';
import React, { useContext } from 'react';
import { Marker } from 'react-native-maps';
import images from '../../../constants/images';
import { SelectMarkerContext } from '../../Context/SelectMarkerContext';

export default function Markers({ index, place, onMarkerTouch }) {
  const { setSelectedMarker, setIsMarkerTouched } = useContext(SelectMarkerContext);

  const handleMarkerPress = () => {
    setSelectedMarker(index);
    setIsMarkerTouched(true);
    onMarkerTouch();
  };

  return place && (
    <Marker
      coordinate={{
        latitude: place.location?.latitude,
        longitude: place.location?.longitude,
      }}
      onPress={handleMarkerPress}
      description="Your Location"
    >
      <Image source={images.evchargerheader} style={{ height: 70, width: 60, position: 'absolute' }} />
    </Marker>
  );
}
