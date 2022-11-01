import React, {useReducer} from 'react';
import Database from '~/utils/database';
import {IUser, Language, Task, TaskWithBackgroundId} from '../interfaces';
import {TaskType} from '../interfaces/index';
import {Type} from './type';
type Props = {
  children: React.ReactNode;
};

interface initialState {
  active: boolean;
  task: TaskWithBackgroundId;
  tasks: Array<TaskWithBackgroundId>;
  tasksFiltered: Array<TaskWithBackgroundId>;
  taskCompleted: Array<TaskWithBackgroundId>;
  user: IUser;
  lan: Language;
  sortType: 'asc' | 'desc';
}
export const initialLevelNotify: {
  [key in TaskType['title']]: number[];
} = {
  important: [15, 10, 5, 3, 0],
  normal: [5, 3, 0],
  unimportant: [3, 0],
};
const initialValue: initialState = {
  lan: 'vi',
  active: false,
  user: {
    name: '',
    level: initialLevelNotify,
  },
  task: {
    _id: '',
    title: '',
    description: '',
    start: {
      date: null,
      time: null,
    },
    end: {
      date: null,
      time: null,
    },
    isDone: false,
    isAlert: true,
    type: {
      title: 'important',
      name: 'Important',
    },
    backgroundId: [],
  },
  tasks: [],
  tasksFiltered: [],
  taskCompleted: [],
  sortType: 'desc',
};

interface action {
  type: Type;
  payload: any;
}

export const emptyState: initialState = {
  lan: 'vi',
  active: false,
  user: {
    name: '',
    level: initialLevelNotify,
  },
  task: {
    _id: '',
    title: '',
    description: '',
    start: {
      date: null,
      time: null,
    },
    end: {
      date: null,
      time: null,
    },
    isDone: false,
    isAlert: true,
    type: {
      title: 'important',
      name: 'Important',
    },
    backgroundId: [],
  },
  tasks: [],
  tasksFiltered: [],
  taskCompleted: [],
  sortType: 'desc',
};
const reducer = (state: initialState, action: action) => {
  switch (action.type) {
    case Type.UPDATE_LEVEL: {
      const {
        type,
        value,
        index,
      }: {
        type: TaskType;
        value: number;
        index: number;
      } = action.payload;
      const {level} = state.user;
      const newLevel = level[type.title];
      newLevel[index] = value;
      return {
        ...state,
        user: {
          ...state.user,
          level: {
            ...level,
            [type.title]: newLevel,
          },
        },
      };
    }
    case Type.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload),
      };
    case Type.SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    case Type.SET_BACKGROUND_ID: {
      const {_id, data} = action.payload;
      const index = state.tasks.findIndex(item => item._id === _id);
      state.tasks[index].backgroundId = data;
      return {
        ...state,
      };
    }

    case Type.SET_ALERT:
      const {_id, enable} = action.payload;
      const index = state.tasks.findIndex(item => item._id === _id);
      state.tasks[index].isAlert = enable;
      return {
        ...state,
      };
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
      const tasks = [...state.tasks, action.payload];
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
