import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'

export default class MainMenuScreen extends Component  {
    constructor(props) {
        super(props);
        
        this.state = {
            workoutName: JSON.stringify(navigation.getParam('workoutName', 'default value')),
        }
    }
    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.titleText}>{this.state.workoutName}</Text>
            
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: "15%",
        marginTop: "10%"
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '3%'
    },
}
);