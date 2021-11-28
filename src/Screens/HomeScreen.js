import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TouchableWithoutFeedbackBase, ActivityIndicator, SafeAreaView } from 'react-native'
import Camera from '../Components/Camera'
import LearnPermission from './LearnPermission';
import Loading from '../Components/Loading';
import Chart from '../Components/Chart';
import Colors from '../../Helper/Colors';
import SelectDropdown from 'react-native-select-dropdown';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';


const locations = ['Ludhiana', 'Ludhiana', 'Ludhiana', 'Ludhiana', 'Ludhiana', 'Ludhiana', 'Ludhiana', 'Ludhiana']
export default class HomeScreen extends Component {
    navigation = ''

    constructor(props) {
        super(props)
        this.state = {
            cameraVisible: false,
            location_user: null,
            pincode: '',
            isLoading: true,
            tap: 0
        }
        this.navigation = props.navigation
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
                {
                    this.state.isLoading && <Loading type='loading' />
                }
                <LearnPermission locationChangedParent={this.locationAddress} />
                {this.state.cameraVisible ?
                    <View style={styles.cameraView}>
                        <Camera changeState={this.change} loading={this.loading} />
                    </View>
                    :
                    <View style={{ width: '100%', height: '100%'}}>
                        <View style={styles.barChart}>
                            {this.state.tap === 0 ?
                                <Chart pincode={this.state.pincode} />
                                :
                                <Chart location={this.state.location_user} />
                            }
                        </View>
                        <View style={styles.bottomView}>
                            <TouchableOpacity style={styles.addressView} onPress={() => this.setState({ tap: 0 })}>
                                <Text style={{ fontSize: 17, color: '#000', fontWeight: 'bold' }}>Current Location:</Text>
                                <Text style={{ width: '50%', fontSize: 12, color: '#000' }}>{this.state.location_user}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.addressView} onPress={() => this.setState({ tap: 1 })}>
                                <Icon name="search" size={20} color="#000" />
                                <SelectDropdown
                                    defaultButtonText="Search By Location"
                                    buttonTextStyle={{ fontSize: 17, fontWeight: 'bold' }}
                                    data={locations}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index)
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
                            <Button icon="plus" contentStyle={{backgroundColor:Colors.btn}} mode="contained" onPress={() => {
                                const cameraShow = this.state.cameraVisible
                                this.setState({ cameraVisible: !cameraShow })
                            }}>
                                Add Photo
                            </Button>
                        </View>
                    </View>
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
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom:30
    },
    cameraView:
    {
        flex: 1,
        justifyContent: 'space-between'
    },
    bottomView:
    {
        flex: 0.8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        elevation: 5
    },
    addressView: {
        width: '80%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 10,
        borderColor: Colors.btn,
        borderWidth: 2,
        margin: 7
    }
})
