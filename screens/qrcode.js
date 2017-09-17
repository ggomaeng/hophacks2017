import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TouchableOpacity, TextInput, Dimensions, Image, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');

import Button from '../components/button';
import Colors from '../constants/colors';

const data = require('../constants/data.json');

import * as Animatable from 'react-native-animatable';

export default class QRGen extends React.Component {
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
            desription: '',
            moneyIndex: 0,
            qrcodePressed: false
        }
    }

    generateQR() {
        const { bitcoin_id, bank_id, bitcoin_balance, bank_balance, moneyIndex, description, amount, qrcodePressed } = this.state;


        if (amount && amount > 0 && bitcoin_id && bank_id) {
            if (moneyIndex == 0 && (amount < 0 || amount > bitcoin_balance)) {
                alert("Invalid amount");
                return;
            }

            if (moneyIndex == 1 && (amount < 0 || amount > bank_balance)) {
                alert("Invalid amount");
                return;
            }

            this.setState({ qrcodePressed: true });

        } else {
            alert("Check login status")
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        const { bitcoin_id, bank_id, bitcoin_balance, bank_balance, bitcoin_price, moneyIndex, description, amount, qrcodePressed } = this.state;
        if (qrcodePressed) {
            const isKevin = data.kevin_bitcoin == bitcoin_id;
            const args = {
                type: moneyIndex == 0 ? "BTC" : "USD",
                id: moneyIndex == 0 ? bitcoin_id : bank_id,
                name: isKevin ? 'Kevin Chae' : 'Sung Woo Park',
                image: isKevin ? data.kevin_image : data.sungwoo_image,
                amount: moneyIndex == 0 ? amount * bitcoin_price : amount,
                description
            }

            return (
                <Animatable.View animation='fadeIn' duration={1500} style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <QRCode
                            size={width - 100}
                            logo={require('../assets/bitone_logo.png')}
                            logoSize={90}
                            color={Colors.text}
                            value={JSON.stringify(args)}
                        />
                    </View>
                    <View style={{ paddingVertical: 16 }}>
                        <Button onPress={() => this.setState({ qrcodePressed: false })} text='Done' backgroundColor={Colors.main} color={Colors.white} />
                    </View>

                </Animatable.View>
            )
        }


        return (
            <KeyboardAvoidingView behavior='height' style={{ flex: 1 }}>
                <Animatable.View animation='fadeIn' duration={2000} style={{ flex: 1 }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                        <Animatable.Text style={{ fontSize: 32, color: Colors.text, marginBottom: 32, fontWeight: '700' }}>Choose Currency</Animatable.Text>
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
                                onChangeText={(amount) => this.setState({ amount })}
                                placeholder="0.00"
                                keyboardType='decimal-pad'
                                placeholderTextColor={Colors.subtitle}
                                value={amount}
                            />

                            <TextInput
                                style={{ width: width - 100, height: 80, marginTop: 32, borderColor: 'gray', backgroundColor: 'white', paddingHorizontal: 8, color: Colors.main, borderWidth: 1 }}
                                onChangeText={(description) => this.setState({ description })}
                                placeholder="Description"
                                placeholderTextColor={Colors.subtitle}
                                value={description}
                            />
                        </Animatable.View>
                    </View>

                    <View style={{ paddingVertical: 16 }}>
                        <Button onPress={() => this.generateQR()} text='Generate QR' backgroundColor={Colors.main} color={Colors.white} />
                    </View>


                </Animatable.View>
            </KeyboardAvoidingView>
        );
    };
}