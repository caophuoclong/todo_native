import {TaskType} from '~/interfaces';
import {colorPerType} from './NotifyTask';
export const textToHtml = (type: TaskType['title'], ...xxx: string[]) => {
  return `
    ${xxx[0]}<span style="color: ${colorPerType[type]}">${xxx[1]}</span> ${xxx[2]} ${
    xxx[3] || ''
  } ${xxx[4] || ''}
    `;
};
