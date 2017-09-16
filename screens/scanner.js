import React from 'react';
import { StyleSheet, Image, Modal, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import Colors from '../constants/colors';

import Button from '../components/button';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Scanner extends React.Component {
  state = {
    hasCameraPermission: null,
    visible: false,
    qrObject: {}
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, visible, qrObject } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
          />

          <Modal
            visible={visible}
            animationType='slide'
            transparent={true}
            style={{ flex: 1, backgroundColor: 'transparent' }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.6)' }}>
              <View style={{alignItems: 'flex-end'}}>
                    <Icon name="ios-close" style={styles.actionButtonIcon} />
              </View>
              <View style={{ flex: 1, padding: 16, margin: 32, marginHorizontal: 64, backgroundColor: 'white', borderWidth: 3, borderColor: Colors.main }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={{ uri: qrObject.image }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: Colors.text }} />
                  <Text style={{ fontSize: 20, marginTop: 8, fontWeight: '500', color: Colors.subtitle }}>{qrObject.name}</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../assets/receive.png')} style={{ width: 48, height: 48 }} />
                  <Text style={{
                    fontSize: 24, fontWeight: '700', backgroundColor: 'transparent',
                    padding: 4, color: Colors.text
                  }}>
                    <Text style={{ fontSize: 18, color: Colors.main }}>{qrObject.type == 'USD' ? '$' : 'Ƀ'}</Text>
                    <Text style={{ fontSize: 28 }}>{this.numberWithCommas(qrObject.amount)}</Text>
                    <Text style={{ color: Colors.subtitle }}> {qrObject.type}</Text>
                  </Text>
                  <Image source={require('../assets/cash-sell.png')} style={{ width: 48, height: 48 }} />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/sungwoo.jpg')} style={{ borderWidth: 3, borderColor: Colors.text, width: 100, height: 100, borderRadius: 50 }} />
                  <Text style={{ fontSize: 20, marginTop: 8, fontWeight: '500', color: Colors.subtitle }}>Sung Woo Park</Text>
                </View>
              </View>

              <View style={{ margin: 24 }}>
                <Button text={`Pay ${qrObject.name} ${qrObject.type == 'USD' ? '$' : 'Ƀ'}${this.numberWithCommas(qrObject.amount)}`} backgroundColor={Colors.main} color={Colors.white} />
              </View>
            </View>

          </Modal>

        </View>
      );
    }
  }

  numberWithCommas(x) {
    return (x + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  _handleBarCodeRead = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    const qrObject = JSON.parse(data);
    this.setState({ qrObject, visible: true });
  }
}


const styles = StyleSheet.create({
  actionButtonIcon: {
      fontSize: 40,
      height: 32,
      margin: 16, 
      marginRight: 24,
      marginTop: 40,
      color: Colors.white,
  },
});