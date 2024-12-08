import { View, Text, Image, Platform, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
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
    { name: "Spaghetti", amount: "200g" },
    { name: "Olive Oil", amount: "2 tbsp" },
    { name: "Garlic", amount: "2 cloves, minced" },
    { name: "Parmesan Cheese", amount: "1/2 cup, grated" },
    { name: "Anchovy Paste", amount: "1 tbsp" },
    { name: "Egg Yolks", amount: "2" },
    { name: "Lemon Juice", amount: "1 tbsp" },
    { name: "Fresh Parsley", amount: "1 tbsp, chopped" },
  ];

  const steps = [
    "Boil the spaghetti in salted water according to package instructions.",
    "In a pan, heat olive oil over medium heat and sauté garlic until fragrant.",
    "Add anchovy paste and cook briefly.",
    "In a bowl, whisk together egg yolks, parmesan cheese, and lemon juice.",
    "Drain spaghetti and add it to the pan with garlic and anchovy paste.",
    "Remove from heat and quickly mix in the egg yolk mixture to create a creamy sauce.",
    "Sprinkle with parsley and serve immediately."
  ];

  const [buttonStates, setButtonStates] = useState(Array(ingredients.length).fill(false));
  const [currentStep, setCurrentStep] = useState(4); // In Progress == Sudah mengikuti beberapa step (Contoh: Step 5)

  // Completed = Bahan-bahan punya beberapa (Contoh baru setengah)
  useEffect(() => {
    setButtonStates(Array(Math.ceil(ingredients.length / 2)).fill(true));
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
        source={require("../assets/Caesar Spaghetti.jpg")}
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
            Caesar Spaghetti
          </Text>
        </View>

        <ScrollView>
          <Text className="text-gray-500 text-lg px-8 mt-4">
          Caesar Spaghetti is a delightful twist on the classic Caesar salad, combining the flavors of creamy Caesar dressing with al dente spaghetti. This dish typically features cooked spaghetti tossed in a rich dressing made from ingredients like garlic, anchovies, egg yolks, and Parmesan cheese, creating a savory and tangy flavor profile. Fresh romaine lettuce or baby greens are often added for crunch, along with croutons for texture.
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

              // In Progress == Sudah mengikuti beberapa step (Contoh: Step 5)
              initialScrollIndex={4} 
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
