import {User} from '../user.model';
import {ProjectBoard} from './project-board.model';

export class Project{
  id:string;
  name: string;
  users: User[];
  creator: User;
  date: string;
  board: ProjectBoard;
}
