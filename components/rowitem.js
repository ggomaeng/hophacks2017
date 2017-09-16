import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

export default class RowItem extends Component {
    render() {
        const { title, date, price } = this.props.item;
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', height: 100
            }}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={{ fontSize: 24, color: Colors.text }}>{title}</Text>
                    <Text style={{ fontSize: 16, color: Colors.subtitle }}>{date}</Text>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: price > 0 ? Colors.main : Colors.red, fontSize: 32, fontWeight: '600' }}>{price}</Text>
                </View>

            </View>
        )
    }
}