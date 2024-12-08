import { View, Text, Image, Platform, TouchableOpacity, ScrollView, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect} from 'react';
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
    { name: "Pork Bones", amount: "1.5 kg" },
    { name: "Pork Fatback", amount: "100g" },
    { name: "Garlic", amount: "6 cloves, peeled" },
    { name: "Ginger", amount: "1 piece, sliced" },
    { name: "Green Onions", amount: "5 stalks, sliced" },
    { name: "Onion", amount: "1 large, peeled and halved" },
    { name: "Water", amount: "8 liters" },
    { name: "Soy Sauce", amount: "1/4 cup" },
    { name: "Mirin", amount: "1/4 cup" },
    { name: "Salt", amount: "to taste" },
    { name: "Ramen Noodles", amount: "500g" },
    { name: "Chashu Pork", amount: "sliced, as desired" },
    { name: "Soft-Boiled Eggs", amount: "2, halved" },
    { name: "Menma (fermented bamboo shoots)", amount: "1/2 cup" },
    { name: "Nori (seaweed sheets)", amount: "as desired" },
    { name: "Sesame Seeds", amount: "1 tbsp, toasted" }
  ];

  const steps = [
    "Rinse the pork bones thoroughly under cold water to remove blood and impurities.",
    "In a large pot, bring water to a boil and add the pork bones. Boil for 15 minutes.",
    "Drain the water and rinse the bones under cold water, scrubbing off any remaining impurities.",
    "Place the cleaned pork bones back into a large pot with fresh water, garlic, ginger, green onions, and onion.",
    "Bring the water to a boil, then reduce heat and let it simmer for 10-12 hours. Check occasionally and add water if needed.",
    "After 5-6 hours, add pork fatback into the pot and let it simmer until soft. Remove and set aside.",
    "Once the broth has reduced and turned creamy, strain it into a clean pot. Discard the bones and vegetables.",
    "Add soy sauce, mirin, and salt to the broth to taste. Simmer for another 30 minutes.",
    "Prepare ramen noodles according to package instructions and set aside.",
    "In each serving bowl, place noodles and add a ladle of hot broth over the noodles.",
    "Top with slices of chashu pork, soft-boiled eggs, menma, nori, and green onions.",
    "Sprinkle toasted sesame seeds over the top for added flavor.",
    "Serve hot and enjoy your rich and creamy Tonkotsu Ramen!"
  ];

  const [buttonStates, setButtonStates] = useState(Array(ingredients.length).fill(false));
  const [currentStep, setCurrentStep] = useState(steps.length - 1); // Completed == Sudah sampai step terakhir

  // Completed = Bahan-bahan sudah punya
  useEffect(() => {
    setButtonStates(Array(ingredients.length).fill(true));
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
        source={require("../assets/Tonkotsu Ramen.jpg")}
        style={{
          width: Platform.OS === 'web' ? '35%' : '100%',
          height: Platform.OS === 'web' ? '100%' : '35%',
          position: 'relative'
        }} 
      />
      
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
            Tonkotsu Ramen
          </Text>
        </View>

        <ScrollView>
          <Text className="text-gray-500 text-lg px-8 mt-4">
            Tonkotsu Ramen is a renowned Japanese noodle dish characterized by its rich and creamy broth made from pork bones simmered for an extended period, typically 12 hours or more. This long cooking process results in a broth that is rich in collagen, providing a deep flavor and silky texture. The ramen noodles used are usually thin and chewy, served with various toppings such as chashu (braised pork belly), soft-boiled eggs, nori (seaweed), and green onions. Tonkotsu ramen is often garnished with minced garlic, chashu, and other seasonings to enhance the taste, making it a deeply satisfying and flavorful dish.
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
                const currentIndex = Math.floor(contentOffsetX / (screenWidth - 20));
                setCurrentStep(currentIndex);
              }}

              // Completed == Sudah sampai step terakhir
              initialScrollIndex={steps.length - 1} 
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