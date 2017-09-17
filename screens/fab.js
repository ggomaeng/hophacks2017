import React, { Component } from 'react';
import { Animated, Image, View, StatusBar, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient, BlurView } from 'expo';

import { StackNavigator, NavigationActions } from 'react-navigation';

import LandingScreen from './landing';
import QRScreen from './qrcode';

import * as Animatable from 'react-native-animatable';

import { DashNavigator } from '../App';

import Colors from '../constants/colors';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
export default class DashBoard extends Component {

    renderActionButton() {
        const params = {

        };
        
        const payAction = NavigationActions.navigate({
            routeName: 'Pay',
            action: NavigationActions.navigate({ routeName: 'Pay' })
        })

        const bitcoinAction = NavigationActions.navigate({
            routeName: 'Bitcoin',
            action: NavigationActions.navigate({ routeName: 'Bitcoin' })
        })

        const transAction = NavigationActions.navigate({
            routeName: 'Transaction',
            action: NavigationActions.navigate({ routeName: 'Transaction' })
        })

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Intro' })],
        });

        return (
            <ActionButton
                bgColor="rgba(0,0,0,0.5)"
                degrees={90} icon={<Icon name="ios-more" style={[styles.actionButtonIcon, { color: 'white' }]} />} position="center" buttonColor={Colors.text}>
                <ActionButton.Item buttonColor='#eee' onPress={() => this.props.navigation.dispatch(bitcoinAction)}>
                    <Icon name="logo-bitcoin" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#eee' onPress={() => this.props.navigation.dispatch(payAction)}>
                    <Icon name="logo-usd" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#eee' onPress={() => this.props.navigation.dispatch(transAction)}>
                    <Icon name="ios-analytics" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#eee' onPress={() => this.props.screenProps.rootNavigation.dispatch(resetAction)}>
                    <Icon name="md-log-out" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        )
    }
    render() {
        return this.renderActionButton();

    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: Colors.text,
    },
});