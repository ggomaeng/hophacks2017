import React from 'react';
import { ActivityIndicator, StyleSheet, Image, Modal, Text, View, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

import Colors from '../constants/colors';

import Button from '../components/button';
import Icon from 'react-native-vector-icons/Ionicons';

import { transfer } from '../components/apicalls';

const data = require('../constants/data.json');

export default class Scanner extends React.Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      bank_id: params.bank_id,
      bitcoin_id: params.bitcoin_id,
      bitcoin_price: params.bitcoin_price,
      hasCameraPermission: null,
      visible: false,
      qrObject: {},
      paymentFinished: false,
      loading: false,

    }
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  createTransaction() {
    const { bank_id, bitcoin_id, hasCameraPermission, qrObject } = this.state;

    const { type, id, name, description, amount } = qrObject;

    const from = type == 'BTC' ? bitcoin_id : bank_id;

    this.setState({ loading: true });
    transfer(from, id, amount, description, type)
      .then(response => {
        console.log(response);
        if (response && response.code && response.code == 201) {
          setTimeout(() => {
            this.setState({ loading: false, paymentFinished: true });
          }, 1000)
        } else {
          alert("Something went wrong.");
        }
      });

  }

  goBack() {
    this.setState({visible: false});
    this.props.navigation.goBack(null);
  }

  renderModal() {
    const { hasCameraPermission, visible, qrObject, bitcoin_id, bitcoin_price, paymentFinished, loading, displayLoading } = this.state;

    const amt = qrObject.type == 'USD' ? qrObject.amount : qrObject.amount / bitcoin_price;
    const buttonText = paymentFinished ? 'Done' : `Pay ${qrObject.name} ${qrObject.type == 'USD' ? '$' : 'Ƀ'}${amt}`

    const desc = qrObject.description
      ?
      <Text style={{ textAlign: 'center', marginBottom: 32 }}>{qrObject.description}</Text>
      : null;

    const indicator = <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
      <ActivityIndicator animating={true} color={Colors.mint} />
    </View>

    const isKevin = bitcoin_id == data.kevin_bitcoin;

    const content = !paymentFinished ?
      <View style={{ flex: 1 }}>
        {desc}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{ uri: qrObject.image }} style={{ width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: Colors.text }} />
          <Text style={{ fontSize: 20, marginTop: 8, fontWeight: '500', color: Colors.subtitle }}>{qrObject.name}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('../assets/receive.png')} style={{ width: 32, height: 32 }} />
          <Text style={{
            fontSize: 24, fontWeight: '700', backgroundColor: 'transparent',
            padding: 4, color: Colors.text
          }}>
            <Text style={{ fontSize: 18, color: Colors.main }}>{qrObject.type == 'USD' ? '$' : 'Ƀ'}</Text>
            <Text style={{ fontSize: 28 }}>{this.numberWithCommas(amt)}</Text>
            <Text style={{ color: Colors.subtitle }}> {qrObject.type}</Text>
          </Text>
          <Image source={require('../assets/cash-sell.png')} style={{ width: 32, height: 32 }} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={{uri: isKevin ? data.kevin_image : data.sungwoo_image}} style={{ borderWidth: 3, borderColor: Colors.text, width: 100, height: 100, borderRadius: 50 }} />
          <Text style={{ fontSize: 20, marginTop: 8, fontWeight: '500', color: Colors.subtitle }}>{isKevin ? 'Kevin Chae' : 'Sung Woo Park'}</Text>
        </View>
      </View>
      : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image source={require('../assets/check.png')} />
        <Text>Complete!</Text>
      </View>;

    return (
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,.6)' }}>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity onPress={() => this.setState({ qrObject: {}, visible: false })}>
            <Icon name="ios-close" style={styles.actionButtonIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, padding: 16, margin: 32, marginHorizontal: 64, backgroundColor: 'white', borderWidth: 3, borderColor: Colors.main }}>
          {loading ? indicator : content}
        </View>

        <View style={{ margin: 24 }}>
          {loading ? <Button />
            : <Button onPress={() => paymentFinished ? this.goBack() : this.createTransaction()} text={buttonText} backgroundColor={Colors.main} color={Colors.white} />
          }
        </View>
      </View>
    )
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
            {this.renderModal()}

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