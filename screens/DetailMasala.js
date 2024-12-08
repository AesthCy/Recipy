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
    { name: "Chicken Breast", amount: "500g, cubed" },
    { name: "Yogurt", amount: "1 cup" },
    { name: "Lemon Juice", amount: "2 tbsp" },
    { name: "Garlic", amount: "4 cloves, minced" },
    { name: "Ginger", amount: "1-inch piece, grated" },
    { name: "Garam Masala", amount: "2 tsp" },
    { name: "Cumin Powder", amount: "1 tsp" },
    { name: "Coriander Powder", amount: "1 tsp" },
    { name: "Turmeric Powder", amount: "1/2 tsp" },
    { name: "Paprika", amount: "1 tsp" },
    { name: "Salt", amount: "to taste" },
    { name: "Vegetable Oil", amount: "2 tbsp" },
    { name: "Onion", amount: "1 large, finely chopped" },
    { name: "Tomato Puree", amount: "1 cup" },
    { name: "Coconut Milk", amount: "1 cup" },
    { name: "Fresh Cilantro", amount: "for garnish" },
  ];

  const steps = [
    "In a bowl, mix yogurt, lemon juice, minced garlic, grated ginger, garam masala, cumin, coriander, turmeric, paprika, and salt. Add the cubed chicken and marinate for at least 1 hour (or overnight in the fridge).",
    "Preheat the oven to 200°C (400°F). Spread the marinated chicken on a baking sheet and bake for 15-20 minutes, until cooked through and slightly charred.",
    "In a large skillet, heat vegetable oil over medium heat. Add the chopped onion and sauté until golden brown.",
    "Stir in the tomato puree and cook for about 5-7 minutes until the mixture thickens.",
    "Add the cooked chicken to the skillet and stir well to combine.",
    "Pour in the coconut milk and bring to a simmer. Cook for another 10-15 minutes, allowing the flavors to meld together.",
    "Adjust salt to taste and garnish with fresh cilantro.",
    "Serve hot with basmati rice or naan."
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
        source={require("../assets/Tikka Masala.jpg")}
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
            Chicken Tikka Masala
          </Text>
        </View>

        <ScrollView>
          <Text className="text-gray-500 text-lg px-8 mt-4">
            Chicken Tikka Masala is a beloved dish that originated from Indian cuisine, featuring marinated chunks of chicken that are grilled or roasted until tender and then simmered in a rich, creamy tomato-based sauce. The marinade typically includes yogurt and a blend of spices like garam masala, cumin, and coriander, which infuse the chicken with deep flavors. The sauce is often enriched with cream or coconut milk, giving it a smooth and velvety texture. Served with fragrant basmati rice or warm naan bread, Chicken Tikka Masala is celebrated for its balance of spices and its comforting, hearty nature, making it a favorite in Indian restaurants worldwide.
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
