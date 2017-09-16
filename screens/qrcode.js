import React from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const { width, height } = Dimensions.get('window');

import Button from '../components/button';
import Colors from '../constants/colors';

export default class BarcodeScannerExample extends React.Component {
    render() {
        let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{fontWeight: '600', fontSize: 28, marginBottom: 32, color: Colors.text, textAlign: 'center'}}>Please scan your id</Text>
                    <QRCode
                        value="http://awesome.link.qr"
                        size={width / 2}
                    />
                </View>

                <View style={{ paddingVertical: 16 }}>
                    <Button onPress={() => this.props.navigation.goBack(null)} text='Done' backgroundColor={Colors.main} color={Colors.white}/>
                </View>

            </View>
        );
    };
}