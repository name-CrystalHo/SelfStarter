import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import downBox from './downBox'

export default class DownloadWorkout extends Component  {
    constructor(props) {
        super(props);
        
        this.state = {
            workoutName: (props.route.params.workoutName),
            listOfExercises: [],
            listofLikes:[],
            workoutText:'',
            exerciseNameText: '',
            numOfSetsText: '',
            numOfRepsText: '',
            restTimeText: '',
            keyHold:""
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
        database.ref(("workouts/" + this.state.workoutName+"/workouts")).on('value', (snapshot) =>{
            const tempList = []
            snapshot.forEach((child) => {
                tempList.push({
                    key:child.key,
                    name: child.val().exerciseName,
                    rest: child.val().restTime,
                    rep:child.val().numOfReps,
                    set:child.val().numOfSets,
                  })
                })
                this.setState({listOfExercises:tempList})
            })        
            
    }
    downloadWorkout (){
        const tempList = this.state.listOfExercises
      //console.log(tempList)
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const database = firebase.database();

      tempList.forEach(element => 
        database.ref('users/' + uid + "/" + this.state.workoutName).push({
        exerciseName: element["name"],
        numOfSets: element["set"],
        numOfReps: element["rep"],
        restTime: element["rest"],
      }))
      alert("Your workout has been successfully downloaded!")
    }
    render(){
        return (
            <View style = {styles.container}>
                <Text style = {styles.titleText}>{this.state.workoutName + " Workout"}</Text>
                <View style ={styles.list}>
                <FlatList
                    data={this.state.listOfExercises}
                    keyExtractor={(item)=>item.key}
                    renderItem={({item,index})=>{
                        return ( 
                            <View style={styles.myButton}
                           >
                                <Text>Exercise:{item.name}</Text>
                               <Text>Reps: {item.rep} Sets: {item.set}</Text>
                               <Text> Rest: {item.rest} </Text>
                            </View>
                           );
                    }}
                />   
                </View>
                 <View style ={styles.startButton}>
                     <Button
                     title="Download Workout"
                     onPress={()=>this.downloadWorkout()}></Button>
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
            
    myButton:{
        backgroundColor: "#ff5c5c",
        padding: 10,
        marginVertical: 8,
        height:60,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
        color:"black",  
      },
            titleText: {
                fontWeight: 'bold',
                fontSize: 40,
                marginTop: '3%'
            },
            item: {
                backgroundColor: "#ff5c5c",
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
                // backgroundColor: "#A9A9B0", 
                alignItems: "center",
                justifyContent: "center",
                position: 'absolute',
                bottom: '10%'
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
            finishButton: {
                width: '45%',
                height: 50,
                // backgroundColor: "#A9A9B0", 
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
                // backgroundColor: "#A9A9B0", 
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
                backgroundColor: "#ff5c5c"
                
            },
            item: {
                backgroundColor: "#ff5c5c",
                padding: 10,
                marginVertical: 8,
                marginHorizontal: 16,
                width: 300,
                alignItems: "center",
                justifyContent: "center",  
              },
              exerciseName: {
                fontWeight: 'bold',
                fontSize: 18
              },
              exerciseSelect: {
                width: '80%',
                height: '40%',
                backgroundColor: "#fff", 
                alignItems: "center",
                justifyContent: "center",
                marginTop: '15%',
            },
            postButton: {
              width: '45%',
              height: 50,
              // backgroundColor: "#A9A9B0", 
              alignItems: "center",
              justifyContent: "center",
              position: 'absolute',
              top: '83%'
          },
        
        
        }
        );