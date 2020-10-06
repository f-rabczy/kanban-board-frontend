import {User} from '../user.model';

export class ProjectTaskCommentReply {
  id: string;
  content: string;
  author: User;
  date: string;
}
