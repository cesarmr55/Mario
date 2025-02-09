import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Animated,
  ImageBackground,
  Easing,
} from "react-native";
import RandomButton from "../components/RandomButton";
import MapListButton from "../components/MapListButton";
import { useSound } from "../hooks/useSound"; 

const HomeScreen = ({ navigation }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const { playSound: playBackgroundMusic, stopSound: stopBackgroundMusic } =
    useSound(require("../../assets/Opening.mp3"));

  // États pour les positions animées des personnages (translation horizontale)
  const birdoPosition = useState(new Animated.Value(-300))[0]; // Plus loin à gauche
  const bowserJrPosition = useState(new Animated.Value(300))[0]; // Plus loin à droite
  const koopaPosition = useState(new Animated.Value(-300))[0]; // Plus loin à gauche

  useEffect(() => {
    playBackgroundMusic();

    // Animation pour faire entrer les personnages
    Animated.timing(birdoPosition, {
      toValue: 0,
      duration: 1500,
      easing: Easing.elastic(1), 
      useNativeDriver: true,
    }).start();

    Animated.timing(bowserJrPosition, {
      toValue: 0,
      duration: 1500,
      easing: Easing.elastic(1), 
      useNativeDriver: true,
    }).start();

    Animated.timing(koopaPosition, {
      toValue: 0,
      duration: 1500,
      easing: Easing.elastic(1), 
      useNativeDriver: true,
    }).start();

    return () => {
      stopBackgroundMusic();
    };
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {/* Section pour les personnages */}
        <View style={styles.characterSection}>
          {/* Birdo */}
          <Animated.Image
            source={require("../../assets/Birdo.png")}
            style={[
              styles.character,
              { transform: [{ translateX: birdoPosition }] },
            ]}
          />
          {/* Koopa */}
          <Animated.Image
            source={require("../../assets/Koopa.png")}
            style={[
              styles.character,
              { transform: [{ translateX: koopaPosition }] },
            ]}
          />
          {/* Bowser Jr. */}
          <Animated.Image
            source={require("../../assets/BowserJr.png")}
            style={[
              styles.character,
              { transform: [{ translateX: bowserJrPosition }] },
            ]}
          />
        </View>

        {/* Affichage de la carte sélectionnée */}
        {selectedCard && (
          <Animated.Image
            source={selectedCard.boardView}
            style={[styles.image, { opacity: fadeAnim }]}
          />
        )}

        {/* Boutons */}
        <View style={styles.buttonSection}>
          <RandomButton onSelect={(card) => {
            setSelectedCard(card);
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start();
            stopBackgroundMusic();
          }} />
          <MapListButton onPress={() => navigation.navigate("CardListScreen")} />
        </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  characterSection: {
    flexDirection: "row",
    justifyContent: "space-around", // Évite qu'ils soient collés
    alignItems: "center",
    width: "100%",
    marginTop: 20, // Ajustement pour éviter que les persos soient trop haut
  },
  character: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonSection: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default HomeScreen;
