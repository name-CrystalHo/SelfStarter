import React, {Component} from "react";
import {StyleSheet, View, Text, Button } from "react-native";
import * as Facebook from 'expo-facebook';
import * as SecureStore from 'expo-secure-store'
import * as firebase from 'firebase'

export default class Load extends Component{
    render(){
    return(
        <View style={styles.container}>
            <Text>
                Loading...
            </Text>
        </View>
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
