import React, { Component } from 'react';
import { Alert,Text, Button, TextInput, View, StyleSheet } from 'react-native';
import{TouchableOpacity, TouchablePaity} from 'react-native-gesture-handler';
import { firebase } from './config'
import * as SecureStore from 'expo-secure-store'
import * as  Home from "./home"
  

export default class Signup extends Component  {

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
      password2: '',
      fullName: '',
    };
  }
  onRegisterPress = () => {
    if (this.state.password !== this.state.password2) {
        alert("Passwords don't match.")
        return
    }
    email = this.state.email
    fullName = this.state.fullName
  
    firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((response) => {
            const uid = response.user.uid
            const data = {
                id: uid,
                email,
                fullName,
            };
            const usersRef = firebase.firestore().collection('users')
            usersRef
                .doc(uid)
                .set(data)
                .then(() => {
                  this.props.navigation.navigate('Create Workout')
                })
                .catch((error) => {
                    alert(error)
                });
        })
        .catch((error) => {
            alert(error)
    });
  }
  // createUser(email,password)
  // {
    
  //   firebase.database().ref('users/'+email).set(
  //     email=email,
  //     password=password
  //   )
  // }
  // onSignup() {
  //   // const { email, password,password2 } = this.state;

  //   Alert.alert('Created Account!')
  // }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.fullName}
          onChangeText={(fullName) => this.setState({ fullName })}
          placeholder={'FullName'}
          style={styles.input}
        />
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
          value={this.state.password2}
          onChangeText={(password2) => this.setState({ password2 })}
          placeholder={'Retype Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
 
        <Button 
          onPress={this.onRegisterPress.bind(this)}
          title="SignUp">
          Press Me
          </Button>
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
}) ;