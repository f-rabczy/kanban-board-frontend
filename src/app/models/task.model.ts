import {TaskColor} from './task-color.model';

export class UserTask {
  id: string;
  title: string;
  description: string;
  status: string;
  date: string;
  order: number;
  taskColor: TaskColor;
}
