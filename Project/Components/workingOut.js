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
            index: 0,
            currentExerciseName: '',
            currentSetCount: '',
            currentRepCount: '',
            currentResttime: 0,
            isRestPressed: false,
        }
    }
    fetch () {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        //const items = database.ref("users/" + uid)
        // var tempList = []
        // items.on("value", snapshot =>{
        //     tempList = snapshot.val()
        // })
        const tempList = []
        database.ref(('users/' + uid + "/" + this.state.workoutName)).on('value', (snapshot) =>{
            //const tempList = []
            snapshot.forEach((child) => {
                tempList.push({
                    key: child.key,
                    name: child.val().exerciseName,
                    reps: child.val().numOfReps,
                    sets: child.val().numOfSets,
                    restTime: child.val().restTime,
                  })
                })
                this.setState({listOfExercises:tempList})
            })
        if(tempList.length == this.state.index){
            this.props.navigation.navigate('Finish Workout')
            return
        }
        this.setState({currentExerciseName: tempList[this.state.index].name})
        this.setState({currentSetCount: tempList[this.state.index].sets})
        this.setState({currentRepCount: tempList[this.state.index].reps})
        this.setState({currentResttime: tempList[this.state.index].restTime})
        this.setState({index: this.state.index+1})

    }
    componentWillMount () {
        // const user = firebase.auth().currentUser;
        // const uid = user.uid;
        // const database = firebase.database();
        // //const items = database.ref("users/" + uid)
        // // var tempList = []
        // // items.on("value", snapshot =>{
        // //     tempList = snapshot.val()
        // // })
        // const tempList = []
        // database.ref(('users/' + uid + "/" + this.state.workoutName)).on('value', (snapshot) =>{
        //     //const tempList = []
        //     snapshot.forEach((child) => {
        //         tempList.push({
        //             key: child.key,
        //             name: child.val().exerciseName,
        //             reps: child.val().numOfReps,
        //             sets: child.val().numOfSets,
        //             restTime: child.val().restTime,
        //           })
        //         })
        //         this.setState({listOfExercises:tempList})
        //     })
     
        // this.setState({currentExerciseName: tempList[this.state.index].name})
        // this.setState({currentSetCount: tempList[this.state.index].sets})
        // this.setState({currentRepCount: tempList[this.state.index].reps})
        // this.setState({currentResttime: tempList[this.state.index].restTime})
        this.fetch()
        
        // if(this.state.isRestPressed){
        //     this.doIntervalChange();
        // }

        // this.doIntervalChange()

            
    }
    // countDown (){
    //     while(this.state.currentResttime>0){
    //         //this.state.currentResttime = this.state.currentResttime -1;
    //         setTimeout(() => {  this.setState({currentResttime: this.state.currentResttime-1}) }, 1000);
    //     }
    //     this.setState({index: this.state.index+1});

    // }
    doIntervalChange = () => {
        this.myInterval = setInterval(() => {
            this.setState(prevState => ({
                currentResttime: prevState.currentRestTime -1
            }))
        }, 1000)
    }
    render(){
        //const {count} = this.state
        return (
            <View style = {styles.container}>
                <Text style = {styles.titleText}>{this.state.currentExerciseName}</Text>
                <View style = {styles.details}>
                    <Text style = {styles.title}>{"Sets: " + this.state.currentSetCount}</Text>
                    <Text style = {styles.title}>{"Reps: " + this.state.currentRepCount}</Text>
                    <Text style = {styles.title}>{"Rest Time: " + this.state.currentResttime + " seconds"}</Text>
                </View>

                <View style ={styles.startButton}>
                    <TouchableOpacity  onPress={()=>this.fetch()}>
                        <Text style = {styles.startText}>Next Excercise</Text>
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
        fontSize: 30,
        marginTop: '6%',
        textAlignVertical: "center",
        textAlign: "center",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
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
    details: {
        width: '80%',
        height: '40%',
        backgroundColor: "#fff", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: '15%',    
    }
});