import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';

import moment from 'moment';

export default class RowItem extends Component {
    numberWithCommas(x) {
        return (x + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }

    render() {
        const { paid, bitcoin, bitcoin_price, converted } = this.props;
        const { description, transaction_date, amount, price } = this.props.item;

        const conversionText = converted && bitcoin ? 'BTC to USD' : 'USD to BTC';
        return (
            <View style={{
                flexDirection: 'row', justifyContent: 'space-between',
                padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee', height: 100
            }}>
                <View style={{ justifyContent: 'space-around' }}>
                    <Text style={{ fontSize: 24, color: Colors.text }}>{converted ? conversionText : description}</Text>
                    <Text style={{ fontSize: 16, color: Colors.subtitle }}>{transaction_date}</Text>
                </View>

                <View style={{ justifyContent: 'center' }}>
                    <Text style={{ color: !paid ? Colors.main : Colors.red, fontSize: 32, fontWeight: '600' }}>
                        {paid ? '- ' : '+ '}
                        {bitcoin ? 'Ƀ' : '$'}
                        {bitcoin ? (amount / bitcoin_price).toFixed(3) : this.numberWithCommas(amount)}
                    </Text>
                </View>

            </View>
        )
    }
}