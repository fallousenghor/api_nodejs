import { Tache } from "./Tache";

export interface CreateUserDto {
  email: string;
  name?: string | null;
  password: string;
}
export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
}
export interface User extends CreateUserDto {
  id: number;
  dateCreation: Date;
  dateUpdate: Date;
  taches?: Tache[];
}