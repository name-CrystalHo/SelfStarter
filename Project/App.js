import React, {Component}from "react";
import { StyleSheet, Text, View } from "react-native";
import { NativeRouter, Switch, Route } from "react-router-native";
import {createStackNavigator} from '@react-navigation/stack';
import{NavigationContainer} from '@react-navigation/native'
//import * as firebase from 'firebase'


// var firebaseConfig = {
//   apiKey: "AIzaSyAX7RhZr9bERxbUQ4X2497qQs7MFqpNJwE",
//   authDomain: "selfstarter-4720cki.firebaseapp.com",
//   databaseURL: "https://selfstarter-4720cki.firebaseio.com",
//   projectId: "selfstarter-4720cki",
//   storageBucket: "selfstarter-4720cki.appspot.com",
//   messagingSenderId: "881677061805",
//   appId: "1:881677061805:web:363f3ecef7e8823b6e8024",
//   measurementId: "G-J60CKP58KH"
// };
// // Initialize Firebase
// if (firebase.apps.length==0){ //should only be one
// firebase.initializeApp(firebaseConfig);
// }

import MainMenu from "./Components/MainMenuScreen"
import CreateMenu from "./Components/CreateWorkoutMenu"
import Home from "./Components/home";
import Login from "./Components/login";
import Signup from "./Components/signup";
import Settings from "./Components/SettingsMenu"
import StartWorkout from "./Components/startWorkout"
import WorkingOut from "./Components/workingOut"
import FinishWorkout from "./Components/FinishWorkout"

const Stack=createStackNavigator();


export default class App extends Component {
   
  // constructor(props){
  //   super(props)
  //   this.state={
  //     token:null,
  //   }
  // }
  //  updateState(token){
  //   this.setState({token})
  // }

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
            <Stack.Screen name="Start Workout" component={StartWorkout}></Stack.Screen>
            <Stack.Screen name="Working Out" component={WorkingOut}></Stack.Screen>
            <Stack.Screen name="Finish Workout" component={FinishWorkout}></Stack.Screen>
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
