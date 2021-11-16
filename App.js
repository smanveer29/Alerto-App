import React, { Component } from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import HomeScreen from './src/Screens/HomeScreen';
import SplashScreen from './src/Screens/SplashScreen';
import LearnPermission from './src/Screens/LearnPermission';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from './src/Components/Onboarding';
import Camera from './src/Components/Camera';
const Stack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <NavigationContainer>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle='dark-content'
          animated={true}
        />
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="LearnPermission" component={LearnPermission} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
