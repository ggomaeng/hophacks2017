import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';

import IntroScreen from './screens/intro';
import LoginScreen from './screens/login';
import LandingScreen from './screens/landing';
import QRScreen from './screens/qrcode';
import ScanScreen from './screens/scanner';
import PayScreen from './screens/pay';
import BitcoinScreen from './screens/bitcoin';
import TransactionScreen from './screens/transactions';

import FAB from './screens/fab';

import {
  StackNavigator,
} from 'react-navigation';

var dashnavigation;

export const DashNavigator = StackNavigator({
  Landing: {
    screen: LandingScreen,
  },
  Pay: {
    screen: PayScreen
  },
  Scanner: {
    screen: ScanScreen
  },
  QR: {
    screen: QRScreen
  },
  Bitcoin: {
    screen: BitcoinScreen
  },
  Transaction: {
    screen: TransactionScreen
  }
}, {
    initialRouteName: 'Landing',
    headerMode: 'none'
  })

const RootNavigator = StackNavigator({
  Intro: {
    screen: IntroScreen,
  },
  Login: {
    screen: LoginScreen
  },
  DashBoard: {
    screen: ({ navigation }) => (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle='default' />
        <DashNavigator ref={nav => { this.navigator = nav; }} screenProps={{ rootNavigation: navigation }} />
      </View>
    )
  }
}, {
    initialRouteName: 'DashBoard',
    headerMode: 'none'
  })

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='default' />
        <RootNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
