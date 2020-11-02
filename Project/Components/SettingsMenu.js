import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


export default class SettingsMenu extends Component{
    render(){
    return (
        <View style = {styles.container}>
            <Text style = {styles.titleText}>Account Settings</Text>
            <View style = {styles.settingsContainer}>
                <Text style = {styles.settingsText}>Change Username</Text>
                <Text style = {styles.settingsText}>Change Password</Text>
                <Text style = {styles.settingsText}>Change Change Notification Settings</Text>
            </View>
            <View style ={styles.logoutButton}>
                <Text style = {styles.logoutText}>Log Out</Text>
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
      marginBottom: "15%",
      marginTop: "4%",
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
        backgroundColor: "#A9A9B0", 
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: '93%'
    },
    logoutText: {
       color: '#8E1600',
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
    }
});
