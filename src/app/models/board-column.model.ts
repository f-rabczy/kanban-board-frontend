import { UserTask } from './task.model';

export class UserBoardColumn {
  id: string;
  public name: string;
  public userTaskList: UserTask[];
}
