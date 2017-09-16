import React, { Component } from 'react';
import { View, AsyncStorage, Dimensions, TextInput, Text, Platform, Image, NativeModules, StyleSheet } from 'react-native';

import { NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import Colors from '../constants/colors';

import Button from '../components/button';

import { getAccountInfo } from '../components/apicalls';

const data = require('../constants/data.json');

const { width, height } = Dimensions.get('window');

export default class Login extends Component {
    state = {
        success: false,
        bitcoin_id: 'kevin_bitcoin',
        bank_id: 'kevin_usd',
        warning: ''
    }



    render() {
        const { bitcoin_id, bank_id, text, warning } = this.state;
        const { navigate } = this.props.navigation;

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({
                routeName: 'DashBoard',

            })],
            params: [NavigationActions.setParams({
                globalData: {
                    bank_id,
                    bitcoin_id
                }
            })]
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
                    'Please verify your identity'
                );
                if (result.success) {
                    this.setState({ success: true })
                    this.props.navigation.dispatch(resetAction);
                    // alert('Success!');
                } else {
                    this.setState({ success: false })
                    // alert('Cancel!');
                }
            }
        }

        // checkAccount = () => {
        //     getAccountInfo(bitcoin_id)
        //         .then(response => {
        //             if (response && response.code && response.code == 404) {
        //                 this.setState({ warning: response.message });
        //             } else {
        //                 getAccountInfo(bank_id)
        //                     .then(response => {
        //                         if (response && response.code && response.code == 404) {
        //                             this.setState({ warning: response.message });
        //                         } else {
        //                             authFunction();
        //                         }
        //                     });
        //             }
        //         });
        // }

        checkAcount = async () => {
            if (data[bitcoin_id] != null && data[bank_id] != null) {
                try {
                    await AsyncStorage.setItem('bitcoin_id', data[bitcoin_id]);
                    await AsyncStorage.setItem('bank_id', data[bank_id]);
                    authFunction();
                } catch (error) {
                    // Error saving data
                    this.setState({ warning: error });
                }
            } else {
                this.setState({ warning: "Invalid Credentials" });
            }
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

                    <TextInput
                        style={{ width: width - 100, height: 40, marginTop: 32, borderColor: 'gray', backgroundColor: 'white', paddingHorizontal: 8, color: Colors.main, borderWidth: 1 }}
                        onChangeText={(bitcoin_id) => this.setState({ bitcoin_id })}
                        placeholder="Bitcoin id"
                        placeholderTextColor={Colors.subtitle}
                        value={bitcoin_id}
                    />
                    <TextInput
                        style={{ width: width - 100, height: 40, marginTop: 16, borderColor: 'gray', backgroundColor: 'white', paddingHorizontal: 8, color: Colors.main, borderWidth: 1 }}
                        onChangeText={(bank_id) => this.setState({ bank_id })}
                        placeholder="Bank id"
                        secureTextEntry={true}
                        placeholderTextColor={Colors.subtitle}
                        value={bank_id}
                    />
                    <Text style={{ marginTop: 16, color: Colors.red }}>{warning}</Text>
                </Animatable.View>
                <View style={{ flex: 1 }}>
                    <Button onPress={checkAcount} animation='fadeInUp' delay={1000} backgroundColor={Colors.main} color={Colors.white} borderColor={Colors.white} borderWidth={StyleSheet.hairlineWidth} text='SIGN IN' />
                    <Button onPress={checkAcount} animation='fadeInUp' delay={1200} backgroundColor={Colors.white} color={Colors.text} borderColor={Colors.text} borderWidth={StyleSheet.hairlineWidth} text='SIGN UP' />
                </View>
            </View >

        )
    }
}