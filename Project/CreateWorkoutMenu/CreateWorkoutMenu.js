import React from 'react';
import { StyleSheet, Text, View, Switch, Image , TextInput} from 'react-native';

function CreateWorkoutMenu(props) {
    const[isSwitchEnabled, setSwitch] = React.useState(false);
    const[text, setText] = React.useState('');

    return (
        <View style = {styles.container}>
            <View style = {styles.backContainer}>
                <Image style = {styles.backButton} source={require('../CreateWorkoutMenu/backarrow.png')} />
            </View>
            <Text style = {styles.titleText}>Create Workout</Text>
            <TextInput
                style = {styles.textIn}
                placeholder = 'Workout Name'
                onChangeText = {(text) => setText(text)}
                defaultValue = {text}

            />
            <View style = {styles.switchContainer}>
                <Text>TIME </Text>
                <Switch 
                    value = {isSwitchEnabled}
                    onValueChange ={(value) => setSwitch(value)}
                />
                <Text> REPS</Text>
            </View>
            {/*Use this container for the reminder time entry*/} 
            <View style = {styles.reminderContainer}>
                <Text>Set Reminder: </Text>
            </View>
            <View style ={styles.addExerciseButton}>
                <Text style = {styles.finishText}>Add Exercise</Text>
            </View>
            <View style ={styles.finishButton}>
                <Text style = {styles.finishText}>Finish</Text>
            </View>

        </View>
    );
};

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
    switchContainer: {
        width: '60%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '5%'
    },
    backContainer: {
        width: '90%',
        height: 50,
        justifyContent: "flex-start"
    },
    backButton: {
        height: 20,
        width: 30
    },
    textIn: {
        height: 30,
        width: '40%',
        marginTop: '5%',
        textAlign: "center",
        fontWeight: 'bold',
        backgroundColor: '#A9A9B0'
        
    },
    reminderContainer: {
        width: '60%',
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4%'
    },
    finishButton: {
        width: '45%',
        height: 50,
        backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '93%'
    },
    finishText: {
       color: '#61D4D4',
       fontWeight: 'bold',
       fontSize: 18
    },
    addExerciseButton: {
        width: '55%',
        height: 50,
        backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '80%'
    },

});

export default CreateWorkoutMenu;