import { Text, View, Image} from 'react-native'
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from 'react'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import axios from "axios";
import { router } from "expo-router";
import Header from '../../screens/charge/Header'
import { StyleSheet } from 'react-native';

const TopupScreen = () => {

  

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setLoader(true);
      const base64Image = `data:image/jpeg;base64,${base64}`;
      setImage(base64Image);

      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      try {
        const response = await axios.put(
          `${SERVER_URI}/update-user-avatar`,
          {
            avatar: base64Image,
          },
          {
            headers: {
              "access-token": accessToken,
              "refresh-token": refreshToken,
            },
          }
        );
        if (response.data) {
          setRefetch(true);
          setLoader(false);
        }
      } catch (error) {
        setLoader(false);
        console.log(error);
      }
    }
  };

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("refresh_token");
    router.push("/(auth)/sign-in");
    // Navigate to the login screen or perform any other logout actions
  };

  return (

    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1, paddingTop: 80 }}>
      <ScrollView>

        <View style={{flexDirection: "row", justifyContent: "center" }}>
          <View style={{ position: "relative" }}>
            <Image
              source={{
                uri:
                        "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png",
              }}
              style={{ width: 90, height: 90, borderRadius: 100 }}
            />

            <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: 5,
                      right: 0,
                      width: 30,
                      height: 30,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 100,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={pickImage}
                  >
                    <Ionicons name="camera-outline" size={25} />
            </TouchableOpacity>

          </View>
        </View>

        <View>
          <Text
                style={{
                  textAlign: "center",
                  fontSize: 25,
                  paddingTop: 10,
                  fontWeight: "600",
                }}
              >
                Chamudra
          </Text>
        </View>

       
        <View style={{ marginHorizontal: 16, marginTop: 30 }}>
              <Text
                style={{
                  fontSize: 20,
                  marginBottom: 16,
                  
                }}

                className="text-2xl font-pbold"
              >
                Account Details
              </Text>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#dde2ec",
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center" }}
                      name="user-o"
                      size={20}
                      color={"black"}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 16}} className="font-psemibold"
                    >
                      Detail Profile
                    </Text>
                    <Text
                      style={{
                        color: "#575757",
                        
                      }}
                      className="font-pregular"
                    >
                      Information Account
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={"#CBD5E0"} />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
                // onPress={() => router.push("/(routes)/enrolled-courses")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#dde2ec",
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ alignSelf: "center" }}
                      name="history"
                      size={20}
                      color={"black"}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 16}} className="font-psemibold"
                    >
                      Charge History
                    </Text>
                    <Text
                      style={{
                        color: "#575757",
                        
                      }}
                      className="font-pregular"
                    >
                      Recent transactions
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={"#CBD5E0"} />
                </TouchableOpacity>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#dde2ec",
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <FontAwesome
                      style={{ alignSelf: "center" }}
                      name="money"
                      size={20}
                      color={"black"}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 16}} className="font-psemibold"
                    >
                      Wallet
                    </Text>
                    <Text
                      style={{
                        color: "#575757",
                        
                      }}
                      className="font-pregular"
                    >
                      Top up
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={"#CBD5E0"} />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
                // onPress={() => router.push("/(routes)/enrolled-courses")}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#dde2ec",
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <MaterialCommunityIcons
                      style={{ alignSelf: "center" }}
                      name="handshake"
                      size={20}
                      color={"black"}
                    />
                  </View>
                  <View>
                    <Text
                      style={{ fontSize: 16}} className="font-psemibold"
                    >
                      Market Place
                    </Text>
                    <Text
                      style={{
                        color: "#575757",
                        
                      }}
                      className="font-pregular"
                    >
                      Sell your vehicle and vehicle parts
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={"#CBD5E0"} />
                </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 20,
                }}
                onPress={() => logoutHandler()}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    columnGap: 30,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 2,
                      borderColor: "#dde2ec",
                      padding: 15,
                      borderRadius: 100,
                      width: 55,
                      height: 55,
                    }}
                  >
                    <Ionicons
                      style={{ alignSelf: "center" }}
                      name="log-out-outline"
                      size={20}
                      color={"black"}
                    />
                  </View>
                  <TouchableOpacity> 
                  {/* onPress={() => logoutHandler()} */}
                    <Text
                      style={{ fontSize: 16 }}
                      className="font-psemibold"
                    >
                      Log Out
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity>
                  <AntDesign name="right" size={26} color={"#CBD5E0"} />
                </TouchableOpacity>
              </TouchableOpacity>
            </View>

      </ScrollView>

    </LinearGradient>
  )
}

export default TopupScreen

const styles = StyleSheet.create({
  headerContainer:{
    position: 'realtive',
    zIndex: 10,
    padding: 10,
    width: '100%',
    paddingHorizontal: 10,
    height: '15%',
    backgroundColor: '#161622',
    marginBottom:20
    
  },
 
})