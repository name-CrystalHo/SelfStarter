import React, {Component} from "react";
import { StyleSheet, Text, View, Image,Button, FlatList} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from './config'
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window')

const scale = size => width / 350 * size;

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
            countPressed: 0,
            countDownVar: 0,

        }
    }
    //button to start rest - timer will start clicking then when timer runs out it goes to the next page
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

        if(this.state.countPressed > 0){
            //this.setState({countPressed: this.state.countPressed- 2})
            this.setState({countDownVar: this.state.currentResttime})
            //this.setState({countDownVar: 3})
            //this.countDown();
            var myInterval = setInterval(() => {
                this.setState(prevState => ({
                    countDownVar: prevState.countDownVar -1
                }))
                if (this.state.countDownVar < 1) {
                    this.setState({index: this.state.index +1})
                    this.setState({countPressed: 0})
                    this.fetch()
                    clearInterval(myInterval);
                    

                  }
            }, 1000)
            
            // this.setState({index: this.state.index +1})
            // this.setState({currentExerciseName: tempList[this.state.index].name})
            // this.setState({currentSetCount: tempList[this.state.index].sets})
            // this.setState({currentRepCount: tempList[this.state.index].reps})
            // this.setState({currentResttime: tempList[this.state.index].restTime})
            // this.setState({countPressed: this.state.countPressed +1})

        }
        
        
        this.setState({currentExerciseName: tempList[this.state.index].name})
        this.setState({currentSetCount: tempList[this.state.index].sets})
        this.setState({currentRepCount: tempList[this.state.index].reps})
        this.setState({currentResttime: tempList[this.state.index].restTime})
        this.setState({countPressed: this.state.countPressed +1})

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
    countDown (){
        while(this.state.countDownVar>0){
            //this.state.currentResttime = this.state.currentResttime -1;
            setTimeout(() => {  this.setState({countDownVar: this.state.countDownVar-1}) }, 1000);
        }

    }
    // startTimer(){
    //     this.myInterval = setInterval(() => {
    //         this.setState(prevState => ({
    //             currentResttime: prevState.currentRestTime -1
    //         }))
    //     }, 1000)
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
                    <Text style = {styles.title}>{"Sets:"}</Text>
                    <Text style = {styles.stepText} numberOfLines={1}
                  adjustsFontSizeToFit>{this.state.currentSetCount}</Text>
                    <Text style = {styles.title}>{"Reps:"}</Text>
                    <Text style = {styles.stepText} numberOfLines={1}
                  adjustsFontSizeToFit>{this.state.currentRepCount}</Text>
                    <Text style = {styles.title}>{"Rest Time:"}</Text>
                    <Text style = {styles.totalCountText} numberOfLines={1}
                  adjustsFontSizeToFit>{this.state.currentResttime + " seconds"}</Text>

                    
                </View>
                {this.state.countPressed>1 && 
                        <Text style = {styles.rest}>{"Rest : " + this.state.countDownVar }</Text>
                    }
                <View style ={styles.startButton}>
                    { this.state.countPressed<=1 && 
                        <Button
                        title="Start Rest"
                        onPress={()=>this.fetch()}></Button>
                    }
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
        
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: scale(40),
        marginTop: '5%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: scale(25),
        textAlignVertical: "center",
        textAlign: "center",
    },
    rest: {
        fontWeight: 'bold',
        fontSize: scale(25),
        textAlignVertical: "center",
        textAlign: "center",
        position: 'absolute',
        top: '80%'
    },
    startButton: {
        width: '45%',
        height: scale(50),
        // backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '85%'
    },
    startText: {
       color: '#61D4D4',
       fontWeight: 'bold',
       fontSize: scale(18)
    },
    details: {
        width: '60%',
        height: '30%',
        backgroundColor: "#fff", 
        alignItems: "center",
        justifyContent: "center",
        marginTop: '30%',    
    },
    stepText: {
        fontWeight: 'bold',
        fontSize: scale(60),
        marginTop: '3%',
        color: '#89cff0'
      },
      totalCountText: {
        fontWeight: 'bold',
        fontSize: scale(60),
        marginTop: '3%',
        color: '#FFB6C1'
      },
});