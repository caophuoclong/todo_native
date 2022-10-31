import {IUser, Task} from '~/interfaces';
import {emptyState, Type} from '..';
import {Language} from '../../interfaces/index';

export const setLan = (lan: Language) => {
  return {
    type: Type.SET_LAN,
    payload: lan,
  };
};
export const clearData = () => {
  return {
    type: Type.CLEAR_DATA,
    payload: null,
  };
};

export const setTasks = (tasks: Array<Task>) => {
  return {
    type: Type.SET_TASKS,
    payload: tasks,
  };
};
export const setNoDone = (_id: string) => {
  return {
    type: Type.SET_NO_DONE,
    payload: _id,
  };
};
export const setDone = (_id: string) => {
  return {
    type: Type.SET_DONE,
    payload: _id,
  };
};
export const setTaskFilter = (tasks: Array<Task>) => {
  return {
    type: Type.SET_TASK_FILTER,
    payload: tasks,
  };
};
export const setTaskCompleted = (tasks: Array<Task>) => {
  return {
    type: Type.SET_TASK_COMPLETED,
    payload: tasks,
  };
};
export const addTask = () => {
  return {
    type: Type.ADD_TASK,
    payload: null,
  };
};
export const setUser = (user: Partial<IUser>) => {
  return {
    type: Type.SET_USER,
    payload: user,
  };
};
export const setTask = (task: Partial<Task>) => {
  return {
    type: Type.SET_TASK,
    payload: task,
  };
};
export const setEmptyTasks = () => {
  return {
    type: Type.SET_EMPTY_TASKS,
    payload: null,
  };
};
export const setEmptyTask = () => {
  return {
    type: Type.SET_TASK,
    payload: emptyState.task,
  };
};
export const setActive = (value: boolean) => {
  return {
    type: Type.SET_ACTIVE,
    payload: value,
  };
};
