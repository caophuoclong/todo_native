import {TaskType} from '~/interfaces';

export const getTimer = (type: TaskType) => {
  let timer: number[] = [];
  if (type.title === 'important') {
    timer = [10, 5, 3, 0];
  } else if (type.title === 'normal') {
    timer = [5, 3, 0];
  } else {
    timer = [3, 0];
  }
  return timer;
};
