import React, {Component} from "react";
import { Alert,StyleSheet,Animated, Text, View, Image,Button,TextInput, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from "react-native-gesture-handler/Swipeable";
import { firebase } from './config'
import DownBox from './downBox'
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';



export default class PostWorkout extends Component  {

    constructor(props) {
        super(props);
        
        this.state = {
            listOfWorkouts: [] ,
            nav:false,
            workoutHolder:"",
            workoutText:'',
            likes:"",
            listofUsers:[],
        }
      }
    updateLike(key,like,users)
    {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        var list=[];
        const database = firebase.database();
        database.ref(('workouts/'+key+"/userslike")).on('value', function(snap) 
        { list = snap.val(); })
        if(list.indexOf(uid)>-1)
        {
            alert("You either posted this or liked it already")
        }
        // console.log(this.state.listofUsers)
        else{
        firebase.database().ref('workouts/'+key+"/").update({
            likes: like+1,
          });
          list.push(uid)
          
          firebase.database().ref('workouts/'+key).update(
           {userslike:list} 
          );
        }
    }
    componentWillMount () {
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        const database = firebase.database();
        database.ref(('workouts/' )).on('value', (snapshot) =>{
            const tempList = []
            snapshot.forEach((child)=> {
                tempList.push({
                    key:child.key,
                    like:child.val().likes,
                    userslike:child.val().userslike
                  })
                })
                tempList.sort(function(a,b){return b.like-a.like})
                this.setState({listOfWorkouts:tempList})
            })        
            
    }
    gotoWorkout=(key)=>{
        this.props.navigation.navigate('Download Workout', {workoutName: key})
    
  };
  render(){
    return (
        
        <View style ={styles.menu}>
            <Text style = {styles.titleText}>Posted Workouts</Text>
            
            <View style = {styles.workoutSelect}>
            <FlatList
                data={this.state.listOfWorkouts}
                keyExtractor={(item)=>item.key}
                renderItem={({item,index})=>{             
                    return (        
                     <DownBox data={item} handleNavigate={() =>this.gotoWorkout(item.key) } 
                     handleLike={()=>this.updateLike(item.key,item.like,item.userslike)}  /> 
                    );
                }}
                
               /> 
            <View style={styles.workoutButton}>
            </View>
            </View>
           </View>  
    );
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
        marginTop: '3%',
    },

    //Will use this later for lookup as well
    settingsContainer: {
        width: '93%',
        height: 50,
        justifyContent: "flex-start",
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
  