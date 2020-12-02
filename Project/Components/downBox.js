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

const downBox = (props) => {
  const rightSwipe=()=>{
    return (
      <TouchableOpacity onPress={props.handleLike} activeOpacity={0.6}>
        <View style={styles.likeBox}>
          <Text>
            Like
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (

    <Swipeable renderRightActions={rightSwipe} >    
    <TouchableOpacity  style={styles.myButton}
onPress={props.handleNavigate}
>
   <Text>{props.data.key}</Text> 
  <Text>♥: {props.data.like}</Text>
</TouchableOpacity>
 </Swipeable>

   
  
  );
};

export default downBox;

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
  likeBox:{
    backgroundColor:"#FFC0CB",
    justifyContent:"center",
    width:100,
    height:60,
    padding: 10,
    marginVertical: 8,
    alignItems:"center",
  },
});