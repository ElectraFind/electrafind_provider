import {  Text, View } from 'react-native'
import React from 'react'
import MarketPage from '../../screens/Market/MarketPage'
import Header from '../../screens/Market/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function MarketScreen()  {
  return (
    <SafeAreaView>
    <View style={{flex:1}}>
      
      <Header/>
      
    </View>
    </SafeAreaView>
  )
}



