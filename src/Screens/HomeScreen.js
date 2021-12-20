import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedbackBase, ActivityIndicator } from 'react-native'
import Camera from '../Components/Camera'
import LearnPermission from './LearnPermission';
import Loading from '../Components/Loading';
import Chart from '../Components/Chart';
import Colors from '../../Helper/Colors';
import SelectDropdown from 'react-native-select-dropdown';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from '../Components/axios';
import { SafeAreaView } from 'react-native-safe-area-context';


let locations = []
export default class HomeScreen extends Component {
    navigation = ''
    constructor(props) {
        super(props)
        this.state = {
            cameraVisible: false,
            location_user: null,
            pincode: '',
            isLoading: true,
            tap: 0,
            customLocation: '',
        }
        this.navigation = props.navigation
        this.getLocations()
    }
    getLocations = async () => {
        axios.get('/area/list')
            .then((res) => {
                locations = res.data.list
            })
            .catch((err) => {
                alert(err.message)
                console.log(err)
            })
    }
    locationAddress = (data) => {
        this.setState({
            location_user: data.street_address,
            pincode: data.zip_code,
            isLoading: false
        })
    }
    change = (val) => {
        this.setState({ cameraVisible: val })
        this.navigation.replace("Home")
    }
    loading = (val) => {
        this.setState({ isLoading: val })
    }
    render() {

        return (
            <SafeAreaView style={styles.cont}>
                <LearnPermission locationChangedParent={this.locationAddress} />
                {
                    this.state.isLoading ? <Loading type='loading' />
                        :
                        <>
                            {this.state.cameraVisible ?
                                <View style={styles.cameraView}>
                                    <Camera changeState={this.change} loading={this.loading} />
                                </View>
                                :
                                <View style={{ width: '100%', height: '100%' }}>
                                    <View style={styles.barChart}>
                                        {this.state.tap === 0 &&
                                            <Chart data={this.state.pincode} type='current' />}
                                        {this.state.tap === 1 &&
                                            <Chart data={this.state.customLocation} type='custom' />
                                        }
                                    </View>
                                    <View style={styles.bottomView}>
                                        <View>
                                            <TouchableOpacity style={this.state.tap === 0 ? styles.addressViewActive : styles.addressView}
                                                onPress={() => { this.setState({ tap: 0 }) }}>
                                                <Text style={this.state.tap === 0 ? styles.addTextActive : styles.addText}>Current Location:</Text>
                                                <Text style={{ width: '50%', fontSize: 12, color: this.state.tap === 0 ? '#fff' : '#000' }}>{this.state.location_user}</Text>
                                            </TouchableOpacity>
                                            {/* Serach Custom location Crime Rate */}
                                            <TouchableOpacity style={this.state.tap === 1 ? styles.addressViewActive : styles.addressView} onPress={() => { this.setState({ tap: 0 }) }}>
                                                {this.state.tap === 0 && <Icon name="search" size={20} color="#000" />}
                                                <SelectDropdown
                                                    defaultButtonText="Search By Location"
                                                    buttonTextStyle={
                                                        this.state.tap === 0 ?
                                                            { fontSize: 17, fontWeight: 'bold' }
                                                            :
                                                            { fontSize: 17, fontWeight: 'bold', color: 'white' }
                                                    }
                                                    buttonStyle={
                                                        this.state.tap === 0 ?
                                                            { backgroundColor: '#eee' }
                                                            :
                                                            { backgroundColor: Colors.btn }
                                                    }
                                                    buttonTextAfterSelection={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}
                                                    data={locations}
                                                    onSelect={(selectedItem, index) => {
                                                        this.setState({
                                                            customLocation: selectedItem,
                                                        })
                                                        this.setState({ tap: 1 });
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
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.btnView}>
                                            <Button mode="contained" onPress={() => {
                                                const cameraShow = this.state.cameraVisible
                                                this.setState({ cameraVisible: !cameraShow })
                                            }}
                                            style={{width:60,height:60,borderRadius:100,backgroundColor: Colors.btn ,alignItems: 'center', justifyContent: 'center'}}>
                                            <Icon name="plus" size={20} color="#eee" />
                                            </Button>
                                        </View>
                                    </View>
                                </View>
                            }
                        </>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: Colors.primary,
        zIndex: -1
    },
    barChart: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    btnView:
    {
        width: '100%',
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cameraView:
    {
        flex: 1,
        justifyContent: 'space-between'
    },
    bottomView:
    {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#eee',
    },
    addText: {
        fontSize: 17,
        color: '#000',
        fontWeight: 'bold'
    },
    addTextActive: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold'
    },
    addressView: {
        width: '80%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        borderColor: Colors.btn,
        borderWidth: 0,
        margin: 7,
        elevation: 10,
        backgroundColor: '#eee'
    },
    addressViewActive: {
        width: '80%',
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        borderWidth: 0,
        margin: 7,
        elevation: 10,
        backgroundColor: Colors.btn
    }
})
