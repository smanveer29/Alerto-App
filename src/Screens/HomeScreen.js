import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import Camera from '../Components/Camera'
import Icon from 'react-native-vector-icons/FontAwesome';
import LearnPermission from './LearnPermission';

export default class HomeScreen extends Component {
    navigation = ''
    constructor(props) {
        super(props)
        this.state = {
            cameraVisible: false
        }
        this.navigation = props.navigation
        this.getLocation()
    }
    getLocation=()=>{
       return <LearnPermission/>
    }
    change = () => {
        this.setState({ cameraVisible: !this.state.cameraVisible })
    }
    render() {

        return (
            <View style={styles.cont}>
                {this.state.cameraVisible ?
                    <View style={styles.cameraView}>
                        <Camera/>
                    </View>
                    :
                    <TouchableOpacity style={styles.btn} onPress={() => this.change()}>
                        <Text style={{ color: 'white' }}>Add Photo</Text>
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn:
    {
        width: '70%',
        height: 50,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center'
    },
    preview: {
        flex: 0.2,
        height:50,
        alignItems:'center',
        justifyContent:'flex-end',
        backgroundColor:'grey'
    },
    cameraView: {
        flex: 1,
        justifyContent:'space-between'
    },
    camera:{
        flex: 0.8,
        width: '100%',
        height: '70%',
    },
})
