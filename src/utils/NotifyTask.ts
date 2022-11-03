import notifee, {AndroidImportance} from '@notifee/react-native';
import i18n from '~/i18n';
import {TaskType} from '~/interfaces';
import {capitalizeFirstLetter} from './capitalizeFirstLetter';
export const colorPerType: {
  [key in TaskType['title']]: string;
} = {
  important: '#FF0000',
  normal: '#00BFFF',
  unimportant: '#808080',
};
export const levelPerType: {
  [key in TaskType['title']]: AndroidImportance | undefined;
} = {
  important: AndroidImportance.HIGH,
  normal: AndroidImportance.DEFAULT,
  unimportant: AndroidImportance.LOW,
};
export const NotifyTask = async (
  body: string,
  type: TaskType['title'],
  _id: string,
) => {
  const {t} = i18n;
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: type,
    // first char must be an upper letter
    name: `${capitalizeFirstLetter(type)} Channel`,
    importance: levelPerType[type],
  });
  // Display a notification
  notifee.displayNotification({
    title: `<p style="color: ${colorPerType[type]}">
    <b>${capitalizeFirstLetter(
      type,
    )}</b>
    </p>`,
    body: body,
    android: {
      smallIcon: 'notification_icon',
      channelId,
      color: '#4caf50',
      actions: [
        {
          title: `<b>${t("ViewTask")}</b>`,
              pressAction: {
                id: `viewTask_${_id}`,
                launchActivity: 'default',
            },
        },
        {
          title: `<b>${t("DoneTask")}</b>`,
          pressAction: {id: `makeDone_${_id}`},
        },
      ],
    },
  });
};
