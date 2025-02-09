import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/Homescreens";
import CardListScreen from "./src/screens/CardListScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Accueil" }} />
        <Stack.Screen name="CardListScreen" component={CardListScreen} options={{ title: "Liste des Cartes" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
