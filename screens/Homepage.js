import { View, Text, Image, TextInput, ScrollView, Platform, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useEffect } from 'react';
import "../global.css";
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ref, get, update } from "firebase/database";
import { database } from "../firebaseConfig";

const Homepage = () => {
  const route = useRoute();
  const { user } = route.params;
  const [userData, setUserData] = useState(null); // State to store user data
  const [recipes, setRecipes] = useState([]); // Simpan data resep
  const [supermarkets, setSupermarkets] = useState([]); // Simpan data supermarket
  const [loading, setLoading] = useState(true); // Loading state

  const navigation = useNavigation();

  useEffect(() => {
    // Fungsi untuk mengambil data pengguna
    const fetchUserData = async () => {
      try {
        const userRef = ref(database, `users/${user.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          console.log("No data available for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // Fungsi untuk mengambil data resep dan memperbarui status jika diperlukan
    const fetchRecipes = async () => {
      try {
        const recipesRef = ref(database, 'recipes');
        const snapshot = await get(recipesRef);

        if (snapshot.exists()) {
          const recipesData = snapshot.val();
          const updatedRecipes = [];

          for (const [index, recipe] of recipesData.entries()) {
            if (recipe && recipe.status) {
              // Periksa apakah status untuk user.uid sudah ada
              if (!recipe.status[user.uid]) {
                // Tambahkan status "Not Started" untuk user.uid
                const recipeStatusRef = ref(database, `recipes/${index}/status`);
                await update(recipeStatusRef, { [user.uid]: "Not Started" });
                recipe.status[user.uid] = "Not Started"; // Perbarui lokal
              }
            }
            updatedRecipes.push(recipe);
          }

          setRecipes(updatedRecipes); // Simpan data resep ke state
        } else {
          console.log("No recipes found.");
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    // Fungsi untuk mengambil data pengguna
    const fetchSupermarket = async () => {
      try {
        const supermarketRef = ref(database, 'supermarkets');
        const snapshot = await get(supermarketRef);

        if (snapshot.exists()) {
          setSupermarkets(snapshot.val());
        } else {
          console.log("No data available for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchUserData();
      await fetchRecipes();
      await fetchSupermarket();
      setLoading(false);
    };

    fetchData();
  }, [user.uid]);

  const validRecipes = recipes.filter(recipe => recipe !== undefined && recipe !== null);

  const RecipeCard = ({ recipe, onPress }) => {
    if (!recipe) return null;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View className="flex-1 h-80 rounded-3xl mx-2 border-white bg-white">
          <Image
            source={{ uri: recipe.source }}
            style={{
              width: '100%',
              borderRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              flex: 1
            }}
          />
    
          <View className="flex-1 w-full p-2 justify-center">
            <View className="flex-row justify-start items-center">
              <Text 
                className="flex-1 text-xl font-bold mr-2"
                numberOfLines={1}
                ellipsizeMode='tail'>
                {recipe.name}
              </Text>
              <TouchableOpacity>
                <Icon name="heart-outline" size={20} color="#A9A9A9"/>
              </TouchableOpacity>
            </View>
            
            <Text className="text-xs font-light">
              {recipe.category}
            </Text>
    
            <View className="flex-row mt-2">
              <View className="flex-1 flex-row justify-start items-center">
                <Icon name="alarm" size={16} color="#A9A9A9"/>
                <Text className="pl-1 text-xs font-light">
                  {recipe.duration >= 60 
                    ? `${Math.floor(recipe.duration / 60)} Hour${Math.floor(recipe.duration / 60) > 1 ? 's' : ''} ${recipe.duration % 60 ? `${recipe.duration % 60} Mins` : ''}`
                    : `${recipe.duration} Mins`
                  }
                </Text>
              </View>
              <View className="flex-1 flex-row justify-start items-center">
                <Icon name="person" size={16} color="#A9A9A9"/>
                <Text className="pl-1 text-xs font-light">
                  {recipe.serving} Serving(s)
                </Text>
              </View>
            </View>
    
            <Text className="text-xs font-light mt-2">
              {recipe.like} users liked this recipe
            </Text>
            
            <Text className="text-xs font-light">
              {recipe.recommend} users recommended this recipe
            </Text>
    
            <Text className={`font-bold mt-2 ${
              recipe.status[user.uid] === "Not Started" ? "text-red-500" :
              recipe.status[user.uid] === "In Progress" ? "text-yellow-500" :
              "text-green-500"
            }`}>
              {recipe.status[user.uid]}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  const SupermarketCard = ({ supermarket, onPress }) => {
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View className="flex-1 h-80 rounded-3xl mx-2 my-2 border-white bg-white">
          <Image
            source={{ uri: supermarket.source }}
            style={{
              width: '100%',
              borderRadius: 20,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              flex: 1
            }}
          />
    
          <View className="flex-1 w-full p-2 justify-center">
            <View className="flex-row flex-1 justify-start items-center">
              <Text 
                className="flex-1 text-2xl font-bold"
                numberOfLines={1}
                ellipsizeMode='tail'>
                {supermarket.name}
              </Text>
            </View>
            
            <Text className="flex-1 text-md font-light">
              {supermarket.address}
            </Text>

            <Text className="flex-1 text-md font-light">
              {`Open: ${supermarket.operatingHours[new Date().toLocaleString('en-US', { weekday: 'long' })]?.open} - ${supermarket.operatingHours[new Date().toLocaleString('en-US', { weekday: 'long' })]?.close}`}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };  

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
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
        Welcome, {userData.username}!
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
        
        {/* Letakkan kode mapping di sini */}
        {validRecipes.reduce((acc, recipe, index) => {
          if (index % 2 === 0) {
            acc.push(validRecipes.slice(index, index + 2));
          }
          return acc;
        }, []).map((pair, rowIndex) => (
          <View key={rowIndex} className="flex-row w-full justify-center items-center my-4">
            {pair.map((recipe, index) => (
              <RecipeCard
                key={index}
                recipe={recipe}
                onPress={() => navigation.navigate('DetailPage', { recipe: recipe, user: user, indexRecipe: (1 + index + rowIndex * 2) })}
              />
            ))}
          </View>
        ))}

        <Text className="text-black text-lg mt-4 px-2">
          Looking for Supermarkets?
        </Text>

        {supermarkets.map((supermarket, index) => (
          <SupermarketCard
            key={index}
            supermarket={supermarket}
            onPress={() => navigation.navigate('SupermarketPage', { user: user, index: index })}
          />
        ))}
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