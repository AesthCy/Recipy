import { View, Text, Image, ImageBackground, TextInput, ScrollView, Platform, Modal, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import "../global.css";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Login = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleGoBack = () => {
    navigation.navigate('Welcome');
  }

  const handleSignUp = () => {
    navigation.navigate('Signup');
  }

  const handleLogin = () => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setModalVisible(true);
    }, 2000);
  }

  const handleGoogleLogin = () => {
    setLoadingGoogle(true);
    
    setTimeout(() => {
      setLoadingGoogle(false);
      setModalVisible(true);
    }, 2000);
  }

  const backgroundImage = Platform.OS === 'web' 
    ? require('../assets/webBG.jpg') 
    : require('../assets/welcomeBG.png');

  return (
    <ImageBackground source={backgroundImage} className="flex-1 justify-center items-center">
      <LinearGradient colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 1)']}
        style={{ 
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="flex-1 w-full">
          <View className="justify-start items-start my-20 mx-8">
            <TouchableOpacity className="w-10 h-10 bg-slate-100 rounded-full justify-center items-center" onPress={handleGoBack}>
              <Icon name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>
            
            <Text className="text-white text-5xl font-bold mt-4">
              Hey, Welcome Back!
            </Text>

            <Text className="text-white text-xl mt-2">
              Enter the credentials below
            </Text>
          </View>
          
          <View className={`justify-start items-center flex-1 bg-white w-full rounded-t-3xl p-4 ${Platform.OS === 'web' ? 'flex-row' : 'flex-col'}`}>
            <View className="flex-1 justify-center items-center">
              <Text className="w-96 px-1 items-start">
                Email
              </Text>

              <TextInput
                className="w-96 h-12 my-1 border-gray-300 border-2 rounded-xl p-4"
                placeholder='Email'
                placeholderTextColor="#A9A9A9"
                keyboardType='email-address'
                autoCapitalize='none'>
              </TextInput>
              
              <Text className="w-96 px-1 items-start mt-2">
                Password
              </Text>

              <TextInput
                className="w-96 h-12 my-1 border-gray-300 border-2 rounded-xl p-4"
                placeholder='Password'
                placeholderTextColor="#A9A9A9"
                secureTextEntry={true}>
              </TextInput>

              <TouchableOpacity className="my-4 w-96 items-end">
                <Text>
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity className="justify-center items-center w-96 h-14 my-2 border-gray-700 bg-gray-700 border-2 rounded-xl p-4" onPress={handleLogin}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white font-bold">Login</Text>
                )}
              </TouchableOpacity>
            </View>

            <View className="flex-1 justify-center items-center">
              <Text className="text-gray-400 mb-2">
                Or continue with
              </Text>

              <TouchableOpacity className="flex-row justify-center items-center w-96 h-14 my-2 border-gray-700 border-2 rounded-xl p-4" onPress={handleGoogleLogin}>
                {loadingGoogle ? (
                  <ActivityIndicator size="small" color="#000" />
                ) : (
                  <>
                    <Image
                      source={require('../assets/Google.png')}
                      style={{ width: 20, height: 20, marginRight: 4 }}
                    />
                    <Text className="text-black font-bold ml-1">
                      Google
                    </Text>
                  </>
                )}
              </TouchableOpacity>

              <View className="flex-row items-center mt-2">
                <Text className="pr-1">
                  Don't have an account?
                </Text>
                <TouchableOpacity onPress={handleSignUp}>
                  <Text className="font-bold underline">
                    Sign Up
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/30">
          <View className="w-80 p-5 bg-white rounded-2xl bg-white">
            <Text className="text-lg font-semibold text-center">
              Login Successful!
            </Text>
            <TouchableOpacity className="justify-center items-center h-14 mt-4 border-gray-700 bg-gray-700 border-2 rounded-xl p-4" onPress={() => { setModalVisible(false); navigation.navigate('Homepage'); }}>
              <Text className="text-white font-bold">
                Proceed to Homepage
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ImageBackground>
  );
}

export default Login;