export type NavigationParamsList ={
    Home: undefined,
    Todo: undefined,
    Splash: undefined,
    Setting: undefined,
}
export type TabNavigationParamsList = {
    Home1: undefined,

}
export type TaskType = {
    title: "important" | "normal" | "unimportant",
    name: string
}
export interface Task {
    _id: string;
  title: string,
  description?: string,
  start:{
    date: string,
    time: string,
  },
  end: {
    date: string,
    time: string,
  }
  type: TaskType,
    isDone: boolean,
    isAlert: boolean,
}
export interface IUser {
    _id?:string;
    name: string;

}