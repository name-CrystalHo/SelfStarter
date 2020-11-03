import React, {Component} from "react";
import {StyleSheet, View, Text, Button,Alert } from "react-native";
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
export default class Home extends Component{
  
  constructor(){
    super()
    this.state={
      token:null,
      // loading:true
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkForToken();
    }, 2000);
    this.checkForFirebaseCredential();
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        // console.log('We are authenticated now!');
        // Alert.alert('We authneticated with Fireabse!', `Hi ${user}`);
      }
    });
  }
 
//Write token to secure storage and firebase credital.
async saveTokenToSecureStorage(token, credential) {
  SecureStore.setItemAsync('token', token);
  //Save Firebase credential
  SecureStore.setItemAsync('firebaseCredential', credential);
  this.setState({
    token: token,
  });
}
  async checkForToken(){
    let token=await SecureStore.getItemAsync('token')
    this.setState(
      {
        token:token,
        // loading:false
      }
    )
  }
  async checkForFirebaseCredential() {
    let credential = await SecureStore.getItemAsync('firebaseCredential');
    if (credential) {
      firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          console.log('Auth failed and here the error' + JSON.stringify(error));
        });
    }
  }
  render(){

    // if(this.state.loading===true)
    // {
    //   return (<Load/>)
    // }
 if(this.state.token===null){
    return(
     
      <View style={styles.container}>
        <Button title="Login" 
        onPress={()=>this.props.navigation.navigate('Login')}>
        </Button>

        <Button title="Signup" 
        onPress={()=>this.props.navigation.navigate('Signup')}>
        </Button>
      </View>

    );
    }
    else{
      return(
        <View style={styles.container}>
          <Text>Welcome to SelfStarter</Text>
          <Button title="Go to Main Menu" 
        onPress={()=>this.props.navigation.navigate('Main Menu')}>
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
  }
});