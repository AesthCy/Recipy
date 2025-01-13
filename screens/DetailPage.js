import { View, Text, Image, Platform, TouchableOpacity, ScrollView, FlatList, Dimensions   } from 'react-native';
import React, { useState, useEffect } from 'react';
import "../global.css";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';

const Detail = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Homepage');
  };
  
  const ingredients = [
    { name: "Tomato Sauce", amount: "1 cup" },
    { name: "Mozzarella", amount: "200g" },
    { name: "Basil Leaves", amount: "10 leaves" },
    { name: "Pepperoni", amount: "100g" },
    { name: "Mushrooms", amount: "1/2 cup" },
    { name: "Onions", amount: "1/4 cup, sliced" },
    { name: "Olives", amount: "1/4 cup" },
    { name: "Bell Peppers", amount: "1/4 cup, chopped" }
  ];

  const steps = [
    "Preheat your oven to 475°F (245°C).",
    "Roll out the pizza dough on a floured surface.",
    "Spread tomato sauce over the dough.",
    "Add mozzarella cheese evenly on top.",
    "Layer pepperoni, mushrooms, onions, and other toppings.",
    "Bake for 12-15 minutes until the crust is golden brown.",
    "Let it cool for a few minutes before slicing.",
    "Serve and enjoy your homemade pizza!"
  ];

  const [buttonStates, setButtonStates] = useState(Array(ingredients.length).fill(false));
  const [currentStep, setCurrentStep] = useState(0); // Not Started == Masih di step 1

  // Not Started = Bahan-bahan belum punya semua
  useEffect(() => {
    setButtonStates(Array(ingredients.length).fill(false));
  }, []);

  const toggleButton = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View className={`flex-1 bg-gray-300 justify-center items-center ${Platform.OS === 'web' ? 'flex-row' : 'flex-col'}`}>
      <Image 
        source={require("../assets/Pizza.jpg")}
        style={{
          width: Platform.OS === 'web' ? '35%' : '100%',
          height: Platform.OS === 'web' ? '100%' : '35%',
          position: 'relative'
        }}>

      </Image>
      
      <View 
        className={`justify-start items-start flex-1 h-full bg-white w-full ${Platform.OS === 'web' ? 'rounded-l-3xl' : 'rounded-t-3xl'}`}
        style={{
          marginTop: Platform.OS === 'web' ? 0 : -50,
          marginLeft: Platform.OS === 'web' ? -30 : 0
        }}>

        <View className="bg-slate-100 rounded-t-3xl w-full justify-start items-center flex-row p-4">
          <TouchableOpacity className="w-10 h-10 bg-slate-200 rounded-full justify-center items-center" onPress={handleGoBack}>
            <Icon name="arrow-back" size={20} color="#000" />
          </TouchableOpacity>
          
          <Text className="flex-1 text-black text-3xl font-bold pl-4">
            Homemade Pizza
          </Text>
        </View>

        <ScrollView>
          <Text className="text-gray-500 text-lg px-8 mt-4">
            Homemade pizza is a delightful culinary experience that brings the joy of creating a personalized dish right into your kitchen. Made from scratch, it begins with a soft, chewy crust that can be hand-tossed or rolled out to perfection, providing a warm base for a myriad of toppings.
          </Text>

          <View className="flex-row justify-start items-center px-8 mt-4">
            <Text className="text-black text-2xl font-bold">
              Ingredients
            </Text>
            <Text className="text-green-500 text-2xl font-bold pl-2">
              ({ingredients.length})
            </Text>
          </View>

          <View className="mt-4 px-8 w-full">
            {ingredients.map((ingredient, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleButton(index)}
                style={{
                  height: 50,
                  marginVertical: 5,
                  backgroundColor: buttonStates[index] ? 'green' : 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: 'gray',
                  flexDirection: 'row',
                }}
              >
                <Text style={{ color: buttonStates[index] ? 'white' : 'black', flex: 1, textAlign: 'left', paddingLeft: 10 }}>
                  {ingredient.name}
                </Text>
                <Text style={{ color: buttonStates[index] ? 'white' : 'gray', paddingRight: 10 }}>
                  {ingredient.amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Progress Bar */}
          <View className="flex-1 justify-center items-center p-5 mt-4 bg-gray-100">
            <Progress.Bar
              progress={(currentStep + 1) / steps.length}
              width={300}
              color={currentStep === steps.length - 1 ? "green" : "#76c7c0"}
              borderWidth={0}
              style={{ marginBottom: 20 }}
            />
            <Text className="text-base text-gray-500">{`Progress: ${currentStep + 1} of ${steps.length}`}</Text>
          </View>

          {/* Step-by-Step Card */}
          <View className="flex-1 justify-center items-center bg-red-100">
            <FlatList
              data={steps}
              horizontal
              pagingEnabled
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={{ width: screenWidth - 20, height: 120, justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: '#f9f9f9', margin: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 2 }}>
                  <Text className="text-xl font-bold">{`Step ${index + 1}`}</Text>
                  <Text className="text-base text-center px-2">{item}</Text>
                </View>
              )}

              onScroll={(event) => {
                const contentOffsetX = event.nativeEvent.contentOffset.x;
                const currentIndex = Math.floor(contentOffsetX / (screenWidth - 20)); // Adjust based on the width of the card
                setCurrentStep(currentIndex);
              }}

              // Not Started == Masih di step 1
              initialScrollIndex={0} 
              getItemLayout={(data, index) => (
                { length: screenWidth, offset: (screenWidth) * index, index }
              )}>
            </FlatList>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Detail;