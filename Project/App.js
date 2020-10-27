import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import { NativeRouter, Switch, Route, Link } from "react-router-native";
import Home from "./home";
import Login from "./login";
import Test from "./test";


export default function App() {
  return (
    <NativeRouter>
    <View style={styles.container}>
      <Switch> 
        <Route excat path="/" component={Home}/>
        <Route exact path="/test" component={Test}/>
        <Route exact path="/login" component={Login}/>
      </Switch>
    </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
