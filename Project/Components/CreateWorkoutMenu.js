import React, {Component} from "react";
import { StyleSheet, Text, View, Switch, Image , TextInput} from 'react-native';
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { Button } from 'react-native'


export default class CreateWorkoutMenu extends Component  {
    constructor(){
        super();
        this.state={
            workoutText:'',
            switchValue:false,
            exerciseNameText: '',
            numOfSetsText: '',
            numOfRepsText: '',
            restTimeText: '',
        }
    }

    toggleSwitch = (value) => {
        this.setState({switchValue: value})
     }

      
render(){
    return (
        <View style = {styles.container}>
            <Text style = {styles.titleText}>Create Workout</Text>
            <TextInput
              value={this.state.workoutText}
              onChangeText={(workoutText) => this.setState({workoutText})}
                style = {styles.textIn}
                placeholder = 'Workout Name'
         
               

            />
            <View style = {styles.switchContainer}>
                <Text>TIME </Text>
                <Switch
                  value = {this.state.switchValue}
                 onValueChange = {this.toggleSwitch}
               />
                <Text> REPS</Text>
            </View>
            {/*Use this container for the reminder time entry*/} 
            <View style = {styles.reminderContainer}>
                <Text>Set Reminder: </Text>
            </View>
            <View style={styles.addExerciseButton}>
                <Button
                    title="Add Exercise"
                    onPress={() => {
                    this.setState({ visible: true });
                    }}
                />
                <Dialog
                    width = {.7}
                    height = {.47}
                    visible={this.state.visible}
                    onTouchOutside={() => {
                    this.setState({ visible: false });
                    }}
                    footer={
                        <DialogFooter>
                            
                          <DialogButton
                            text="CANCEL"
                            bordered
                            onPress={() => {
                                this.setState({ visible: false });
                              }}
                            key="button-1"
                            alignItems = 'bottom'
                            justifyContent = 'bottom'
                            bottom = {0}
                          />
                          <DialogButton
                            text="OK"
                            bordered
                            onPress={() => {
                                this.setState({ visible: false });
                              }}
                            key="button-2"
                            alignItems = 'bottom'
                            justifyContent = 'bottom'
                          />
                        </DialogFooter>
                      }>
                    <DialogContent
                        style={{
                            backgroundColor: '#F7F7F8',
                            width: '100%',
                            height: '85%',
                            alignItems: "center",
                        }}>
                        <Text style = {styles.dialogTitle}>
                            Exercise Name:

                        </Text>
                        <TextInput
                            value={this.state.exerciseNameText}
                            onChangeText={(exerciseNameText) => this.setState({exerciseNameText})}
                            style = {styles.dialogTextIn}
                            placeholder = 'Exercise'
                        />

                         <Text style = {styles.dialogTitle}>
                            Number of Sets:

                        </Text>
                        <TextInput
                            value={this.state.numOfSetsText}
                            onChangeText={(numOfSetsText) => this.setState({numOfSetsText})}
                            style = {styles.dialogTextIn}
                            placeholder = 'Sets'
                        />

                         <Text style = {styles.dialogTitle}>
                            Number of Reps:

                        </Text>
                        <TextInput
                            value={this.state.numOfRepsText}
                            onChangeText={(numOfRepsText) => this.setState({numOfRepsText})}
                            style = {styles.dialogTextIn}
                            placeholder = 'Reps'
                        />

                         <Text style = {styles.dialogTitle}>
                            Rest Time:

                        </Text>
                        <TextInput
                            value={this.state.restTimeText}
                            onChangeText={(restTimeText) => this.setState({restTimeText})}
                            style = {styles.dialogTextIn}
                            placeholder = 'Rest Time'
                        />
                        
                    </DialogContent>
                </Dialog>
            </View>
            <View style ={styles.finishButton}>
                <Text style = {styles.finishText}>Finish</Text>
            </View>

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
    dialogTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '3%',
        textAlign: "center",
        justifyContent: "center",
        //position: 'absolute',
    },
    dialogTextIn: {
        height: 40,
        width: '80%',
        marginTop: '5%',
        textAlign: "center",
        fontWeight: 'bold',
        backgroundColor: '#A9A9B0'
        
    },

});
