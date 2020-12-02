import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList,TextInput} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import EditBox from './EditBox'

export default class StartWorkoutScreen extends Component  {
    constructor(props) {
        super(props);
        
        this.state = {
            workoutName: (props.route.params.workoutName),
            listOfExercises: [],
            workoutText:'',
            exerciseNameText: '',
            numOfSetsText: '',
            numOfRepsText: '',
            restTimeText: '',
            keyHold:""
        }
    }
    updateWorkout(){
        console.log(this.state.keyHold)
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        firebase.database().ref('users/' + uid + "/" + this.state.workoutName+"/"+this.state.keyHold).set({
            exerciseName: this.state.exerciseNameText,
            numOfReps:this.state.numOfRepsText,
            numOfSets:this.state.numOfSetsText,
            restTime:this.state.restTimeText,
          });
        this.setState({visible:false})
      };
    deleteItem = (key,index) => {
        console.log(key)
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        database.ref('users/' + uid + "/" + this.state.workoutName+"/"+key).remove()
        
        const arr = [...this.state.listOfExercises];
        arr.splice(index, 1);
        this.setState({listOfExercises:arr});
      };
    componentWillMount () {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        database.ref(('users/' + uid + "/" + this.state.workoutName)).on('value', (snapshot) =>{
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
    postWorkout(){
      
      //console.log(this.state.listOfExercises)
      const tempList = this.state.listOfExercises
      //console.log(tempList)
      const database = firebase.database();
      tempList.forEach(element => 
        database.ref("workouts/" +this.state.workoutName+"/workouts").push({
        exerciseName: element["name"],
        numOfSets: element["set"],
        numOfReps: element["rep"],
        restTime: element["rest"],
      }))
        database.ref("workouts/" +this.state.workoutName+"/likes").set(0)
        database.ref("workouts/" +this.state.workoutName+"/date").set(firebase.database.ServerValue.TIMESTAMP)
        const user = firebase.auth().currentUser
        const uid = user.uid;
        database.ref("workouts/" +this.state.workoutName+"/userslike").set([uid])
      alert("Your workout has been successfully posted!")
    }
    render(){
        return (
            <View style = {styles.container}>
                <Text 
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  style = {styles.titleText}>{this.state.workoutName + " Workout"}</Text>
                <View style ={styles.list}>
                <FlatList
                    data={this.state.listOfExercises}
                    keyExtractor={(item)=>item.key}
                    renderItem={({item,index})=>{
                        return (       
                            <EditBox data={item} handleDelete={() => this.deleteItem(item.key,index)}
                            handleEdit={()=>this.setState(
                           {visible:true,
                            keyHold:item.key,  
                            exerciseNameText: item.name,
                            numOfSetsText: item.set,
                            numOfRepsText: item.rep,
                            restTimeText: item.rest,
                            
                           })}  /> 
                           );
                    }}
                />   
                </View>
                 <View style ={styles.startButton}>
                     <Button
                     title="Start Workout"
                     onPress={()=>this.props.navigation.navigate('Working Out', {workoutName: this.state.workoutName})}></Button>
                </View>
                <View style ={styles.postButton}>
                     <Button
                     title="Post Workout"
                     onPress={()=>this.postWorkout()}
                     ></Button>
                </View>
                <Dialog
               width = {.7}
               height = {.5}
               visible={this.state.visible}
               onTouchOutside={() => {
               this.setState({ visible: false });
               }}
               footer={
                   <DialogFooter>
                       
                     <DialogButton
                       text="Cancel"
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
                       text="Update"
                       bordered
                     onPress={this.updateWorkout.bind(this)}
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
                       height: '88%',
                       alignItems: "center",
                   }}>
                   <Text style = {styles.dialogTitle}>
                       Exercise:
                   </Text>
                   <TextInput
                      value={this.state.exerciseNameText}
                     onChangeText={(exerciseNameText) => this.setState({exerciseNameText})}
                       style = {styles.dialogTextIn}
                       placeholder = 'Exercise'
                   />

                    <Text style = {styles.dialogTitle}>
                       Number of Sets
                   </Text>
                   <TextInput
                value={this.state.numOfSetsText}
                    onChangeText={(numOfSetsText) => this.setState({numOfSetsText})}
                       style = {styles.dialogTextIn}
                       placeholder = 'Sets'
                       keyboardType = 'numeric'
                       returnKeyType="done"
                   />

                    <Text style = {styles.dialogTitle}>
                       Number of Reps:

                   </Text>
                   <TextInput
                    value={this.state.numOfRepsText}
                      onChangeText={(numOfRepsText) => this.setState({numOfRepsText})}
                       style = {styles.dialogTextIn}
                       placeholder = 'Reps'
                       keyboardType = 'numeric'
                       returnKeyType="done"
                   />

                    <Text style = {styles.dialogTitle}>
                       Rest Time:
                   </Text>
                   <TextInput
                    value={this.state.restTimeText}
                     onChangeText={(restTimeText) => this.setState({restTimeText})}
                       style = {styles.dialogTextIn}
                       placeholder = 'Rest Time'
                       keyboardType = 'numeric'
                       returnKeyType="done"
                   />                  
               </DialogContent>
           </Dialog>
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
        top: '75%'
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