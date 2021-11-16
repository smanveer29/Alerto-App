import React, { PureComponent } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'
export default class Camera extends PureComponent {
  images = []
  navigation = ''
  url = 'http://192.168.1.40:8000/api/records/insert'
  constructor(props) {
    super(props)
    this.navigation = props.navigation
    this.state =
    {
      count: 0
    }
  }

  takePicture = () => {
    this.captureImage()
  }
  uploadImage = async () => 
  {
    let formdata = new FormData()
    this.images.forEach(item =>{
      formdata.append("photo",{ uri: item.uri , name: 'image.jpg', type: 'image/jpg' })
    })
    // formdata.append('location',)
    console.log({formdata})
    axios.post("http://192.168.1.40:8000/api/records/insert",formdata)
    .then((res) => {
      console.log(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
} 
  captureImage = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      let count = this.state.count

      if (this.images.length < 5) {
        this.setState({
          count: ++count
        })
        this.uploadImage()
        this.images.push({
          uri:data.uri,
          base64:data.base64
        })
        console.log(data.uri)
        console.log(this.images)
      }
      else {
        alert("Limit Exeed")
      }
      console.log(this.state.count)
      console.log(this.images.length)
    }
  }
  send = async () => {
    let data = {
      photo: this.images
    }
    axios.post(this.url, data)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })

  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ alignItems: 'flex-end', margin: 20, padding: 10, opacity: 0.78 }}>
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
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', opacity: 0.78 }}>
          <TouchableOpacity style={styles.capture}>
            {
              this.state.count == 0 ?
                <Icon name="clone" size={20} color="#eee" />
                :
                this.images.forEach((res) => {
                  <View>
                    <Image key={res} source={{ uri: res }} style={styles.img} />
                  </View>
                })
            }
          </TouchableOpacity>
          <TouchableOpacity onPress={this.takePicture} style={styles.capture}>
            <Icon name="circle-thin" size={70} color="#eee" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.capture} onPress={() => this.send()}>
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
    backgroundColor: '#34BE82',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'relative',
  },
  img: {
    width: 50,
    height: 50
  }
});