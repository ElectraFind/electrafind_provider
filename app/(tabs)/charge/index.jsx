import { SafeAreaView, Text, View, Image, ScrollView, Button } from 'react-native'
import { StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import Header from '../../screens/charge/Header'
import { images } from '../../../constants'
import CustomButton from '../../../components/CustomButton'
import { BarCodeScanner } from 'expo-barcode-scanner'

export default function ChargeScreen(){

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }

  //Request permission to use the camera
  useEffect(() => {
    askForCameraPermission();
  }, []);

  //What happens when we scan the barcode
  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  //check if we have permission to use the camera
  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting for camera permission</Text>
      </View>
    )
  }

  if (hasPermission === false) {
    return (
      <View>
        <Text>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={askForCameraPermission} />
      </View>
  )}

  return (

    
    <SafeAreaView>
      <ScrollView>
      <View>
        <View style={styles.headerContainer}>
            <Header/>
        </View>
        <View>
          <Text style={{color: 'black', fontSize: 20, marginTop: 200, marginLeft:55, justifyContent: 'center', alignItems: 'center'}} className={'font-pbold'}>Scan the QR code to start charging</Text>
        </View>
        <View>
          <Image
            source={images.electraFindQR}
            style={{width: 300, height: 300, display:'flex', justifyContent: 'center', alignItems: 'center', marginTop: 60, marginLeft: 60}}
          />
        </View>
        <View>
          <CustomButton
            title= 'Start Charging'
            containerStyles="mt-10 w-2/3 mx-auto">
              {/* <View style={styles.barcodebox}>
                <BarCodeScanner
                  onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                  style={{ height: 400, width: 400 }} />
              </View> */}
          </CustomButton>

          {/* <Text style={styles.maintext}>{text}</Text>
          {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
        </View>

      </View>
      </ScrollView>
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  headerContainer:{
    position: 'absolute',
    zIndex: 10,
    padding: 60,
    width: '100%',
    paddingHorizontal: 10,
    height: '25%',
    backgroundColor: '#161622'
    
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
})

