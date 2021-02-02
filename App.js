import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as firebase from 'firebase';
import { firebaseConfig } from './config/firebase';

import AuthNavigator from './src/screens/AuthNavigator';
import PeopleScreen from './src/screens/PeopleScreen';
import MedListScreen from './src/screens/MedListScreen';
import CreatePersonScreen from './src/screens/CreatePersonScreen';
import EditPersonScreen from './src/screens/EditPersonScreen';
import AddMedicationScreen from './src/screens/AddMedicationScreen';
import MedDetailScreen from './src/screens/MedDetailScreen';

// import LoginScreen from './src/screens/LoginScreen';

firebase.initializeApp(firebaseConfig);

const navigator = createSwitchNavigator({
  Auth: AuthNavigator,
  App: createStackNavigator({
    People: PeopleScreen,
    MedList: MedListScreen,
    CreatePerson: CreatePersonScreen,
    EditPerson: EditPersonScreen,
    AddMedication: AddMedicationScreen,
    MedDetail: MedDetailScreen,
  })
}, {
  initialRouteName: 'Auth',
  defaultNavigationOptions: {
    title: 'MedBase'
  }
});

const App = createAppContainer(navigator);

export default() => {
  return <App />
};