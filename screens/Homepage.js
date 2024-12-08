import { View, Text, Image, TextInput, ScrollView, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import "../global.css";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const Homepage = () => {

  const navigation = useNavigation();

  const handleDetailPizza = () => {
    navigation.navigate('DetailPizza');
  }

  const handleDetailSpaghetti = () => {
    navigation.navigate('DetailSpaghetti');
  }

  const handleDetailMasala = () => {
    navigation.navigate('DetailMasala');
  }

  const handleDetailKungPao = () => {
    navigation.navigate('DetailKungPao');
  }

  const handleDetailPadThai = () => {
    navigation.navigate('DetailPadThai');
  }

  const handleDetailRamen = () => {
    navigation.navigate('DetailRamen');
  }

  return (
  <LinearGradient 
    colors={['#FFFFFF', '#FEE4E7', '#FEE4E7']}
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'start'
    }}>
    
    <View 
      className={`justify-start items-center flex-row w-full z-10 border-none bg-transparent rounded-b-3xl ${Platform.OS === 'web' ? 'pt-4' : 'pt-16'}`}
      style={{
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 20
      }}>

      <Image
        source={require('../assets/ProfileIcon.png')}
        style={{
          width: 40,
          height: 40,
          marginLeft: 16,
          marginBottom: 16
        }}>
      </Image>

      <Text className="text-black text-2xl font-bold px-2 mb-4 mr-4">
        Welcome, Gerald!
      </Text>
    </View>

    <View className="flex-1 w-full z-0">
      <ScrollView 
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'start',
          paddingHorizontal: 16
        }}>
        
        <View className="flex-row items-center w-full h-12 my-4 border-white bg-white border-2 rounded-xl p-2">
          <TouchableOpacity>
            <Icon name="search" size={20} color="#A9A9A9" style={{ marginRight: 8 }} />
          </TouchableOpacity>
          
          <TextInput
            className={`${Platform.OS === 'web' ? 'w-full' : 'w-11/12'} h-12 my-2 border-white bg-white border-2 rounded-xl text-gray-700`}
            placeholder='What are you cooking today?'
            placeholderTextColor="#A9A9A9"
            keyboardType='search'
            autoCapitalize='none'>
          </TextInput>
        </View>

        <Text className="text-black text-lg mt-2 px-2">
          Recommendations for You
        </Text>

        <View className="flex-col justify-center items-start w-full h-12 my-2">
          <ScrollView
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>

            <TouchableOpacity className="justify-center items-center h-12 mr-2 border-white bg-white border-2 rounded-xl px-4">
              <Text className="text-black">
                Cheeseburger
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="justify-center items-center h-12 mx-2 border-white bg-white border-2 rounded-xl px-4">
              <Text className="text-black">
                Pepperoni Pizza
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="justify-center items-center h-12 mx-2 border-white bg-white border-2 rounded-xl px-4">
              <Text className="text-black">
                Risotto
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="justify-center items-center h-12 mx-2 border-white bg-white border-2 rounded-xl px-4">
              <Text className="text-black">
                Nasi Goreng
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="justify-center items-center h-12 mx-2 border-white bg-white border-2 rounded-xl px-4">
              <Text className="text-black">
                Lasagna
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="justify-center items-center h-12 mx-2 border-white bg-white border-2 rounded-xl px-4">
              <Text className="text-black">
                Steak
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="justify-center items-center h-12 ml-2 border-white bg-white border-2 rounded-xl px-4">
              <Text className="text-black">
                Spicy Tuna Sandwich
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <Text className="text-black text-lg mt-4 px-2">
          Your Progress
        </Text>

        <View className="flex-row w-full justify-center items-center my-4 mt-2">
          <TouchableWithoutFeedback onPress={handleDetailPizza}>
            <View className="flex-1 h-80 rounded-3xl mr-2 border-white bg-white">
              <Image
                source={require('../assets/Pizza.jpg')}
                style={{
                  width: '100%',
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  flex: 1
                }}>
              </Image>

              <View className="flex-1 w-full p-2 justify-center">
                <View className="flex-row justify-start items-center">
                  <Text 
                    className="flex-1 text-xl font-bold mr-2"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Homemade Pizza
                  </Text>
                  <TouchableOpacity>
                    <Icon name="heart-outline" size={20} color="#A9A9A9"/>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-xs font-light">
                  Western Food
                </Text>

                <View className="flex-row mt-2">
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="alarm" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      1 Hour 30 Mins
                    </Text>
                  </View>
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="person" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      4 Serving(s)
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-light mt-2">
                  9 users liked this recipe
                </Text>
                
                <Text className="text-xs font-light">
                  15 users recommended this recipe
                </Text>

                <Text className="text-red-500 font-bold mt-2">
                  Not Started
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleDetailSpaghetti}>
            <View className="flex-1 h-80 rounded-3xl ml-2 border-white bg-white">
              <Image
                source={require('../assets/Caesar Spaghetti.jpg')}
                style={{
                  width: '100%',
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  flex: 1
                }}>
              </Image>

              <View className="flex-1 w-full p-2 justify-center">
                <View className="flex-row justify-start items-center">
                  <Text 
                    className="flex-1 text-xl font-bold mr-2"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Caesar Spaghetti
                  </Text>
                  <TouchableOpacity>
                    <Icon name="heart-outline" size={20} color="#A9A9A9"/>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-xs font-light">
                  Western Food
                </Text>

                <View className="flex-row mt-2">
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="alarm" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      30 Mins
                    </Text>
                  </View>
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="person" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      1 Serving
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-light mt-2">
                  36 users liked this recipe
                </Text>
                
                <Text className="text-xs font-light">
                  60 users recommended this recipe
                </Text>

                <Text className="text-yellow-500 font-bold mt-2">
                  In Progress
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View className="flex-row w-full justify-center items-center my-4 mt-2">
          <TouchableWithoutFeedback onPress={handleDetailMasala}>
            <View className="flex-1 h-80 rounded-3xl mr-2 border-white bg-white">
              <Image
                source={require('../assets/Tikka Masala.jpg')}
                style={{
                  width: '100%',
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  flex: 1
                }}>
              </Image>

              <View className="flex-1 w-full p-2 justify-center">
                <View className="flex-row justify-start items-center">
                  <Text 
                    className="flex-1 text-xl font-bold mr-2"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Chicken Tikka Masala
                  </Text>
                  <TouchableOpacity>
                    <Icon name="heart-outline" size={20} color="#A9A9A9"/>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-xs font-light">
                  Eastern Food
                </Text>

                <View className="flex-row mt-2">
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="alarm" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      1 Hour
                    </Text>
                  </View>
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="person" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      6-8 Serving(s)
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-light mt-2">
                  126 users liked this recipe
                </Text>
                
                <Text className="text-xs font-light">
                  89 users recommended this recipe
                </Text>

                <Text className="text-green-500 font-bold mt-2">
                  Cooked
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleDetailKungPao}>
            <View className="flex-1 h-80 rounded-3xl ml-2 border-white bg-white">
              <Image
                source={require('../assets/Kung Pao Chicken.jpg')}
                style={{
                  width: '100%',
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  flex: 1
                }}>
              </Image>

              <View className="flex-1 w-full p-2 justify-center">
                <View className="flex-row justify-start items-center">
                  <Text 
                    className="flex-1 text-xl font-bold mr-2"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Kung Pao Chicken
                  </Text>
                  <TouchableOpacity>
                    <Icon name="heart-outline" size={20} color="#A9A9A9"/>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-xs font-light">
                  Chinese Food
                </Text>

                <View className="flex-row mt-2">
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="alarm" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      30 Mins
                    </Text>
                  </View>
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="person" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      4 Serving(s)
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-light mt-2">
                  54 users liked this recipe
                </Text>
                
                <Text className="text-xs font-light">
                  47 users recommended this recipe
                </Text>

                <Text className="text-red-500 font-bold mt-2">
                  Not Started
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        <View className="flex-row w-full justify-center items-center my-4 mt-2">
          <TouchableWithoutFeedback onPress={handleDetailPadThai}>
            <View className="flex-1 h-80 rounded-3xl mr-2 border-white bg-white">
              <Image
                source={require('../assets/Pad Thai.jpg')}
                style={{
                  width: '100%',
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  flex: 1
                }}>
              </Image>

              <View className="flex-1 w-full p-2 justify-center">
                <View className="flex-row justify-start items-center">
                  <Text 
                    className="flex-1 text-xl font-bold mr-2"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Pad Thai
                  </Text>
                  <TouchableOpacity>
                    <Icon name="heart-outline" size={20} color="#A9A9A9"/>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-xs font-light">
                  Asian Food
                </Text>

                <View className="flex-row mt-2">
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="alarm" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      30 Mins
                    </Text>
                  </View>
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="person" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      4 Serving(s)
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-light mt-2">
                  37 users liked this recipe
                </Text>
                
                <Text className="text-xs font-light">
                  29 users recommended this recipe
                </Text>

                <Text className="text-yellow-500 font-bold mt-2">
                  In Progress
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleDetailRamen}>
            <View className="flex-1 h-80 rounded-3xl ml-2 border-white bg-white">
              <Image
                source={require('../assets/Tonkotsu Ramen.jpg')}
                style={{
                  width: '100%',
                  borderRadius: 20,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  flex: 1
                }}>
              </Image>

              <View className="flex-1 w-full p-2 justify-center">
                <View className="flex-row justify-start items-center">
                  <Text 
                    className="flex-1 text-xl font-bold mr-2"
                    numberOfLines={1}
                    ellipsizeMode='tail'>
                    Tonkotsu Ramen
                  </Text>
                  <TouchableOpacity>
                    <Icon name="heart-outline" size={20} color="#A9A9A9"/>
                  </TouchableOpacity>
                </View>
                
                <Text className="text-xs font-light">
                  Japanese Food
                </Text>

                <View className="flex-row mt-2">
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="alarm" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      12 Hours
                    </Text>
                  </View>
                  <View className="flex-1 flex-row justify-start items-center">
                    <Icon name="person" size={16} color="#A9A9A9"/>
                    <Text className="pl-1 text-xs font-light">
                      8-12 Serving(s)
                    </Text>
                  </View>
                </View>

                <Text className="text-xs font-light mt-2">
                  328 users liked this recipe
                </Text>
                
                <Text className="text-xs font-light">
                  257 users recommended this recipe
                </Text>

                <Text className="text-green-500 font-bold mt-2">
                  Cooked
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
    
    <View 
      className={`w-full rounded-t-3xl z-10 bg-white ${Platform.OS === 'web' ? 'border-t-2 border-x-2' : 'border-t-hairline border-x-hairline'}`}>
      <View className="p-5 justify-center items-center flex-row">
        <TouchableOpacity className="flex-1 justify-center items-center">
          <Image 
              source={require('../assets/Main.png')}>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 justify-center items-center">
          <Image 
              source={require('../assets/Favorite.png')}>
          </Image>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 justify-center items-center">
          <Image 
              source={require('../assets/Profile.png')}>
          </Image>
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
  )
}

export default Homepage