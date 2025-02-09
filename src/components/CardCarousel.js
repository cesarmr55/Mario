import React, { useRef } from "react";
import { View, Text, Image, FlatList, Animated, Dimensions, StyleSheet } from "react-native";
import { data } from "../utils/Data";

const { height, width } = Dimensions.get("window");

const CardCarousel = ({ onCardChange }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * height * 0.6,
            index * height * 0.6,
            (index + 1) * height * 0.6,
          ];

          const scale = scrollY.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });

          return (
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
              <Image source={item.boardView} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
            </Animated.View>
          );
        }}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.y / (height * 0.6));
          onCardChange(data[index]);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: width * 0.85,
    height: height * 0.6,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 15,
    resizeMode: "cover",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
});

export default CardCarousel;
