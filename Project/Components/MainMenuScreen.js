import React, {Component} from "react";
import { Alert,StyleSheet,Animated, Text, View, Image,Button,TextInput, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { firebase } from './config'
import ItemBox from './ItemBox'
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';



export default class MainMenuScreen extends Component  {

    constructor(props) {
        super(props);
        
        this.state = {
            listOfWorkouts: [] ,
            nav:false,
            workoutHolder:"",
            workoutText:'',
            creating:false,
        }
      }
    gotoWorkout=(key)=>{
        this.props.navigation.navigate('Start Workout', {workoutName: key})
    
  };
  
    deleteItem = (key,index) => {
    console.log(key)
    const user = firebase.auth().currentUser;
    const uid = user.uid;
    const database = firebase.database();
    database.ref('users/' + uid + "/" + key).remove()
    
    const arr = [...this.state.listOfWorkouts];
    arr.splice(index, 1);
    this.setState({listOfWorkouts:arr});
  };
 
    componentWillMount () {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        database.ref(('users/' + uid)).on('value', (snapshot) =>{
            const tempList = []
            snapshot.forEach((child) => {
                tempList.push({
                    key:child.key,
                  })
                })
                this.setState({listOfWorkouts:tempList})
            })        
            
    }
    render(){
    if(this.state.creating===false){
     return (
        
        <View style ={styles.menu}>
            <View style = {styles.settingsContainer}>
                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Settings')}>
                    <Image style = {styles.settingButton} source={require('../images/settings.png')} />
                </TouchableOpacity>
                <TouchableOpacity   onPress={()=>this.props.navigation.navigate('Posted Workouts')}>
                    <Image style = {styles.settingButton} source={require('../assets/lookup.png')} />
                </TouchableOpacity>
            </View>
        
            <Text style = {styles.titleText}>Your Workouts</Text>
            
            <View style = {styles.workoutSelect}>
            <FlatList
                data={this.state.listOfWorkouts}
                keyExtractor={(item)=>item.key}
                renderItem={({item,index})=>{             
                    return (        
                     <ItemBox data={item} handleDelete={() => this.deleteItem(item.key,index)} handleNavigate={() =>this.gotoWorkout(item.key)} 
                     handleEdit={()=>this.setState(
                    {visible:true,
                      workoutHolder:item.key,
                    workoutText:item.key
                    })}  /> 
                    );
                }}
                
               /> 
            <View style={styles.workoutButton}>
            <Button style = {styles.newWorkoutText} onPress={()=>this.props.navigation.navigate('Create Workout')} title="Create New Workout"></Button>
            </View>
            </View>
           </View>  
    );
            }
            
}
}
const styles = StyleSheet.create({

    workoutButton:{
        marginTop:"2%",
        top: 20
    },
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
        backgroundColor: "red", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: '7%'
    },
    newWorkoutText: {
       backgroundColor: '#61D4D4',
       fontWeight: 'bold',
       fontSize: 18
    },
    workoutSelect: {
        width: '80%',
        height: '65%',
        backgroundColor: "#fff", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: '15%',
        flex:1,
        top: -60
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '2%',
        
    },

    //Will use this later for lookup as well
    settingsContainer: {
        width: '93%',
        height: 50,
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop:"4%"
    },
    settingButton: {
        height: 40,
        width: 40
    },
    startWorkout: {
        borderColor: 'blue',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",    
        width: 300    
    },
    workoutName: {
       fontWeight: 'bold',
       fontSize: 18,
       width:"10%"
    },
    workoutsContainer: {
        width: '93%',
        height: 40,
        justifyContent: "flex-start",
        marginTop:"0%",
        top: -45,
        left: 115
    },
   
  });
  