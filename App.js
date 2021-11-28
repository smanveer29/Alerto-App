import React, { Component } from 'react'
import { StatusBar, StyleSheet,SafeAreaView  } from 'react-native'
import HomeScreen from './src/Screens/HomeScreen';
import SplashScreen from './src/Screens/SplashScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PushNotification from "react-native-push-notification";
import NotificationDetails from './src/Screens/NotificationDetails';
const Stack = createStackNavigator();


var myrouter = null

const setTopLevelNavigator = (_router_el) => {
  myrouter = _router_el;
}

PushNotification.configure({
  onNotification: function (notification) {
    const { data } = notification
    if (myrouter) 
    {
      myrouter.navigate("Notify")
    } else {
      setTimeout(() => {
        if (myrouter) {
          myrouter.navigate("Home")
        }
      }, 1000)
    }
  }
});


export default class App extends Component {


  constructor(props) {
    super(props)
  }
  render() {
    return (
      <NavigationContainer
        ref={(navigatorRef) => { setTopLevelNavigator(navigatorRef); }}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle='light-content'
          animated={true}
        />
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name="Splash" component={SplashScreen} options={horizontalAnimation} />
          <Stack.Screen name="Home" component={HomeScreen} options={horizontalAnimation} />
          <Stack.Screen name="Notify" component={NotificationDetails} options={horizontalAnimation} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
