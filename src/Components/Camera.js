import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from './axios'
import LearnPermission from '../Screens/LearnPermission'
import SelectDropdown from 'react-native-select-dropdown';
import messaging from '@react-native-firebase/messaging';
import Colors from '../../Helper/Colors';
import categories from '../../Helper/CrimeCategory'


export default class Camera extends PureComponent 
{
  images = []
  location_user = null
  lat = ''
  lng = ''
  pincode = ''
  title = ''
  props = null
  navigation = ''
  url = '/records/insert'
  constructor(props) {
    super(props)
    this.props = props
    this.navigation = props.navigation
    this.state =
    {
      count: 0,
      isUploadModal: false
    }
    
  }
  takePicture = () => {
    this.captureImage()
  }
  uploadImage = async () => {
    let formdata = new FormData()
    this.images.forEach((item, index) => {
      formdata.append(`photo[${index}]`, { uri: item.uri, name: 'image.jpg', type: 'image/jpg' })
    })
    formdata.append('title', this.title)
    formdata.append('location', this.location_user)
    formdata.append('latitude', this.lat)
    formdata.append('longitude', this.lng)
    formdata.append('pincode', this.pincode)

    axios.post(this.url, formdata)
      .then((res) => {
        if (res.status) {
          this.props.changeState(false)
          this.props.loading(false)
        }
        else alert('Could not upload');
      })
      .catch((e) => {
        console.log(e.response)
      })
    // postRequest("/records/insert",formdata,this.onSuccess(),this.onError())
  }
  captureImage = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      let count = this.state.count
      if (this.images.length < 5) {
        this.images.push({
          uri: data.uri,
          base64: data.base64
        })

        this.setState({
          count: ++count
        })

        // console.log(this.images)
      }
      else {
        alert("Limit Exeed")
      }
    }
    else {
      alert('Something Went Wrong')
    }
  }

  send = () => {
    this.props.loading(true)
    this.uploadImage()
  }
  locationChanged = (data) => {
    this.location_user = data.street_address
    this.lat = data.latitude
    this.lng = data.longitude
    this.pincode = data.zip_code
  }

  getConfirmCard = () => {
    return (
      <View style={styles.card}>
        <SelectDropdown
          buttonStyle={{
            borderStyle: "solid",
            borderWidth: 1
          }}
          data={categories}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
            this.title = selectedItem
            this.send()
            this.setState({ isUploadModal: false })
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <LearnPermission locationChangedParent={this.locationChanged}></LearnPermission>
        <TouchableOpacity style={{ alignItems: 'flex-end', margin: 20, padding: 10, opacity: 0.78 }} onPress={() => this.props.changeState(false)}>
          <Icon name="close" size={20} color="#eee" />
        </TouchableOpacity>

        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions=
          {{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />

        {this.state.isUploadModal && this.getConfirmCard()}

        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', opacity: 0.78 }}>
          <TouchableOpacity style={styles.capture}>
            {
              this.images.length == 0 ?
                <Icon name="clone" size={20} color="#eee" />
                :
                <View style={styles.img}>
                  <Image source={{ uri: this.images[this.images.length - 1].uri }} style={styles.img} />
                </View>
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Icon name="circle-thin" size={70} color="#eee" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture} onPress={() => {
            this.setState({ isUploadModal: true })
          }}>
            {
              this.state.count == 0 ?
                null
                :
                <View style={styles.sendIcon}>
                  <Text style={{ color: 'white', fontSize: 14, position: 'absolute', bottom: 8, right: 8 }}>{this.state.count}</Text>
                  <Icon name="check" size={24} color="#eee" style={{ position: 'absolute', top: 10 }} />
                </View>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  card: {
    position: 'absolute',
    top:10,
    bottom:0,
    left:0,right:0,
    backgroundColor: 'black',
    height: "100%",
    width: "100%", // (optional)k
    justifyContent: 'center',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  photoPreview: {
    flex: 0.2,
    height: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'grey'
  },
  sendIcon: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.btn,
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
  },
  img: {
    width: 50,
    height: 50
  }
});