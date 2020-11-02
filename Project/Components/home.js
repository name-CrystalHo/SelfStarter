import React, {Component} from "react";
import {StyleSheet, View, Text, Button,Alert } from "react-native";
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store'
import * as firebase from 'firebase'



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
      user:null
      // loading:true
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.checkForToken();
    }, 2000);
    this.checkForFirebaseCredential();
    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        console.log('We are authenticated now!');
        Alert.alert('We authneticated with Fireabse!', `Hi ${user}`);
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
    console.log(this.state.token)
    // if(this.state.loading===true)
    // {
    //   return (<Load/>)
    // }
 if(this.state.token===null){
    return(
     
      <View style={styles.container}>
        <Button title="LogIn With Facebook" onPress={()=>this.logIn()}/>
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
          <Button title="Go to Menu" onPress={()=>this.props.navigation.navigate('Main Menu')}></Button>
        </View>     
      );//will be main menu
    }
  }
  //FACEBOOK LOGIN
  async logIn() {
    try {
      //Seed documentation on course site at mobileappdev.teachable.com 
      //For default user names and passwords. 
      await Facebook.initializeAsync('3330819887013700');
      const {
        type,
        token, // stores successful login
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        this.saveTokenToSecureStorage(token,credential)
        let credential= firebase.auth.FacebookAuthProvider.credential(token); //use to sign in
        firebase.auth().signInWithCredential(credential).catch((error)=>{
          console.log("Auth failed and here is the error"+JSON.stringify(error))
        })
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
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