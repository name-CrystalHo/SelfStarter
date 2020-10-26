import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';


function MainMenuScreen(props) {
    return (
        <View style ={styles.menu}>
            <View style = {styles.settingsContainer}>
                <Image style = {styles.settingButton} source={require('../MainMenu/settings.png')} />
            </View>
            <Text style = {styles.titleText}>Your Workouts</Text>
            <View style = {styles.exerciseSelect}>

            </View>
            <View style ={styles.newWorkoutButton}>
                <Text style = {styles.newWorkoutText}>Create New Workout</Text>
            </View>
        </View>
        

    );
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
  


export default MainMenuScreen;