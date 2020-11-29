import React, {Component} from "react";
import { Alert ,Button,Content, Item,StyleSheet, Text, View, Switch, Image , TextInput,FlatList,navigation} from 'react-native';
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'
import {Container,List,ListItem, Icon} from 'native-base'
import ExerciseBox from './ExerciseBox'


export default class CreateWorkoutMenu extends Component  {
    constructor(props){
        super(props);
        this.state={
            workoutText:'',
            switchValue:false,
            exerciseNameText: '',
            numOfSetsText: '',
            numOfRepsText: '',
            restTimeText: '',
            list:[],
            visibleEdit:false,
            keyHold:"",
        }
    
    }
    updateWorkout(){
      
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        console.log(this.state.keyHold)
        firebase.database().ref('users/' + uid + "/" + this.state.workoutText+"/"+this.state.keyHold).set({
            exerciseName: this.state.exerciseNameText,
            nameOfReps:this.state.numOfRepsText,
            numOfSets:this.state.numOfSetsText,
            restTime:this.state.restTimeText,
          });
        this.setState({visible:false})
      };
      cancelButton(){
        // console.log(this.state.workoutText,"sjdfksd")
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        database.ref('users/' + uid + "/" + this.state.workoutText).remove()        
        this.props.navigation.navigate('Main Menu') 
      };
     
    deleteItem = (key,index) => {

        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        database.ref('users/' + uid + "/" + this.state.workoutText+"/"+key).remove()
        
        const arr = [...this.state.list];
        arr.splice(index, 1);
        this.setState({list:arr});
      };
    toggleSwitch = (value) => {
        this.setState({switchValue: value})
    }
   
    finishButton(){
        if (this.state.workoutText ==="") {
            alert("Please Provide a Workout Name")
            return
        }
        else{
            this.props.navigation.navigate('Main Menu')
        }
    }
    addNewExercise (){ 
        if (this.state.workoutText ==="") {
            alert("Please Provide a Workout Name")
            return
        }
        if (this.state.exerciseNameText==="" || this.state.numOfRepsText===""||this.state.restTimeText==="" ||this.state.numOfSetsText==="") {
            alert("Please fill out all the workout fields")
            return
        }
        if (isNaN(parseInt(this.state.numOfRepsText))==true || parseInt(this.state.numOfRepsText)<0){
            alert("Please make sure that reps is a postive number")
            return
        }
        if (isNaN(parseInt(this.state.restTimeText))==true|| parseInt(this.state.restTimeText)<0){
            alert("Please make sure that rest time is a number")
            return
        }
        if (isNaN(parseInt(this.state.numOfSetsText))==true || parseInt(this.state.numOfSetsText)<0){
            alert("Please make sure that sets is a number")
            return
        }
        else{
        this.setState({visibleAdd:false})
        }
        const user = firebase.auth().currentUser;
        const uid = user.uid;
    
        const database = firebase.database();
        database.ref("users/"+uid + "/" + this.state.workoutText).push({
          exerciseName: this.state.exerciseNameText,
          numOfSets: this.state.numOfSetsText,
          numOfReps: this.state.numOfRepsText,
          restTime: this.state.restTimeText,
        });
        this.state.list.push({
            key: firebase.database().ref().child("value").push().key,
            name: this.state.exerciseNameText,
            rest: this.state.restTimeText,
            rep:this.state.numOfRepsText,
            set:this.state.numOfSetsText,
        })

      }
      
      componentWillMount () {   
            //   this.props.navigation.addListener('beforeRemove', (e) => {
            //     e.preventDefault();
            //     Alert.alert(
            //       'Discard changes?',
            //       "Click on Finish to save",
            //       [
            //         {
            //           text: "Cancel",
            //           onPress: () => console.log("Cancel Pressed"),
            //           style: "cancel"
            //         },
            //         { text: "OK", onPress:this.cancelButton,onPress: () => this.props.navigation.dispatch(e.data.action)},
            //         // {
            //         //     onPress: () => this.props.navigation.dispatch(e.data.action),
                  
            //       ],
            //       { cancelable: false }
            //     );
            //   })
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        if (this.state.workoutText!=""){
         database.ref(('users/' + uid + "/" + this.state.workoutText)).on('value', (snapshot) =>{
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
                this.setState({list:tempList})
            })        
        }
    
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
            <View style = {styles.exerciseSelect}>
            <FlatList
                data={this.state.list}
                keyExtractor={(item)=>item.key}
                renderItem={({item,index})=>{
                    return (        
                        <ExerciseBox data={item} handleDelete={() => this.deleteItem(item.key,index)}
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
            <View style={styles.addExerciseButton}>
                <Button
                    title="Add Exercise"
                    onPress={() => {
                    this.setState({ visibleAdd: true });
                    }}
                />
                <Dialog
                    width = {.7}
                    height = {.70}
                    visible={this.state.visibleAdd}
                    onTouchOutside={() => {
                    this.setState({ visibleAdd: false });
                    }}
                    footer={
                        <DialogFooter>    
                          <DialogButton
                            text="Cancel"
                            bordered
                            onPress={() => {
                                this.setState({ visibleAdd: false });
                              }}
                            key="button-1"
                            alignItems = 'bottom'
                            justifyContent = 'bottom'
                            bottom = {0}
                          />
                          <DialogButton
                            text="Add"
                            bordered
                            onPress={this.addNewExercise.bind(this)}
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
                {/* DIALOG FOR EDIT */}
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
                       height: '85%',
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
            <View style ={styles.finishButton}>
                <Button  onPress={()=>this.finishButton()}
                title="Finish"></Button>
                  <Button  onPress={()=>this.cancelButton()}
                title="Cancel"></Button>
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


});
