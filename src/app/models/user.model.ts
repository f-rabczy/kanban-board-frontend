import {ProfilePicture} from './profile-picture';

export class User {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName:string;
  hasProfilePicture:boolean;
  profilePicture: ProfilePicture;
}
