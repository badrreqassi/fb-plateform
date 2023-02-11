export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  roles: string[];
  active:boolean;
}
