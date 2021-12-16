// import React, { Component } from 'react'
// import { Text, StyleSheet, View, Image } from 'react-native'
// import Colors from '../../Helper/Colors'
// import { api } from '../Components/Api';

// export default class NotificationDetails extends Component {
//     props=null
//     data=null
//     constructor(props)
//     {
//         super(props)
//         this.props=props
//         this.data=this.props.route.params.data
//         console.log("DATAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
//         console.log(this.data)
//         this.getData()
//     }
//     images = [
//         'upload/2021-11-30/VZemX0st0fhxduQn0TTLB2tYtZIxFtctM02AwE7l.jpg'
//     ];
//     url = api+'storage/'

//     getData=()=>{
//         console.log(this.data)
//     }
//     render() {
//         return (
//             <View style={styles.cont}>
//                 <Image source={ {uri: this.url+this.images[0]}} style={{width: 600, height:600}}></Image>
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     cont:{
//         flex:1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor:Colors.primary
//     }
// })
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '../../Helper/Colors'

export default function NotificationDetails(props) {
    console.log(props.route.params.data)
    return (
        <SafeAreaView style={styles.cont}>
            <Text style={{color: 'white'}}>Notification</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cont:{
        flex:1,
        backgroundColor:Colors.primary
    }
})
