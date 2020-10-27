import React from 'react';
import {View, Text, Button} from 'react-native'

export default ({history}) =>(
    <View>
        <Text>hello</Text>
        <Button title="back" onPress={()=>history.push("/login")}/>
    </View>
)