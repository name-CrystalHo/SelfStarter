import React, {Component} from "react";
import {StyleSheet, View, Text, Button,Alert } from "react-native";
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store'
import * as firebase from 'firebase'
import Load from "./load"

const tokenKeyName='token'
export default class Home extends Component{
  constructor(){
    super()
    this.state={
      token:null,
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
 
  async saveTokenToSecureStorage(token){
    await SecureStore.setItemAsync(tokenKeyName,_token)
    this.setState({
      token:_token,
      // loading:false
    })
    SecureStore.setItemAsync('firebaseCredential', credential);
    this.setState({
      token: token,
    });
  }
  async checkForToken(){
    let token=await SecureStore.getItemAsync(tokenKeyName)
    this.setState(
      {
        token:_token,
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
      return(<Home/>) //will be main menu
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
        this.saveTokenToSecureStorage(token)
        let credential= firebase.auth.FacebookAuthProvider.credential(token) //use to sign in
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