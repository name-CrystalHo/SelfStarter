import React, { Component } from 'react';
import { StyleSheet, Text, TextInput,View, Image ,Button, Alert} from 'react-native';
import Dialog, { DialogContent, DialogFooter, DialogButton} from 'react-native-popup-dialog';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as firebase from 'firebase'
import * as SecureStore from 'expo-secure-store'



  
export default class SettingsMenu extends Component{
    constructor(props){
        super(props);
        this.state={
            visible:false,
            newPassword:"",
            newPassword2:"",
            currentPassowrd:"",
        }
    
    }
    makeReview(){ 
        
        if (isNaN(parseInt(this.state.rating))==true || parseInt(this.state.rating)<0 ||  parseInt(this.state.rating) > 10 ){
            alert("Please make sure that the rating is a number between 0 and 10")
            return
        }
        else{
            this.setState({visibleAdd:false})
        }
        const user = firebase.auth().currentUser;
        const uid = user.uid;
        
        const database = firebase.database();
        database.ref("rating/"+uid).push({
          rating: this.state.rating,
        });
        alert("Thank you for reviewing the app!")
      }
    
    signout=()=>{
        firebase.auth().signOut() // to clear the token 
        this.props.navigation.navigate('Home')
       
     }
     reauthenticate=(currentPassword)=>{
        var user=firebase.auth().currentUser;
        var cred=firebase.auth.EmailAuthProvider.credential(user.email,currentPassword);
        return user.reauthenticateWithCredential(cred);
    }
   
        onChangePasswordPress=()=>{
            // alert("Feature Not Available Yet")
        if (this.state.newPassword !== this.state.newPassword2) {
            alert("Passwords don't match.") 
        }
        this.reauthenticate(this.state.currentPassword).then(()=>{
            var user=firebase.auth().currentUser;
            user.updatePassword(this.state.newPassword).then(()=> {
                Alert.alert("Password was changed");
                this.setState({visible:false})
            }).catch((error)=>{
                Alert.alert(error.message);
            });
        }).catch((error)=>{
            Alert.alert(error.message);
        });
        
     }
 
 
    render(){
    return (
        <View style = {styles.container}>
            <Text style = {styles.titleText}>Account Settings</Text>
            <View style = {styles.settingsContainer}>
                
                 <Button title="Change Password" style = {styles.settingsText}
                            onPress={() => {
                    this.setState({ visible: true });
                    }}
                />
                <Dialog
                    width = {.7}
                    height = {.47}
                    visible={this.state.visible}
                    onTouchOutside={() => {
                    this.setState({ visible: false });
                    }}
                    footer={
                        <DialogFooter>
                            
                          <DialogButton
                            text="Cancel"
                            bordered
                            onPress={() => {
                                this.setState({ visible: false });
                              }}
                            key="button-1"
                            alignItems = 'bottom'
                            justifyContent = 'bottom'
                            bottom = {0}
                          />
                          <DialogButton
                            text="Update"
                            bordered
                            onPress={this.onChangePasswordPress}                    
                            key="button-2"
                            alignItems = 'bottom'
                            justifyContent = 'bottom'
                          />
                        </DialogFooter>
                      }>
                    <DialogContent
                        style={{
                            backgroundColor: '#F7F7F8',
                            width: '100%',
                            height: '85%',
                            alignItems: "center",
                        }}>
                      <Text style = {styles.dialogTitle}>
                           Current Password:
                        </Text>
                        <TextInput
                            value={this.state.currentPassword}
                            style = {styles.dialogTextIn}
                            placeholder = 'Retype New Password'
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text)=>{this.setState({currentPassword:text})}}
                        />
                        
                        <Text style = {styles.dialogTitle}>
                            New Password:

                        </Text>
                        <TextInput
                            value={this.state.newPassword}
                            style = {styles.dialogTextIn}
                            placeholder = 'New Password'
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text)=>{this.setState({newPassword:text})}}
                        />
                        <Text style = {styles.dialogTitle}>
                            Retype New Password:

                        </Text>
                        <TextInput
                            value={this.state.newPassword2}
                            style = {styles.dialogTextIn}
                            placeholder = 'Retype New Password'
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={(text)=>{this.setState({newPassword2:text})}}
                        />
                        

                    </DialogContent>
                </Dialog>
                <View style={styles.reviewButton}>
                    <Button
                        title="Review App"
                        onPress={() => {
                        this.setState({ visibleAdd: true });
                        }}
                    />
                    <Dialog
                        width = {.7}
                        height = {.17}
                        visible={this.state.visibleAdd}
                        onTouchOutside={() => {
                        this.setState({ visibleAdd: false });
                        }}
                        footer={
                            <DialogFooter>    
                            <DialogButton
                                text="Cancel"
                                bordered
                                onPress={() => {
                                    this.setState({ visibleAdd: false });
                                }}
                                key="button-1"
                                alignItems = 'bottom'
                                justifyContent = 'bottom'
                                bottom = {0}
                            />
                            <DialogButton
                                text="Finish"
                                bordered
                                //IDK 
                                onPress={this.makeReview.bind(this)}
                                key="button-2"
                                alignItems = 'bottom'
                                justifyContent = 'bottom'
                            />
                            </DialogFooter>
                         }>
                        <DialogContent
                            style={{
                            backgroundColor: '#F7F7F8',
                            width: '100%',
                            height: '40%',
                            alignItems: "center",
                            marginBottom: '15%',
                            marginBottom: '15%'
                            }}>

                            <Text style = {styles.dialogTitle}>
                                Rate out of 10:

                            </Text>
                            <TextInput
                                value={this.state.rating}
                                onChangeText={(rating) => this.setState({rating})}
                                style = {styles.dialogTextIn}
                                placeholder = 'Rating'
                                keyboardType = 'numeric'
                                returnKeyType="done"
                            />
                        </DialogContent>
                    </Dialog>
                </View>          
                <View style ={styles.logoutButton}>
                    <Button onPress={this.signout} title="Log Out"></Button>
                    {/* <TouchableOpacity onPress={this.signout}>
                    <Text style = {styles.logoutText}>Log Out</Text>

                    </TouchableOpacity> */}
                </View>
            </View>
           
        </View>
        
    );
}}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: "flex-end",
      alignItems: "center",
     // marginBottom: "15%",
     // marginTop: "4%",
    },
    backContainer: {
        width: '90%',
        height: 50,
        justifyContent: "flex-start"
    },
    backButton: {
        height: 20,
        width: 30
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: '3%'
    },
    logoutButton: {
        width: '45%',
        height: 50,
        // backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '35%'
    },
    logoutText: {
       color: '#FF0000',
       fontWeight: 'bold',
       fontSize: 18
    },
    settingsText: {
        color: '#61D4D4',
        fontWeight: 'bold',
        fontSize: 19,
        marginTop: '10%'
    },
    settingsContainer: {
        width: '85%',
        height: '75%',
        alignItems: "center",
        marginTop: '10%'
    },
    dialogTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '3%',
        textAlign: "center",
        justifyContent: "center",
        //position: 'absolute',
    },
    dialogTextIn: {
        height: 40,
        width: '80%',
        marginTop: '5%',
        textAlign: "center",
        fontWeight: 'bold',
        backgroundColor: '#A9A9B0'
        
    },
    reviewButton: {
        marginTop: '19%',
        marginBottom: '0%'
    }
});
