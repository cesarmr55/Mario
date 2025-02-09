import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Animated, ImageBackground } from "react-native";
import RandomButton from "../components/RandomButton";
import MapListButton from "../components/MapListButton";
import { useSound } from "../hooks/useSound"; // Import du hook personnalisé

const HomeScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const { playSound: playBackgroundMusic, stopSound: stopBackgroundMusic } = useSound(
    require("../../assets/Opening.mp3")
  );

  useEffect(() => {
    playBackgroundMusic(); 
    return () => {
      stopBackgroundMusic(); 
    };
  }, []);

  const handleCardSelect = async (card) => {
    setSelectedCard(card);
    fadeAnim.setValue(0); 
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    stopBackgroundMusic(); 
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {selectedCard && (
          <Animated.Image
            source={selectedCard.boardView}
            style={[styles.image, { opacity: fadeAnim }]}
          />
        )}
        <RandomButton onSelect={handleCardSelect} />
        <MapListButton onPress={() => navigation.navigate("CardListScreen")} />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default HomeScreen;