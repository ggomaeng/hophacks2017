import React, { Component } from 'react';
import { AsyncStorage, Animated, Dimensions, Image, View, Text, StatusBar, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient, BlurView } from 'expo';

import { StackNavigator, NavigationActions } from 'react-navigation';

import * as Animatable from 'react-native-animatable';

import Carousel from 'react-native-snap-carousel';

import Colors from '../constants/colors';

import { getBitcoinPrice, getAccounts, getAccountInfo } from '../components/apicalls';

const { width, height } = Dimensions.get('window');

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export default class DashBoard extends Component {
    state = {
        index: 0,
        entries: [
            {
                image: require('../assets/cute-bitcoin.png'),
                icon: require('../assets/bitcoin-sign.png'),
                title: "Bitcoin Balance",
                dollar: "0",
                cent: 0
            }, {
                image: require('../assets/cute-dollar.png'),
                icon: require('../assets/dollar-sign.png'),
                title: "Bank Balance",
                dollar: "0",
                cent: 0
            }],
        price_usd: 1,
        bitcoin_id: '',
        bitcoin_balance: 0,
        bank_id: '',
        bank_balance: 0,
        bitcoin_price: 0
    }

    componentWillMount() {
        console.log('entering screen');

    }
    componentWillUnmount() {

    }

    componentDidMount() {
        this.initData()
            .then(r => {
                this.update(r.bitcoin_id, r.bank_id);
            }
            )

    }

    update(bitcoin_id, bank_id) {
        const { entries } = this.state;


        getBitcoinPrice()
            .then(response => {
                const { price_usd } = response;
                console.log("PRICE", price_usd);
                // this.setState({ price_usd, bitcoin_price: price_usd });
                getAccountInfo(bitcoin_id)
                    .then(response => {
                        const bitcoin_balance = response.balance;
                        // console.log("balance: ", balance);
                        const bc_money = (bitcoin_balance + "").split(',');
                        entries[1].dollar = bc_money[0];
                        entries[1].cent = bc_money[1];

                        getAccountInfo(bank_id)
                            .then(response => {
                                const bank_balance = response.balance;
                                // console.log("balance: ", balance);
                                const bk_money = (bank_balance + "").split(',');
                                entries[1].dollar = bk_money[0];
                                entries[1].cent = bk_money[1];
                                this.setState({ entries, bitcoin_balance: bitcoin_balance / price_usd, bitcoin_price: price_usd, price_usd, bank_balance });
                            })

                    })
            });

        this.forceUpdate();


    }

    async initData() {
        try {
            const bitcoin_id = await AsyncStorage.getItem('bitcoin_id');
            const bank_id = await AsyncStorage.getItem('bank_id');
            if (bitcoin_id !== null && bank_id !== null) {
                // We have data!!
                console.log(bitcoin_id, bank_id);
                this.setState({ bitcoin_id, bank_id });
                return { bitcoin_id, bank_id }
            } else {
                console.error("no data!");
            }
        } catch (error) {
            console.error(error);
            // Error retrieving data
        }
    }

    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    renderActionButton() {
        const { bitcoin_id, bitcoin_balance, bitcoin_price, bank_balance, bank_id } = this.state;

        const params = {
            bitcoin_id,
            bitcoin_balance,
            bank_id,
            bank_balance,
            bitcoin_price
        };

        const payAction = NavigationActions.navigate({
            routeName: 'Pay',
            action: NavigationActions.navigate({ routeName: 'Pay' }),
            params
        })

        const bitcoinAction = NavigationActions.navigate({
            routeName: 'Bitcoin',
            action: NavigationActions.navigate({ routeName: 'Bitcoin' }),
            params
        })

        const transAction = NavigationActions.navigate({
            routeName: 'Transaction',
            action: NavigationActions.navigate({ routeName: 'Transaction' }),
            params
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

    _renderItem({ item, index }) {
        const { price_usd, bank_balance, bitcoin_price, bitcoin_balance } = this.state;

        var balance;
        var d;
        var c;
        if (index == 0) {
            balance = (bitcoin_balance + "").split('.');
            d = parseInt(balance[0]);
            c = parseFloat("." + balance[1]).toFixed(6).split('.')[1];
        } else {
            balance = (bank_balance + "").split('.');
            d = this.numberWithCommas(balance[0]);
            c = parseFloat("." + balance[1]).toFixed(2).split('.')[1];
        }
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width,
                    height: height / 2
                }}>
                <Animatable.View animation='fadeInUp' delay={1500} style={{ flex: 1, paddingTop: 64, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={item.image} style={{ width: 128, height: 128 }} />
                    <Text style={{ backgroundColor: 'transparent', color: Colors.text, fontWeight: '400', fontSize: 24, marginVertical: 8 }}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                        <Image source={item.icon} style={{ marginTop: 4, width: 32, height: 32 }} />
                        <Text style={{ backgroundColor: 'transparent', color: Colors.text, fontSize: 64, fontWeight: '700' }}>{d}</Text>
                        <Text style={{ backgroundColor: 'transparent', paddingTop: 8, color: Colors.subtitle, fontSize: 16, fontWeight: '300' }}>.{c}</Text>
                    </View>
                    <Text style={{ backgroundColor: 'transparent', color: Colors.subtitle }}>1 BTC = ${price_usd} USD</Text>
                </Animatable.View>
            </View>
        );
    }

    render() {
        const { bitcoin_id, bank_id } = this.state;
        return (
            <Animatable.View animation='fadeIn' duration={3000} style={{ flex: 1 }}>
                <Image source={require('../assets/bg.png')} style={{ width, height }} >
                    <View style={{ flex: 1 }}>
                        <Carousel
                            data={this.state.entries}
                            renderItem={this._renderItem.bind(this)}
                            onSnapToItem={index => {
                                this.update(bitcoin_id, bank_id);
                                this.setState({ index })
                            }}
                            sliderWidth={width}
                            itemWidth={width} />
                    </View>

                    <View style={{ flex: 1 }}>
                    </View>
                </Image>
                {this.renderActionButton()}
            </Animatable.View>
        )
        return (
            <Animatable.View animation='fadeIn' duration={3000} style={{ flex: 1 }}>
                <StatusBar barStyle='light-content' />
                <LinearGradient colors={[Colors.main, Colors.main, Colors.white]} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Animatable.View animation='fadeInLeft' delay={1500} style={{ alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Image source={require('../assets/bitcoin-sign.png')} style={{ marginTop: 4, marginRight: 4, width: 28, height: 28 }} />
                            <Text style={{ backgroundColor: 'transparent', color: Colors.white, fontSize: 40, fontWeight: '700' }}>123.456</Text>
                            <Text style={{ backgroundColor: 'transparent', paddingTop: 8, color: Colors.white, fontSize: 16, fontWeight: '300' }}>.50</Text>
                        </View>
                        {/* <Image source={require('../assets/cute-bitcoin.png')} style={{width: 64, height: 64}}/> */}
                    </Animatable.View>
                </LinearGradient>
                <LinearGradient colors={[Colors.white, Colors.white]} style={{ flex: 1, alignItems: 'center' }}>
                    <Animatable.View animation='fadeInRight' delay={1500} style={{ marginTop: 40, alignItems: 'center' }}>
                        {/* <Image source={require('../assets/cute-bitcoin.png')} style={{width: 64, height: 64}}/> */}
                        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                            <Image source={require('../assets/dollar-sign.png')} style={{ marginTop: 4, width: 32, height: 32 }} />
                            <Text style={{ backgroundColor: 'transparent', color: Colors.main, fontSize: 40, fontWeight: '700' }}>8372.456</Text>
                            <Text style={{ backgroundColor: 'transparent', paddingTop: 8, color: Colors.main, fontSize: 16, fontWeight: '300' }}>.50</Text>
                        </View>
                    </Animatable.View>
                </LinearGradient>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: Colors.text,
    },
});