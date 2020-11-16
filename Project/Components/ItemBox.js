import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Button
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ItemBox = (props) => {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });
    return (
      <TouchableOpacity onPress={props.handleDelete} activeOpacity={0.6}>
        <View style={styles.deleteBox}>
          <Animated.Text style={{transform: [{scale: scale}]}}>
            Delete
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (

    <Swipeable renderLeftActions={leftSwipe}>    
        <TouchableOpacity  style={styles.myButton}
    // onPress={()=>this.props.navigation.navigate('Start Workout', {workoutName: item.key})}
    onPress={props.handleNavigate}
   >
       <Text>{props.data.key}</Text> 
    </TouchableOpacity>
     </Swipeable>

   
  
  );
};

export default ItemBox;

const styles = StyleSheet.create({

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
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlignVertical: "center",
    textAlign: "center",
    color:"black",
  },
  deleteBox:{
    backgroundColor:"red",
    justifyContent:"center",
    width:100,
    height:60,
    padding: 10,
    marginVertical: 8,

    alignItems:"center",
  
},
});