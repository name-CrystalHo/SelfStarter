import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'


export default class MainMenuScreen extends Component  {

    constructor(props) {
        super(props);
        
        this.state = {
            listOfWorkouts: [] ,
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
        database.ref(('users/' + uid)).on('value', (snapshot) =>{
            const tempList = []
            snapshot.forEach((child) => {
                tempList.push({
                    key:child.key,
                    name: child.val(),
        
                  })
                })
                this.setState({listOfWorkouts:tempList})
            })        
            
    }
    render(){
    return (
        <View style ={styles.menu}>
            <View style = {styles.settingsContainer}>
                <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Settings')}>
                <Image style = {styles.settingButton} source={require('../images/settings.png')} />
                </TouchableOpacity>
            </View>
            <Text style = {styles.titleText}>Your Workouts</Text>
            
            <View style = {styles.workoutSelect}>
            <FlatList
                data={this.state.listOfWorkouts}
                keyExtractor={(item)=>item.key}
                renderItem={({item})=>{
                    return(
                        <View style={styles.startWorkout}>
                        <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Start Workout', {workoutName: item.key})}>
                            <Text style={styles.workoutName}>{item.key}</Text>
                        </TouchableOpacity>
                      </View>)
                    }}
            /> 
            </View>        

            <View style ={styles.newWorkoutButton}>
            <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Create Workout')}>
                <Text style = {styles.newWorkoutText}>Create New Workout</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}
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
    workoutSelect: {
        width: '80%',
        height: '65%',
        backgroundColor: "#fff", 
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
    },
    startWorkout: {
        backgroundColor: '#A9A9B0',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        alignItems: "center",
        justifyContent: "center",    
        width: 300    
    },
    workoutName: {
       fontWeight: 'bold',
       fontSize: 18
    },
  });
  