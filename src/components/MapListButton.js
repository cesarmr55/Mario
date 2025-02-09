import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MapListButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Voir les cartes</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default MapListButton;
