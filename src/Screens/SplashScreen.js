import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Onboarding from '../Components/Onboarding'
import LottieView from 'lottie-react-native';

export default class SplashScreen extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            animationFinish:false
        }
    }
    render() {
        return (
            <>
            {
                this.state.animationFinish?
                <Onboarding/>
                :
            <LottieView source={require('../Assets/Animation/anonymous.json')} autoPlay 
                loop={false}
                onAnimationFinish={()=>this.setState({animationFinish:true})}
            />
            }
            </>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
