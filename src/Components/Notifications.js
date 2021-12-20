import PushNotification , {Importance} from "react-native-push-notification";
import Colors from "../../Helper/Colors";

const alert_notification = ( _n_data ) => 
{
        const message =  JSON.parse(_n_data.data.data)
        console.log('Notification Object received',message)
        PushNotification.createChannel(
            {
            channelId: "alerto", // (required)
            channelName: "Alert_Notification", // (required)
            channelDescription: "Alerto Notification", // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) 
        );
        
        PushNotification.localNotification(
            {
            /* Android Only Properties */
            channelId: "alerto", // (required) channelId, if the channel doesn't exist, notification will not trigger.
            ticker: message.title , // 
            showWhen: true, // (optional) default: true
            autoCancel: true, // (optional) default: true
            largeIcon: "ic_launcher", 
            data: message.photos,// (optional) default: "ic_launcher". Use "" for no large icon.
            // largeIconUrl: "https://assets.materialup.com/uploads/bafac3b3-476a-4a65-ab1f-5e4568e506db/teaser.png", // (optional) default: undefined
            smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
            bigText:message.message, // (optional) default: "message" prop
            // bigPictureUrl: "https://assets.materialup.com/uploads/bafac3b3-476a-4a65-ab1f-5e4568e506db/teaser.png", // (optional) default: undefined
            // bigLargeIcon: "https://assets.materialup.com/uploads/bafac3b3-476a-4a65-ab1f-5e4568e506db/teaser.png", // (optional) default: undefined
            // bigLargeIconUrl: "https://assets.materialup.com/uploads/bafac3b3-476a-4a65-ab1f-5e4568e506db/teaser.png", // (optional) default: undefined
            color: Colors.btn, // (optional) default: system default
            vibrate: true, // (optional) default: true
            vibration: 10000, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
            tag: "some_tag", // (optional) add tag to message
            group: "group", // (optional) add group to message
            groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
            ongoing: false, // (optional) set whether this is an "ongoing" notification
            priority: "high", // (optional) set notification priority, default: high
            visibility: "public", // (optional) set notification visibility, default: private
            ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
            shortcutId: "shortcut-id", // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
            onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false
            when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
            usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
            timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null
            // actions: ["Yes", "No"], // (Android only) See the doc for notification actions to know more
            invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

            /* iOS only properties */
            category: "", // (optional) default: empty string
            /* iOS and Android properties */
            id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
            title: message.title, // (optional)
            message: message.message, // (required)
            userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
            playSound: true, // (optional) default: true
            soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
            number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
            // repeatType: "day", // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
        });
}

export default alert_notification;