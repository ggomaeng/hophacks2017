import React from 'react';
import { Alert, StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Dimensions, Image, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');

import Button from '../components/button';
import Colors from '../constants/colors';

const data = require('../constants/data.json');

import { transfer } from '../components/apicalls';

import * as Animatable from 'react-native-animatable';

export default class Bitcoin extends React.Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            bank_id: params.bank_id,
            bitcoin_id: params.bitcoin_id,
            bank_balance: params.bank_balance,
            bitcoin_balance: params.bitcoin_balance,
            bitcoin_price: params.bitcoin_price,
            amount: '',
            resultAmount: 0,
            desription: '',
            moneyIndex: 0,
            qrcodePressed: false
        }
    }

    convert() {
        const { bitcoin_id, bank_id, bitcoin_balance, bitcoin_price, bank_balance, resultAmount, moneyIndex, description, amount, qrcodePressed } = this.state;


        console.log(amount, bitcoin_price);

        if (amount && amount > 0 && bitcoin_id && bank_id) {
            if (moneyIndex == 0 && (amount < 0 || amount > bitcoin_balance)) {
                alert("Invalid amount");
                return;
            }

            if (moneyIndex == 1 && (amount < 0 || amount > bank_balance)) {
                alert("Invalid amount");
                return;
            }

            const from = moneyIndex == 0 ? bitcoin_id : bank_id;
            const id = moneyIndex == 0 ? bank_id : bitcoin_id;
            const amt = moneyIndex == 0 ? amount * bitcoin_price : amount;

            transfer(from, id, amt, description)
                .then(response => {
                    console.log(response);
                    if (response && response.code && response.code == 201) {
                        Alert.alert(
                            'Transaction Complete',
                            'It may take a moment to transfer the value and see the change',
                            [
                                { text: 'OK', onPress: () => console.log('OK Pressed') },
                            ],
                        )
                        this.props.navigation.goBack(null);
                    } else {
                        alert("Something went wrong.");
                    }
                });


        } else {
            // alert("Invalid amount")
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    render() {
        const { bitcoin_id, bank_id, bitcoin_balance, resultAmount, bank_balance, bitcoin_price, moneyIndex, description, amount, qrcodePressed } = this.state;

        const currencyText = <Text><Text style={{ color: Colors.text, fontSize: 40 }}>{moneyIndex == 0 ? ' BTC ' : ' USD '}</Text> →
        <Text style={{ color: Colors.text, fontSize: 40 }}>{moneyIndex == 0 ? ' USD ' : ' BTC '}</Text></Text>

        var fromAmount;
        var toAmount;

        if (moneyIndex == 0) {
            fromAmount = amount ? parseFloat(amount) : 0;
            toAmount = (amount * bitcoin_price).toFixed(2);
        } else if (moneyIndex == 1) {
            fromAmount = amount ? parseFloat(amount) : 0;
            toAmount = (amount / bitcoin_price).toFixed(8);
        }

        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                <Animatable.View animation='fadeIn' duration={2000} style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Animatable.Text style={{ fontSize: 32, color: Colors.main, marginBottom: 32, fontWeight: '700' }}>{currencyText}</Animatable.Text>
                        <Animatable.View animation='flipInY' delay={300} duration={800} style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.setState({ moneyIndex: 0 })} style={{ marginRight: 32 }}>
                                <Image source={require('../assets/cute-bitcoin.png')} style={{ width: 64, height: 64, opacity: moneyIndex == 0 ? 1 : .2 }} />
                                <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.subtitle, textAlign: 'center' }}>{bitcoin_balance.toFixed(2)}</Text>
                                <Text style={{ fontSize: 24, fontWeight: '600', color: Colors.subtitle, textAlign: 'center' }}>BTC</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setState({ moneyIndex: 1 })} style={{ marginLeft: 32 }}>
                                <Image source={require('../assets/cute-dollar.png')} style={{ width: 64, height: 64, opacity: moneyIndex == 1 ? 1 : .2 }} />
                                <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.subtitle, textAlign: 'center' }}>{bank_balance.toFixed(2)}</Text>
                                <Text style={{ fontSize: 24, fontWeight: '600', color: Colors.subtitle, textAlign: 'center' }}>USD</Text>
                            </TouchableOpacity>
                        </Animatable.View>


                        <Animatable.View animation='fadeInUp' delay={800}>
                            <TextInput
                                style={{ width: width - 100, height: 40, marginTop: 32, borderColor: 'gray', backgroundColor: 'white', paddingHorizontal: 8, color: Colors.main, borderWidth: 1 }}
                                onChangeText={(amt) => this.setState({ amount: this.isNumeric(amt) || amt == '' ? amt : amount, resultAmount: toAmount })}
                                placeholder="0.00"
                                keyboardType='decimal-pad'

                                placeholderTextColor={Colors.subtitle}
                                value={amount + ""}
                            />
                        </Animatable.View>
                    </View>

                    <View style={{ paddingVertical: 16 }}>
                        <Button onPress={() => this.convert()} text={`Convert ${fromAmount} ${moneyIndex == 0 ? 'BTC' : 'USD'} to ${toAmount} ${moneyIndex == 0 ? 'USD' : 'BTC'}`} backgroundColor={Colors.main} color={Colors.white} />
                    </View>


                </Animatable.View>
            </KeyboardAvoidingView>
        );
    };
}