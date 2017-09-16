import React, { Component } from 'react';
import { View, Text, Platform, Image, NativeModules, StyleSheet } from 'react-native';

import {NavigationActions} from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/colors';

import Button from '../components/button';

export default class Login extends Component {
    state = {
        success: false
    }

    render() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'DashBoard' })],
        });
        if (Platform.OS === 'android') {
            authFunction = async () => {
                try {
                    let result = await NativeModules.ExponentFingerprint.authenticateAsync();
                    if (result.success) {
                        this.setState({ success: true })
                        // alert('Authenticated!');
                    } else {
                        this.setState({ success: false })
                        // alert('Failed to authenticate');
                    }
                } finally {
                }
            };
        } else if (Platform.OS === 'ios') {
            authFunction = async () => {
                let result = await NativeModules.ExponentFingerprint.authenticateAsync(
                    'Show me your finger!'
                );
                if (result.success) {
                    this.setState({ success: true })
                    this.props.navigation.dispatch(resetAction);
                    // alert('Success!');
                } else {
                    this.setState({ success: false })
                    // alert('Cancel!');
                }
            };
        }
        return (
            <View style={{
                flex: 1
            }}>
                <Animatable.View
                    animation='fadeIn'
                    duration={2000}
                    style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                    <Text style={{ fontWeight: '600', fontSize: 32, color: Colors.text, marginVertical: 4 }}>BitOne</Text>
                    <Image
                        source={require('../assets/cards.png')}
                        style={{
                            width: 128,
                            height: 128
                        }} />
                    <Text
                        style={{
                            marginTop: 8,
                            color: Colors.subtitle,
                            fontSize: 20
                        }}>Bank at Your Fingertips</Text>
                </Animatable.View>
                <View style={{ flex: 1 }}>
                    <Button onPress={authFunction} animation='fadeInUp' delay={1000} backgroundColor={Colors.main} color={Colors.white} borderColor={Colors.white} borderWidth={StyleSheet.hairlineWidth} text='SIGN IN' />
                    <Button onPress={authFunction} animation='fadeInUp' delay={1200} backgroundColor={Colors.white} color={Colors.text} borderColor={Colors.text} borderWidth={StyleSheet.hairlineWidth} text='SIGN UP' />
                </View>
            </View>

        )
    }
}