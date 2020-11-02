import React, { Component } from 'react';
import { Alert,Text, Button, TextInput, View, StyleSheet } from 'react-native';
import{TouchableOpacity} from 'react-native-gesture-handler';


export default class Login extends Component  {

  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }
  
  onLogin() {
    const { email, password } = this.state;

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
        
        <TouchableOpacity>
        <Button
          title={'Login'}
          style={styles.input}
         onPress={this.onLogin.bind(this)}       
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