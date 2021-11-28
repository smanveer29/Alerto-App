import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Colors from '../../Helper/Colors'

export default class NotificationDetails extends Component {
    render() {
        return (
            <View style={styles.cont}>
                <Text>Notification ala page</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    cont:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:Colors.primary
    }
})
