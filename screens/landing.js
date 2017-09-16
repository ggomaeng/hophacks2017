import React, { Component } from 'react';
import { Animated, Image, View, Text, StatusBar, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient, BlurView } from 'expo';

import { StackNavigator, NavigationActions } from 'react-navigation';

import * as Animatable from 'react-native-animatable';

import Colors from '../constants/colors';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
export default class DashBoard extends Component {
      render() {
        return (
            <Animatable.View animation='fadeIn' duration={3000} style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[Colors.main, Colors.main, Colors.white]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animatable.View animation='fadeInLeft' delay={1500} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Image source={require('../assets/bitcoin-sign.png')} style={{ marginTop: 4, marginRight: 4, width: 28, height: 28 }} />
                        <Text style={{ backgroundColor: 'transparent', color: Colors.white, fontSize: 40, fontWeight: '700' }}>123.456</Text>
                        <Text style={{ backgroundColor: 'transparent', paddingTop: 8, color: Colors.white, fontSize: 16, fontWeight: '300' }}>.50</Text>
                    </Animatable.View>
                </LinearGradient>
                <LinearGradient colors={[Colors.white, Colors.white]} style={{ flex: 1, alignItems: 'center' }}>
                    <Animatable.View animation='fadeInRight' delay={1500} style={{ marginTop: 80, flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Image source={require('../assets/dollar-sign.png')} style={{ marginTop: 4, width: 32, height: 32 }} />
                        <Text style={{ backgroundColor: 'transparent', color: Colors.main, fontSize: 40, fontWeight: '700' }}>8372.456</Text>
                        <Text style={{ backgroundColor: 'transparent', paddingTop: 8, color: Colors.main, fontSize: 16, fontWeight: '300' }}>.50</Text>
                    </Animatable.View>
                </LinearGradient>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: Colors.text,
    },
});