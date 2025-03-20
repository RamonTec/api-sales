export class UserDTO {
    id: string;
    name: string;
    lastName:string;
    role: string;
    email:string;
    avatar:string;
}

export enum RolesEnum{
    ADMIN = 'ADMIN',
    USER = 'USER'
}

export interface IUserData {
  id: string;
  name: string;
  lastName:string;
  role: string;
  email:string;
  avatar:string;
  password: string;
}

export type CreateModeratorDto = Omit<IUserData, 'role'>

export interface UserData {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface ResponseData<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }