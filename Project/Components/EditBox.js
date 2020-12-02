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
  const rightSwipe=()=>{
    return (
      <TouchableOpacity onPress={props.handleEdit} activeOpacity={0.6}>
        <View style={styles.editBox}>
          <Text>
            Edit
            </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (

    <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>    
        <TouchableOpacity  style={styles.myButton}
    onPress={props.handleNavigate}
   >
        <Text>Exercise: {props.data.name}</Text>
       <Text>Reps: {props.data.rep} Sets: {props.data.set}</Text>
       <Text> Rest: {props.data.rest} </Text>
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
  editBox:{
    backgroundColor:"blue",
    justifyContent:"center",
    width:100,
    height:60,
    padding: 10,
    marginVertical: 8,
    alignItems:"center",
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