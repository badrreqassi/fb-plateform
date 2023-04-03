import {Role} from "./Role";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  email: string;
  roles: Role[] | number[];
  adminId? : number
}
