import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'


export default class FinishWorkoutScreen extends Component  {
    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.titleText}>Workout Complete!</Text>
                {/* <View style={styles.addExerciseButton}>
                <Button
                    title="Main Menu"
                    onPress={() => {this.props.navigation.navigate('Main Menu')
                    }}
                />
                </View> */}
            <View style ={styles.finishButton}>
            <TouchableOpacity  onPress={() => {this.props.navigation.navigate('Main Menu')
                    }}>
                <Text style = {styles.finishText}>Main Menu</Text>
            </TouchableOpacity>
            </View>

            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "flex-start",
        alignItems: "center",
        justifyContent: 'center',
        marginBottom: "10%",
        marginTop: "10%"
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '3%'
    },
    finishButton: {
        width: '55%',
        height: 50,
        backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '80%'
    },
    finishText: {
       color: '#61D4D4',
       fontWeight: 'bold',
       fontSize: 18
    }
})
