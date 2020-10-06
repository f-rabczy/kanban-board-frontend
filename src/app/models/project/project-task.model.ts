import {TaskColor} from '../task-color.model';
import {User} from '../user.model';

export class ProjectTask {
  id: string;
  title: string;
  description: string;
  date: string;
  status: string;
  taskColor: TaskColor;
  creator: User;
  order: number;
  deadline: string;
}
