import { UserBoardColumn } from './board-column.model';

export class UserBoard {
  id: string;
  public name: string;
  public columns: UserBoardColumn[];
}
