import React, { Component } from 'react';
import {
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { NavigationActions, withNavigation } from 'react-navigation';

import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

import Colors from '../constants//colors';

import Carousel from 'react-native-snap-carousel';

export default class Intro extends Component {
    static navigationOptions = {
        header: null
    };

    state = {
        index: 0,
        entries: [
            {
                image: require('../assets/bitcoin.png'),
                title: "Easily Access Bitcoin",
                subtitle: "Bank Account & Credit and Debit Cards transactions Made Easy"
            }, {
                image: require('../assets/transfer.png'),
                title: "Money Transfer",
                subtitle: "Bank Account & Credit and Debit Cards transactions Made Easy"
            }, {
                image: require('../assets/chart.png'),
                title: "Price Visualization",
                subtitle: "Bank Account & Credit and Debit Cards transactions Made Easy"
            }
        ]

    }

    _renderItem({ item, index }) {
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width,
                    height: height - 100
                }}>
                <Animatable.Image
                    animation='fadeIn'
                    duration={2000}
                    style={{
                        width: 96,
                        height: 96,
                        marginBottom: 16
                    }}
                    source={item.image} />
                <Animatable.View
                    delay={1000}
                    style={{ alignItems: 'center', justifyContent: 'center' }} animation='fadeInUp' >
                    <Text
                        style={{
                            color: Colors.text,
                            fontSize: 24,
                            fontWeight: '500'
                        }}>{item.title}</Text>
                    <Text
                        style={{
                            color: Colors.subtitle,
                            fontSize: 18,
                            fontWeight: '300',
                            textAlign: 'center',
                            marginHorizontal: 32
                        }}>{item.subtitle}</Text>

                </Animatable.View>
            </View>
        );
    }

    render() {
        const { index } = this.state;

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Login' })],
        });


        return (
            <View style={{
                flex: 1
            }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Carousel
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ index })}
                        sliderWidth={width}
                        itemWidth={width} />
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                    <Text
                        style={{
                            color: Colors.text,
                            fontSize: 36,
                            opacity: index == 0
                                ? 1
                                : 0.7,
                            textAlign: 'center'
                        }}>
                        .
                    </Text>
                    <Text
                        style={{
                            color: Colors.text,
                            fontSize: 36,
                            opacity: index == 1
                                ? 1
                                : 0.7,
                            textAlign: 'center'
                        }}>
                        .
                    </Text>
                    <Text
                        style={{
                            color: Colors.text,
                            fontSize: 36,
                            opacity: index == 2
                                ? 1
                                : 0.7,
                            textAlign: 'center'
                        }}>
                        .
                    </Text>
                </View>

                <View>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.dispatch(resetAction)}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Colors.main,
                            margin: 40,
                            padding: 20,
                            borderRadius: 50
                        }}>
                        <Text
                            style={{
                                color: Colors.white,
                                fontWeight: '400'
                            }}>GET STARTED</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}