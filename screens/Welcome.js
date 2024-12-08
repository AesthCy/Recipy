import { View, Text, ImageBackground, Platform, TouchableOpacity } from 'react-native'
import React from 'react'
import "../global.css"
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'

const Welcome = () => {

  const navigation = useNavigation();

  const handleLogin = () => {
      navigation.navigate('Login');
  };

  const handleSignUp = () => {
      navigation.navigate('Signup');
  };

  const backgroundImage = Platform.OS === 'web' 
    ? require('../assets/webBG.jpg') 
    : require('../assets/welcomeBG.png');

  return (
    <ImageBackground source={backgroundImage} className="flex-1 justify-center items-center">
      <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.9)', 'rgba(0, 0, 0, 1)']}
        style={{ 
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingBottom: 100
        }}>

        <Text className="text-white text-5xl font-bold">
          Cook Like a Chef!
        </Text>

        <Text className="text-white text-xl m-6 text-center">
          Recipy is a user-friendly recipe app designed for those who are new to cooking and want to try new recipes at home
        </Text>

        <View className="flex-row mt-16">
          <TouchableOpacity className="flex-1 w-72 py-4 px-8 mx-6 border-white border-2 rounded-full justify-center items-center" onPress={handleLogin}>
            <Text className="text-white font-bold">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 w-72 py-4 px-8 mx-6 border-white border-2 bg-white rounded-full justify-center items-center" onPress={handleSignUp}>
            <Text className="text-black font-bold">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </ImageBackground>
  )
}

export default Welcome