import { calculateTimeout } from "./calculateTimeout";
import BackgroundTimer from 'react-native-background-timer';
import { PushNoti } from "./pushNoti";
import { useTranslation } from "react-i18next";

export const schedulerBackground : (timer: number[], datetime: number, title: string, t:any)=>number[] = (timer: number[], datetime: number, title: string, t: any)=>{
    const backgroundId: number[] = [];
    for (let i = 0; i < timer.length; i++) {
        const x = calculateTimeout(datetime, timer[i] * 60 * 1000);
        if (x > 0) {
          backgroundId.push(
            BackgroundTimer.setTimeout(() => {
              if (timer[i] === 0) {
                PushNoti({
                  title: 'Need to do',
                  body: `${t('MessageNotify')} ${title} ${t('Now')}`,
                });
              } else {
                PushNoti({
                  title: 'Need to do',
                  body: `${t('MessageNotify')} ${title} ${t('In')} ${
                    timer[i]
                  } ${t('Minutes')}`,
                });
              }
            }, x),
          );
        }
      }

    return backgroundId;
}