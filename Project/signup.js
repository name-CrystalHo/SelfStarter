import React, { Component } from 'react';
import { Alert,Text, Button, TextInput, View, StyleSheet } from 'react-native';
import{TouchableOpacity, TouchablePaity} from 'react-native-gesture-handler';


export default class Signup extends Component  {

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }
  
  onSignup() {
    const { email, password,password2 } = this.state;

    Alert.alert('Credentials', `${email} + ${password}`);
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password2) => this.setState({ password2 })}
          placeholder={'Retype Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <TouchableOpacity>
        <Button
          title={'Sumbit'}
          style={styles.input}
         onPress={this.onSignup.bind(this)}       
        />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});