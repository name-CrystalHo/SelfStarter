import React from 'react';
import { Pedometer } from 'expo-sensors';
import { StyleSheet, Text, View } from 'react-native';
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window')

const scale = size => width / 350 * size;
 
export default class PedometerScreen extends React.Component {
  state = {
    isPedometerAvailable: 'checking',
    pastStepCount: 0,
    currentStepCount: 0,
  };

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps,
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result),
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: 'Could not get isPedometerAvailable: ' + error,
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
      },
      error => {
        this.setState({
          pastStepCount: 'Could not get stepCount: ' + error,
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style = {styles.trueTitleText}>Pedometer</Text>
        <Text style = {styles.titleText}>STEPS TAKEN:</Text>
        <Text style = {styles.stepText}>{this.state.currentStepCount}</Text>
        <Text style = {styles.totalText}>STEPS TODAY:</Text>
        <Text style = {styles.totalCountText}>{this.state.pastStepCount}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: scale(20),
    marginTop: '10%'
  },
  stepText: {
    fontWeight: 'bold',
    fontSize: scale(100),
    marginTop: '3%',
    color: '#89cff0'
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: scale(20),
    marginTop: '10%'
  },
  totalCountText: {
    fontWeight: 'bold',
    fontSize: scale(80),
    marginTop: '3%',
    color: '#FFB6C1'
  },
  trueTitleText: {
    fontWeight: 'bold',
    fontSize: scale(40),
    marginTop: '15%',
  }
});