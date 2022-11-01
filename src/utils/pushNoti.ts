import { Notifications } from "react-native-notifications";

export const PushNoti = ({title, body}:{
    title?: string
    body?:string
})=>{
    Notifications.postLocalNotification({
            title: title || "Todo",
            body: body || "Something",
            sound: 'chime.aiff',
            badge: 0,
            identifier: 'notificationId',
            payload: 'asd',
            thread: 'asd',
            type: 'local',
    });
}