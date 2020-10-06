import {ProjectTask} from './project-task.model';

export class ProjectBoardColumn {
  id: string;
  name: string;
  projectTaskList: ProjectTask[];
}
