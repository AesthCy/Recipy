import { View, Text, Image, Platform, TouchableOpacity, ScrollView, FlatList, Dimensions   } from 'react-native';
import React, { useState, useEffect } from 'react';
import "../global.css";
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import { database } from "../firebaseConfig";
import { ref, get, set } from "firebase/database";

const Detail = () => {
  const route = useRoute();
  const { recipe, user, indexRecipe } = route.params;

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('Homepage', { user: user });
  };

  const [buttonStates, setButtonStates] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const ingredientsRef = ref(database, `recipes/${indexRecipe}/ingredientsTaken/${user.uid}`);
        const snapshot = await get(ingredientsRef);
    
        if (snapshot.exists()) {
          setButtonStates(Object.values(snapshot.val()));
        } else {
          console.log("No data available for ingredients. Initializing...");
    
          // Inisialisasi dengan false untuk semua ingredients
          const initialIngredients = recipe.ingredients.map(() => false);
          await set(ingredientsRef, initialIngredients);
    
          setButtonStates(initialIngredients);
        }
      } catch (error) {
        console.error("Error fetching ingredients data:", error.message);
      }
    };

    const fetchSteps = async () => {
      try {
        const stepRef = ref(database, `recipes/${indexRecipe}/stepsTaken/${user.uid}`);
        const snapshot = await get(stepRef);
    
        if (snapshot.exists()) {
          setCurrentStep(parseInt(snapshot.val(), 10));
        } else {
          console.log("No data available for steps. Initializing...");
    
          // Inisialisasi langkah awal ke 0
          await set(stepRef, 0);
    
          setCurrentStep(0);
        }
      } catch (error) {
        console.error("Error fetching steps data:", error.message);
      }
    };

    const fetchData = async () => {
      await fetchIngredients();
      await fetchSteps();
      setIsInitialized(true);
    };
  
    fetchData();

  }, [recipe, user.uid, indexRecipe]);

  // Toggle button and update Firebase
  const toggleButton = (index) => {
    const newButtonStates = [...buttonStates];
    newButtonStates[index] = !newButtonStates[index];
    setButtonStates(newButtonStates);

    const ingredientsRef = ref(database, `recipes/${indexRecipe}/ingredientsTaken/${user.uid}/${index}`);
    set(ingredientsRef, newButtonStates[index]);
  };

  // Handle step change and update Firebase
  const handleStepChange = (index) => {
    setCurrentStep(index);

    const stepRef = ref(database, `recipes/${indexRecipe}/stepsTaken/${user.uid}`);
    set(stepRef, index);

    let newStatus = "In Progress";
    if (index === 0) {
      newStatus = "Not Started";
    } else if (index === recipe.steps.length - 1) {
      newStatus = "Cooked";
    }

    const recipeStatusRef = ref(database, `recipes/${indexRecipe}/status/${user.uid}`);
    set(recipeStatusRef, newStatus);
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <View className={`flex-1 bg-gray-300 justify-center items-center ${Platform.OS === 'web' ? 'flex-row' : 'flex-col'}`}>
      <Image 
        source={{ uri: recipe.source }}
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
            {recipe.name}
          </Text>
        </View>

        <ScrollView>
          <Text className="text-gray-500 text-lg px-8 mt-4">
            {recipe.description}
          </Text>

          <View className="flex-row justify-start items-center px-8 mt-4">
            <Text className="text-black text-2xl font-bold">
              Ingredients
            </Text>
            <Text className="text-green-500 text-2xl font-bold pl-2">
              ({recipe.ingredients.length})
            </Text>
          </View>

          <View className="mt-4 px-8 w-full">
            {recipe.ingredients.map((ingredient, index) => (
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
                  {ingredient.quantity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('SupermarketPage', {user: user, index: 0})}
            style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text className="mt-4 mb-2 px-2 py-2 text-xl font-bold underline">Buy these ingredients needed here!</Text>
          </TouchableOpacity>


          {/* Progress Bar */}
          <View className="flex-1 justify-center items-center p-5 mt-4 bg-gray-100">
            <Progress.Bar
              progress={(currentStep + 1) / recipe.steps.length}
              width={300}
              color={currentStep === recipe.steps.length - 1 ? "green" : "#76c7c0"}
              borderWidth={0}
              style={{ marginBottom: 20 }}
            />
            <Text className="text-base text-gray-500">{`Progress: ${currentStep + 1} of ${recipe.steps.length}`}</Text>
          </View>
          
          {/* Step-by-Step Card */}
          <View className="flex-1 justify-center items-center bg-red-100">
            {isInitialized ? (
              <FlatList
                data={recipe.steps}
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
                  handleStepChange(currentIndex);
                }}

                initialScrollIndex={currentStep} 
                getItemLayout={(data, index) => (
                  { length: screenWidth, offset: (screenWidth) * index, index }
                )}>
              </FlatList>
            ) : (
              <Text>Loading...</Text>
            )}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Detail;
