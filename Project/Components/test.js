import React, {Component} from "react";
import {StyleSheet, View, Text, Button } from "react-native";

export default class Home extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Test Screen</Text>
        <Button title="Login" 
        onPress={()=>this.props.navigation.navigate('Home')}>

        </Button>
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