import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'

export default class WorkingOutScreen extends Component  {
    constructor(props) {
        super(props);
        
        this.state = {
            workoutName: (props.route.params.workoutName),
            listOfExercises: [],
            index: 1,
            currentExerciseName: '',
            currentSetCount: '',
            currentRepCount: '',
            currentResttime: 0,
        }
    }
    componentWillMount () {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        //const items = database.ref("users/" + uid)
        // var tempList = []
        // items.on("value", snapshot =>{
        //     tempList = snapshot.val()
        // })
        database.ref(('users/' + uid + "/" + this.state.workoutName)).on('value', (snapshot) =>{
            const tempList = []
            snapshot.forEach((child) => {
                tempList.push({
                    key:child.key,
                    name: child.val().exerciseName,
                    reps: child.val().numOfReps,
                    sets: child.val().numOfSets,
                    restTime: child.val().restTime,
                  })
                })
                this.setState({listOfExercises:tempList})
            })
            this.state.listOfExercises.map((exercise, index) =>{
                if(index == this.state.index){
                    this.setState({currentExerciseName: exercise.name});
                    this.setState({currentSetCount: exercise.sets});
                    this.setState({currentRepCount: exercise.reps});
                    this.setState({currentResttime: exercise.restTime});
                }
            });       
            
    }
    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.titleText}>{"Exercise: " + this.state.currentExerciseName}</Text>
                <Text style = {styles.titleText}>{"Sets: " + this.state.currentSetCount}</Text>
                <Text style = {styles.titleText}>{"Reps: " + this.state.currentRepCount}</Text>
                <Text style = {styles.titleText}>{"Rest Time: " + this.state.currentResttime}</Text>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '3%'
    },
});