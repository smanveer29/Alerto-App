import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import LottieView from 'lottie-react-native';
export default class Loading extends Component {
    props=null
    constructor(props) {
        super(props)
        this.props=props
    }
    render() {
        return (
            <View style={styles.loadingView}>
            {this.props.type ==='loading' && 
            <LottieView source={require('../Assets/Animation/loader.json')} autoPlay
                     style={{ zIndex: 99 ,width:'45%',height:'45%',alignItems: 'center', justifyContent: 'center'}}
                />
            }

            {this.props.type=== 'uploading' && 
            <LottieView source={require('../Assets/Animation/uploading.json')} autoPlay
                     style={{ zIndex: 99 ,width:'45%',height:'45%',alignItems: 'center', justifyContent: 'center'}}
                />}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadingView:
    {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.2)',
        height: "100%",
        width: "100%",
        zIndex: 1000,
        alignItems: 'center',
        justifyContent: 'center',
    },
})
