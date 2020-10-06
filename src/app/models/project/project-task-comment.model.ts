import {User} from '../user.model';
import {ProjectTaskCommentReply} from './project-task-comment-reply.model';

export class ProjectTaskComment {
  id: string;
  content: string;
  author: User;
  date: string;
  replies: ProjectTaskCommentReply[];
}
