import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CharactersList from '../screens/CharactersList';
import CharacterDetail from '../screens/CharacterDetail';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <Stack.Navigator initialRouteName="CharactersList">
        <Stack.Screen name="CharactersList" component={CharactersList} options={{ title: 'Pokémon' }} />
        <Stack.Screen name="CharacterDetail" component={CharacterDetail} options={{ title: 'Detalles' }} />
    </Stack.Navigator>
);

export default AppNavigator;