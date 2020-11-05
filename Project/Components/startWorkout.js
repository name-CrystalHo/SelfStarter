import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'

export default class StartWorkoutScreen extends Component  {
    constructor(props) {
        super(props);
        
        this.state = {
            workoutName: (props.route.params.workoutName),
            listOfExercises: [],
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
                    restTime: child.val().restTime,
                  })
                })
                this.setState({listOfExercises:tempList})
            })        
            
    }
    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.titleText}>{this.state.workoutName + " Workout"}</Text>
                <View style ={styles.list}>
                <FlatList
                    data={this.state.listOfExercises}
                    keyExtractor={(item)=>item.key}
                    renderItem={({item})=>{
                    return(
                        <View style={styles.item}>
                        <Text style={styles.title}>{item.name + "\n Rest Time: " + item.restTime + " seconds"}</Text>
                      </View>)
                    }}
                />   
                </View>
                 <View style ={styles.startButton}>
                    <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Working Out', {workoutName: this.state.workoutName})}>
                        <Text style = {styles.startText}>Start Workout</Text>
                    </TouchableOpacity>
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
        marginBottom: "10%",
        marginTop: "10%"
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '3%'
    },
    item: {
        backgroundColor: '#A9A9B0',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        width: 300,
        alignItems: "center",
        justifyContent: "center",  
      },
      title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlignVertical: "center",
        textAlign: "center",
      },
      startButton: {
        width: '45%',
        height: 50,
        backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '85%'
    },
    startText: {
       color: '#61D4D4',
       fontWeight: 'bold',
       fontSize: 18
    },
    list: {
        width: '80%',
        height: '60%',
        backgroundColor: "#fff", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: '15%',
    },

}
);