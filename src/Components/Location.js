import React, { Component } from 'react'
import { Linking } from 'react-native'
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
export default class Location extends Component {
    constructor(props) {
        super(props)
        this.askPermission()
        this.state = {
            location: "",
            isLoadingAdd: false,
            address: ""
        }
    }

    askPermission = async () => 
    {
        check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            .then((res) => {
                switch (res) {
                    case RESULTS.UNAVAILABLE:
                        console.log('This feature is unavailable');
                        break;
                    case RESULTS.DENIED:
                        console.log('User Denied')
                        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                            .then((res) => {
                                console.log(res)
                                if (res == 'denied') {
                                    this.askPermission()
                                }
                                else if (res == 'blocked') 
                                {
                                    Linking.openSettings()
                                }
                                else {
                                    this.getLocation()
                                }
                            })
                        break;
                    case RESULTS.GRANTED:
                        this.getLocation()
                        break;
                    case RESULTS.BLOCKED:
                        Linking.openSettings()
                        break;
                }
            })
            .catch((err) => console.log(err))
    }



    getLocation=async()=>{
        
    }
}

