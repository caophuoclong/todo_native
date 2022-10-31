import React, {useReducer} from 'react';
import Database from '~/utils/database';
import {IUser, Language, Task} from '../interfaces';
import {TaskType} from '../interfaces/index';

type Props = {
  children: React.ReactNode;
};

interface initialState {
  active: boolean;
  task: Task;
  tasks: Array<Task>;
  tasksFiltered: Array<Task>;
  taskCompleted: Array<Task>;
  user: IUser;
  lan: Language;
}
const initialValue: initialState = {
  lan: 'vi',
  active: false,
  user: {
    name: '',
  },
  task: {
    _id: '',
    title: '',
    description: '',
    start: {
      date: '',
      time: '',
    },
    end: {
      date: '',
      time: '',
    },
    isDone: false,
    isAlert: true,
    type: {
      title: 'important',
      name: 'Important',
    },
  },
  tasks: [],
  tasksFiltered: [],
  taskCompleted: [],
};
export enum Type {
  SET_ACTIVE = 'SET_ACTIVE',
  SET_TASK = 'SET_TASK',
  ADD_TASK = 'ADD_TASK',
  SET_TASK_FILTER = 'SET_TASK_FILTER',
  SET_DONE = 'SET_DONE',
  SET_TASK_COMPLETED = 'SET_TASK_COMPLETED',
  SET_NO_DONE = 'SET_NO_DONE',
  SET_USER = 'SET_USER',
  SET_TASKS = 'SET_TASKS',
  SET_EMPTY_TASKS = 'SET_EMPTY_TASKS',
  CLEAR_DATA = 'CLEAR_DATA',
  SET_LAN = 'SET_LAN',
}

interface action {
  type: Type;
  payload: any;
}
export const emptyState: initialState = {
  lan: 'vi',
  active: false,
  user: {
    name: '',
  },
  task: {
    _id: '',
    title: '',
    description: '',
    start: {
      date: '',
      time: '',
    },
    end: {
      date: '',
      time: '',
    },
    isDone: false,
    isAlert: true,
    type: {
      title: 'important',
      name: 'Important',
    },
  },
  tasks: [],
  tasksFiltered: [],
  taskCompleted: [],
};
const reducer = (state: initialState, action: action) => {
  switch (action.type) {
    case Type.SET_LAN:
      return {
        ...state,
        lan: action.payload,
      };
    case Type.CLEAR_DATA:
      return emptyState;
    case Type.SET_EMPTY_TASKS:
      return {
        ...state,
        tasks: [],
      };
    case Type.SET_ACTIVE:
      return {
        ...state,
        active: action.payload,
      };
    case Type.SET_TASK:
      return {
        ...state,
        task: {
          ...state.task,
          ...action.payload,
        },
      };
    case Type.SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case Type.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case Type.ADD_TASK:
      const tasks = [...state.tasks, state.task];
      return {
        ...state,
        tasks,
      };
    case Type.SET_TASK_FILTER:
      return {
        ...state,
        tasksFiltered: action.payload,
      };
    case Type.SET_TASK_COMPLETED:
      return {
        ...state,
        taskCompleted: action.payload,
      };
    case Type.SET_DONE:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task._id === action.payload) {
            return {
              ...task,
              isDone: true,
            };
          }
          return task;
        }),
      };
    case Type.SET_NO_DONE:
      return {
        ...state,
        tasks: state.tasks.map(task => {
          if (task._id === action.payload) {
            return {
              ...task,
              isDone: false,
            };
          }
          return task;
        }),
      };
    default:
      return state;
  }
};
export const AppContext = React.createContext<{
  state: initialState;
  dispatch: React.Dispatch<action>;
}>({
  state: initialValue,
  dispatch: () => {},
});

export const ContextProvider: React.FC<Props> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};
