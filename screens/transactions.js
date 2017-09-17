import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    StatusBar,
    StyleSheet
} from 'react-native';

import Colors from '../constants/colors';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import RowItem from '../components/rowitem';

import { getTransactions } from '../components/apicalls';


export default class Transaction extends Component {
    constructor(props) {
        super(props);
        const { params } = props.navigation.state;
        this.state = {
            bank_id: params.bank_id,
            bitcoin_id: params.bitcoin_id,
            bitcoin_price: params.bitcoin_price,
            data: []

        }
    }

    _keyExtractor = (item, index) => index;

    componentDidMount() {
        const { data, bank_id, bitcoin_id } = this.state;
        getTransactions(bitcoin_id, bank_id)
            .then(response => {
                console.log('bitcoin transfers', response);
                this.setState({ data: data.concat(response) })
            })
       
    }


    isBitcoin(item) {
        const { bitcoin_id, bank_id } = this.state;
        const { payee_id, payer_id } = item;

        if ((payer_id == bitcoin_id || payer_id == bank_id) && (payee_id == bitcoin_id || payee_id == bank_id)) {
            //transfer to my self
            return false;
        } else {
            if (payer_id == bitcoin_id || payee_id == bitcoin_id) return true;
            else return false;
        }
    }

    didPay(item) {
        const { bitcoin_id, bank_id } = this.state;
        const { payer_id } = item;

        return payer_id == bitcoin_id || payer_id == bank_id;
    }

    converted(item) {
        const { bitcoin_id, bank_id } = this.state;
        const { payee_id, payer_id } = item;

        return (payer_id == bitcoin_id || payer_id == bank_id) && (payee_id == bitcoin_id || payee_id == bank_id);

    }

    render() {
        const { data, bitcoin_price } = this.state;

        const content = data.length == 0 ?
            <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: Colors.subtitle, fontSize: 16}}>No Data to Show</Text>
            </View>

            : <FlatList
                data={data}
                keyExtractor={this._keyExtractor}
                renderItem={({ item }) => <RowItem paid={this.didPay(item)} bitcoin_price={bitcoin_price} converted={this.converted(item)} bitcoin={this.isBitcoin(item)} item={item} />}
            />


        return (
            <View style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <ParallaxScrollView
                    backgroundColor={Colors.main}
                    contentBackgroundColor="white"
                    parallaxHeaderHeight={300}
                    fadeOutForeground={true}
                    renderForeground={() => (
                        <View style={{ height: 300, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                            <Image source={require('../assets/chart.png')} />
                            <Text style={{ color: Colors.white, fontSize: 36, fontWeight: '600' }}>
                                Transaction History
                            </Text>
                        </View>
                    )}>
                    {content}
                </ParallaxScrollView>
            </View>
        )
    }
}