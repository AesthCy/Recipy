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
    { name: "Chicken Breast", amount: "300g, diced" },
    { name: "Peanuts", amount: "100g, roasted" },
    { name: "Bell Pepper", amount: "1, diced" },
    { name: "Zucchini", amount: "1, diced" },
    { name: "Green Onions", amount: "3 stalks, chopped" },
    { name: "Garlic", amount: "3 cloves, minced" },
    { name: "Ginger", amount: "1-inch piece, minced" },
    { name: "Soy Sauce", amount: "3 tbsp" },
    { name: "Rice Vinegar", amount: "1 tbsp" },
    { name: "Hoisin Sauce", amount: "1 tbsp" },
    { name: "Sesame Oil", amount: "1 tsp" },
    { name: "Cornstarch", amount: "1 tbsp" },
    { name: "Water", amount: "2 tbsp" },
    { name: "Dried Red Chili Peppers", amount: "3-4, adjust for spice preference" },
    { name: "Vegetable Oil", amount: "2 tbsp" },
  ];

  const steps = [
    "In a bowl, mix diced chicken with soy sauce, cornstarch, and sesame oil. Let it marinate for at least 15 minutes.",
    "In a small bowl, combine hoisin sauce, rice vinegar, and water. Set aside.",
    "Heat vegetable oil in a large skillet or wok over medium-high heat.",
    "Add the marinated chicken to the skillet and cook until golden brown and cooked through. Remove the chicken from the skillet and set aside.",
    "In the same skillet, add the minced garlic, ginger, and dried red chili peppers. Stir-fry for about 30 seconds until fragrant.",
    "Add the diced bell pepper and zucchini to the skillet. Stir-fry for 3-4 minutes until the vegetables are tender-crisp.",
    "Return the cooked chicken to the skillet and add the hoisin sauce mixture. Stir well to combine.",
    "Add the roasted peanuts and chopped green onions, stirring to incorporate everything. Cook for another 2 minutes.",
    "Serve hot with steamed rice."
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
        source={require("../assets/Kung Pao Chicken.jpg")}
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
            Kung Pao Chicken
          </Text>
        </View>

        <ScrollView>
          <Text className="text-gray-500 text-lg px-8 mt-4">
            Kung Pao Chicken is a classic dish from Sichuan cuisine that combines tender diced chicken with a colorful mix of vegetables and roasted peanuts, all tossed in a savory, slightly spicy sauce. The dish is characterized by its bold flavors, featuring ingredients like soy sauce, vinegar, and Sichuan peppercorns, which provide a distinctive numbing heat. Traditionally, it includes bell peppers, scallions, and sometimes water chestnuts, adding crunch and freshness. Kung Pao Chicken is often served over steamed rice, making it a satisfying and flavorful meal that showcases the rich culinary heritage of China.
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
