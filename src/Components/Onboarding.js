import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import HomeScreen from '../Screens/HomeScreen';
import Slides from './Slides';

export default class Onboarding extends Component {

    constructor(props) {
        super(props)
        this.state = 
        {
            showRealApp: false
        }
    }
    _renderItem = ({ item }) => 
    {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.img} />
                <View style={{ flex: 0.4, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.title}>{item.title}</Text>
                </View>
            </View>
        );
    }

    _onDone = () => 
    {
        this.setState({ showRealApp: true });
    }

    render() {
        if (this.state.showRealApp) {
            return <HomeScreen/>;
        }
        else {
            return (
                <AppIntroSlider renderItem={this._renderItem} data={Slides} onDone={this._onDone} />
            )
        }
    }
}
const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#204969'
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '900',
        textAlign: 'center',
        fontFamily: 'monospace',
        margin: 20,
    },
    img: {
        width: "70%",
        height: '40%',
        borderRadius: 200,
        resizeMode: 'contain'
    }
})