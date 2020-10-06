import {ProjectTask} from '../models/project/project-task.model';

export interface EditProjectTaskDataInterface {
  task: ProjectTask;
  projectID: string;
}
