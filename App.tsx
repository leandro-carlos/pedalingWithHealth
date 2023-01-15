import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/home/Home';
import PedalingScreen from './src/PedalingScreen/PedalingScreen';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PedalingScreen" component={PedalingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
