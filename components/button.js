import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import Colors from '../constants/colors';

import * as Animatable from 'react-native-animatable';

export default class Button extends Component {
    render() {
        const {animation, duration, delay, color, backgroundColor, onPress, text, borderColor, borderWidth} = this.props;
        return (
            <Animatable.View
                animation={animation}
                duration={duration}
                delay={delay}
                >
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 64,
                    padding: 24,
                    marginHorizontal: 32,
                    marginVertical: 8,
                    backgroundColor,
                    borderColor,
                    borderWidth
                }}>
                    <Text
                        style={{
                        fontWeight: '300',
                        color
                    }}>{text}</Text>
                </TouchableOpacity>

            </Animatable.View>
        )
    }
}