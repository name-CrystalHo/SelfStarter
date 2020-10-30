import React, {Component} from "react";
import {StyleSheet, View, Text, Button } from "react-native";
import * as Facebook from 'expo-facebook';

export default class Home extends Component{
  render(){
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
  //FACEBOOK LOGIN
  async logIn() {
    try {
      //Seed documentation on course site at mobileappdev.teachable.com 
      //For default user names and passwords. 
      await Facebook.initializeAsync('3330819887013700');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
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