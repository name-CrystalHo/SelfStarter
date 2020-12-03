import React, {Component} from "react";
import {StyleSheet, View, Text, Button,Alert, Image } from "react-native";
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store'
import * as firebase from 'firebase'
import MainMenuScreen from "./MainMenuScreen";



var firebaseConfig = {
  apiKey: "AIzaSyAX7RhZr9bERxbUQ4X2497qQs7MFqpNJwE",
  authDomain: "selfstarter-4720cki.firebaseapp.com",
  databaseURL: "https://selfstarter-4720cki.firebaseapp.com/__/auth/handler",
  projectId: "selfstarter-4720cki",
  storageBucket: "selfstarter-4720cki.appspot.com",
  messagingSenderId: "881677061805",
  appId: "1:881677061805:web:363f3ecef7e8823b6e8024",
  measurementId: "G-J60CKP58KH"
};
// Initialize Firebase
if (firebase.apps.length==0){ //should only be one
firebase.initializeApp(firebaseConfig);
}

const tokenKeyName='token'
const userLogged = false;
export default class Home extends Component{
  constructor(props){
    super(props)
    this.state={
      userLogged:false,
    }
  }
  componentWillMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      this.setState({
        userLogged:true
      });
      }
      else{
        this.setState({
          userLogged:false
        });
      }
   });
  }
 
  render(){
    if(this.state.userLogged===false){
    return(
      
      
      
      <View style={styles.container}>
        <Image style = {styles.logo} source={require('../assets/Logo.png')} />
        <Button title="Login" 
        onPress={()=>this.props.navigation.navigate('Login')}>
        </Button>

        <Button title="Sign Up" 
        onPress={()=>this.props.navigation.navigate('Signup')}>
        </Button>
      </View>
    );
    }
    else{
      return(
      <View style={styles.container}>
         <Image style = {styles.logo} source={require('../assets/Logo.png')} />
        <Text style = {styles.titleText}>Welcome to Self Start</Text>
        
        <Button title="Go to Main Menu" 
        onPress={()=>this.props.navigation.navigate('Main Menu')}>
        </Button>
        <Button title="Check Pedometer" 
        onPress={()=>this.props.navigation.navigate('Pedometer')}>
        </Button>
        
      </View>
      )
    }
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    height: 100,
    width: 200,
    position: 'absolute',
    top: '10%'
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: '5%'
  }
});