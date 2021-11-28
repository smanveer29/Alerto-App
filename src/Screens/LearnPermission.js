import React, { Component } from 'react'
import { Linking, View, Text } from 'react-native';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import axios from 'axios';
const key = 'AIzaSyCJm9E2MLohppikxhZAF0Is1weP5y3bO8A'

export default class LearnPermission extends Component {
  props = null
  isLoadingAdd = false
  constructor(props) {
    super(props)
    this.props = props
    this.askPermission()
  }
  askPermission = async () => {
    check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then((result) => 
      {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log('This feature is not available (on this device / in this context)');
            break;
          case RESULTS.DENIED:
            console.log("Invoked first time")
            request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
              .then((result) => {
                console.log(result)
                if (result == "denied") {
                  this.askPermission()
                }
                else if (result == "blocked") {
                  Linking.openSettings()
                }
                else {
                  this.fetchLocation()
                }
              })
            break;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            break;
          case RESULTS.GRANTED:
            this.fetchLocation()
            break;
          case RESULTS.BLOCKED:
            Linking.openSettings()
            break;
        }

      })
  }

  fetchLocation = async () => {
    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
      interval: 10000,
      fastInterval: 5000,
    })
      .then((data) => {
        this.getLocationStart()
      })
      .catch((err) => {
        console.log(err)
      });
  }

  getLocationStart = async () => {
    if (this.isLoadingAdd == false) {
      this.getCurrentLocation()
      this.getSubLocation()
    }
  }


  convertLatLongToAddress = async (lat, lng) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${key}`
    axios.get(url)
      .then((res) => {
        let address = res.data.results
        this.getAddressObject(address)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  getAddressObject = (results) => {
    let address = {
      street_address: "",
      city: "",
      zip_code: "",
      latitude: '',
      longitude: ''
    }
    if (results[0]) {
      for (j = 0; j < results[0].address_components.length; j++) {
        if (results[0].address_components[j].types[0] == 'postal_code') {
          const zip_code = results[0].address_components[j].short_name
          address.zip_code = zip_code
        }
        if (results[0].address_components[j].types[0] == 'administrative_area_level_2') {
          const city = results[0].address_components[j].short_name
          address.city = city
        }
      }
      address.street_address = results[0].formatted_address
      address.latitude = results[0].geometry.location.lat
      address.longitude = results[0].geometry.location.lng
    }
    this.isLoadingAdd
    // this.setState({
    //   isLoadingAdd:true,
    //   address:address
    // })

    this.props.locationChangedParent(address)

  }

  getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (data) => {
        if (data?.coords?.latitude && data?.coords?.longitude) {
          this.convertLatLongToAddress(data?.coords?.latitude, data?.coords?.longitude)
          const location = data?.coords?.latitude + " " + data?.coords?.longitude
          //  this.setState({
          //     location: location
          //  })
        }

      },
      (err) => {

      },
      {
        enableHighAccuracy: false,
        timeout: 10 * 1000,
        maximumAge: 10 * 1000,
      })
  }

  getSubLocation = async () => {
    Geolocation.watchPosition(
      (data) => {

        if (data?.coords?.latitude && data?.coords?.longitude) {
          this.convertLatLongToAddress(data?.coords?.latitude, data?.coords?.longitude)
          const location = data?.coords?.latitude + " " + data?.coords?.longitude
          //  this.setState({
          //     location: location
          //  })
        }
      },
      (err) => {

      },
      {
        enableHighAccuracy: false,
        timeout: 10 * 1000,
        maximumAge: 10 * 1000,
      })
  }

  render() {
    return null
  }
}
