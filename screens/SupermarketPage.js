import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { ref, get } from 'firebase/database';
import { database } from "../firebaseConfig";
import "../global.css";

const SupermarketPage = () => {
  const route = useRoute();
  const { user, index } = route.params;
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupermarket, setSelectedSupermarket] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const cardAnimation = useRef(new Animated.Value(0)).current;
  
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const supermarketsRef = ref(database, 'supermarkets');
        const snapshot = await get(supermarketsRef);

        if (snapshot.exists()) {
          const supermarketsData = snapshot.val();
          setSupermarkets(supermarketsData);
          setSelectedSupermarket(supermarketsData[index]);
        } else {
          console.log("No supermarkets data available.");
        }
      } catch (error) {
        console.error("Error fetching supermarkets data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSupermarkets();
  }, [index]);

  const handleGoBack = () => {
    navigation.navigate('Homepage', { user: user });
  };

  const handleMarkerPress = (supermarket) => {
    setSelectedSupermarket(supermarket);
    setShowCard(true);

    Animated.timing(cardAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleMapPress = () => {
    setShowCard(false);

    Animated.timing(cardAnimation, {
      toValue: -1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleGetDirections = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error('Error launching Google Maps:', err)
    );
  };

  if (loading || !selectedSupermarket) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}
      >
        <Icon name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: selectedSupermarket.latitude,
          longitude: selectedSupermarket.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onPress={handleMapPress}
      >
        {supermarkets.map((supermarket, idx) => (
          <Marker
            key={idx}
            coordinate={{
              latitude: supermarket.latitude,
              longitude: supermarket.longitude,
            }}
            title="Open Hours"
            description={`Open: ${supermarket.operatingHours[new Date().toLocaleString('en-US', { weekday: 'long' })]?.open} - ${supermarket.operatingHours[new Date().toLocaleString('en-US', { weekday: 'long' })]?.close}`}
            onPress={() => handleMarkerPress(supermarket)}
          />
        ))}
      </MapView>

      {selectedSupermarket && (
        <Animated.View
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg"
          style={{
            transform: [
              {
                translateY: cardAnimation.interpolate({
                  inputRange: [0.5, 1],
                  outputRange: [300, 0], // Dari posisi tersembunyi ke tampilan penuh
                }),
              },
            ],
            elevation: 5,
          }}
        >
          <View className="p-6">
            <Image
              source={{ uri: selectedSupermarket.source }}
              className="w-full h-48 rounded-xl mb-4"
            />
            <Text className="text-xl font-bold mb-2">
              {selectedSupermarket.name}
            </Text>
            <Text className="text-gray-600 text-sm mb-4">
              {selectedSupermarket.address}
            </Text>
            <TouchableOpacity
              className="bg-red-500 p-4 rounded-xl items-center"
              onPress={() =>
                handleGetDirections(
                  selectedSupermarket.latitude,
                  selectedSupermarket.longitude
                )
              }
            >
              <Text className="text-white font-bold">Get Directions</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#FF6347', // Warna merah tomat untuk tombol
    padding: 10,
    borderRadius: 30, // Membuat tombol berbentuk lingkaran
    zIndex: 10, // Menempatkan tombol di atas peta
  }
});

export default SupermarketPage;