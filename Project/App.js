import React, {Component}from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import {createStackNavigator} from '@react-navigation/stack';
import{NavigationContainer} from '@react-navigation/native'
import * as firebase from 'firebase'

import MainMenu from "./Components/MainMenuScreen"
import CreateMenu from "./Components/CreateWorkoutMenu"
import Home from "./Components/home";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Settings from "./Components/SettingsMenu"

const Stack=createStackNavigator();


export default class App extends Component {

  render() {

    return (
        <NavigationContainer>
          <Stack.Navigator intialRouteName="Home">
            <Stack.Screen name="Home" component={Home}></Stack.Screen>
            <Stack.Screen name="Login" component={Login}></Stack.Screen>
            <Stack.Screen name="Signup" component={Signup}></Stack.Screen>
            <Stack.Screen name="Main Menu" component={MainMenu}></Stack.Screen>
            <Stack.Screen name="Create Workout" component={CreateMenu}></Stack.Screen>
            <Stack.Screen name="Settings" component={Settings}></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
