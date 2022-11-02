import {date, time} from "~/interfaces"
export const convertToDateTime = (date: date, time: time)=>{
    return new Date(
        date.year,
        date.month,
        date.day,
        time.hour,
        time.minute
    )
}