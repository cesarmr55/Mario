import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Modal,
  Animated,
} from "react-native";
import { data } from "../utils/Data";
import { useSound } from "../hooks/useSound"; // Import du hook personnalisé

const RandomButton = ({ onSelect }) => {
  const [countdown, setCountdown] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const { playSound: playDrumSound, stopSound: stopDrumSound } = useSound(
    require("../../assets/drum.mp3")
  );
  const { playSound: playKamekSound, stopSound: stopKamekSound } = useSound(
    require("../../assets/kamek.mp3")
  );

  const startCountdown = async () => {
    setCountdown(3);
    playDrumSound(); // Joue le son drum au début du compte à rebours

    let timer = setInterval(async () => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          stopDrumSound(); // Arrête le son drum lorsque le compte à rebours est terminé
          showRandomCard();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const showRandomCard = async () => {
    const randomIndex = Math.floor(Math.random() * data.length);
    const card = data[randomIndex];
    setSelectedCard(card);
    setModalVisible(true);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    playKamekSound(); // Joue le son Kamek lorsque le modal s'affiche
  };

  const closeModal = async () => {
    setModalVisible(false);
    stopKamekSound(); // Arrête le son Kamek lorsque le modal est fermé
  };

  return (
    <View style={styles.container}>
      {countdown !== null ? (
        <View style={styles.countdownContainer}>
          <Text style={styles.countdown}>{countdown}</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={startCountdown}>
          <Text style={styles.text}>Choisir une carte</Text>
        </TouchableOpacity>
      )}
      <Modal visible={modalVisible} transparent animationType="fade">
        {selectedCard && (
          <ImageBackground
            source={require("../../assets/background.png")}
            style={styles.modalBackground}
          >
            <Animated.View style={[styles.dialogBox, { opacity: fadeAnim }]}>
              <Text style={styles.dialogText}>
                "Héhé... Vous jouerez sur {selectedCard.name} !"
              </Text>
              <Text style={styles.description}>{selectedCard.description}</Text>
            </Animated.View>
            <View style={styles.kamekContainer}>
              <Image source={require("../../assets/kamek.png")} style={styles.kamek} />
            </View>
            <View style={styles.bottomSection}>
              <View style={styles.cardContainer}>
                <Image source={selectedCard.boardView} style={styles.cardImage} />
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Retour</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 20,
  },
  countdownContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  button: {
    backgroundColor: "#FFCC00",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countdown: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#FF5733",
    textAlign: "center",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dialogBox: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 20,
    borderRadius: 15,
    width: "80%", // Plus large
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    marginTop: 40, // Espacement vers le haut
  },
  dialogText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  kamekContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  kamek: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  bottomSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  cardContainer: {
    marginBottom: 20,
  },
  cardImage: {
    width: 250,
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
  },
  closeButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default RandomButton;