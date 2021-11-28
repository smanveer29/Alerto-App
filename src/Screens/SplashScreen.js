import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Onboarding from '../Components/Onboarding'
import LottieView from 'lottie-react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

export default class SplashScreen extends Component {
    navigation=''
    constructor(props)
    {
        super(props)
        this.navigation=props.navigation 
        this.state={
            tap:true
        }
        this.check()
    }
    go=()=>{this.navigation.replace('Home')}
    check=async () =>{
        let get=await EncryptedStorage.getItem('load')
        if(get!=null)
        {
            let data = JSON.parse(get)
            this.setState({tap:data.onBoarding})
        }
    }
    render() 
    {
        return (
            <>
            {this.state.tap ? <Onboarding/>
            :

            <LottieView source={require('../Assets/Animation/splash.json')} autoPlay 
                loop={false}
                onAnimationFinish={this.go}
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
