/**
 * @format
 */
import {AppRegistry} from 'react-native' ;
import App from './App' ;
import {name as appName} from './app.json' ;
import messaging from '@react-native-firebase/messaging' ;
import alert_notification from './src/Components/Notifications' ;

messaging().subscribeToTopic('mytopic')
messaging().setBackgroundMessageHandler(async remoteMessage => {
    /**
     * TODO: Send Background Notification here with help of _notification_sender helper method
     */
    alert_notification(remoteMessage);
})
messaging().onMessage(async remoteMessage => 
    {
    /**
     * TODO: Send Active App Notification here with help of _notification_sender helper method
     */
    alert_notification(remoteMessage);
})
AppRegistry.registerComponent(appName, () => App);
