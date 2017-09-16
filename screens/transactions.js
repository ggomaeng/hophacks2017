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

export default class Transaction extends Component {
    state = {
        data: [
            {
                key: 0,
                title: 'Apple Store',
                date: '03/08/2016',
                price: -299.95
            },
            {
                key: 1,
                title: 'PayPal',
                date: '03/07/2016',
                price: 168.45
            }, 
            {
                key: 2,
                title: 'Apple Store',
                date: '03/08/2016',
                price: -299.95
            },
            {
                key: 3,
                title: 'PayPal',
                date: '03/07/2016',
                price: 168.45
            }
        ]

    }

    render() {
        const { data } = this.state;
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
                            <Text style={{ color: Colors.white, fontSize: 48, fontWeight: '600' }}>
                                <Text style={{ fontSize: 24 }}>$</Text>1,234<Text style={{ fontSize: 24, alignSelf: 'flex-start' }}>.56</Text>
                            </Text></View>
                    )}>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <RowItem item={item} />}
                    />
                </ParallaxScrollView>
            </View>
        )
    }
}