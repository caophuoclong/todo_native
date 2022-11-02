import {calculateTimeout} from './calculateTimeout';
import BackgroundTimer from 'react-native-background-timer';
import {PushNoti} from './pushNoti';
import {useTranslation} from 'react-i18next';
import {TaskType} from '~/interfaces';
import {NotifyTask} from './NotifyTask';
import {textToHtml} from './textToHtml';

export const schedulerBackground: (
  timer: number[],
  datetime: number,
  title: string,
  t: any,
  type: TaskType['title'],
  _id: string
) => number[] = (
  timer: number[],
  datetime: number,
  title: string,
  t: any,
  type: TaskType['title'],
  _id: string
) => {
  const backgroundId: number[] = [];
  for (let i = 0; i < timer.length; i++) {
    const x = calculateTimeout(datetime, timer[i] * 60 * 1000);
    if (x > 0) {
      backgroundId.push(
        BackgroundTimer.setTimeout(() => {
          if (timer[i] === 0) {
            // PushNoti({
            //   title: 'Need to do',
            //   body: `${t('MessageNotify')} ${title} ${t('Now')}`,
            // });
            NotifyTask(
              textToHtml(type, t('MessageNotify'), title, t('Now')),
              type,_id
            );
          } else {
            // PushNoti({
            //   title: 'Need to do',
            //   body: `${t('MessageNotify')} ${title} ${t('In')} ${timer[i]} ${t(
            //     'Minutes',
            //   )}`,
            // });
            NotifyTask(
              textToHtml(
                type,
                t('MessageNotify'),
                title,
                t('In'),
                timer[i].toString(),
                t('Minutes'),
              ),
              type,
              _id
            );
          }
        }, x),
      );
    }
  }

  return backgroundId;
};
