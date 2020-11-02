import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class MainMenuScreen extends Component  {
    render(){
    return (
        <View style ={styles.menu}>
            <View style = {styles.settingsContainer}>
                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Settings')}>
                <Image style = {styles.settingButton} source={require('../images/settings.png')} />
                </TouchableOpacity>
            </View>
            <Text style = {styles.titleText}>Your Workouts</Text>
            <View style = {styles.exerciseSelect}>

            </View>
            
            <View style ={styles.newWorkoutButton}>
             <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Create Workout')}>
                <Text style = {styles.newWorkoutText}>Create New Workout</Text>
            </TouchableOpacity>
            </View>
        </View>
        

    );
}
}
const styles = StyleSheet.create({
    menu: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "flex-end",
      alignItems: "center",
      marginBottom: "15%",
      marginTop: "4%",
    },
    newWorkoutButton: {
        width: '55%',
        height: 50,
        backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: '7%'
    },
    newWorkoutText: {
       color: '#61D4D4',
       fontWeight: 'bold',
       fontSize: 18
    },
    exerciseSelect: {
        width: '80%',
        height: '65%',
        backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: '15%',
    },

    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '3%'
    },

    //Will use this later for lookup as well
    settingsContainer: {
        width: '93%',
        height: 50,
        justifyContent: "flex-start"
    },
    settingButton: {
        height: 40,
        width: 40
    }
  });
  