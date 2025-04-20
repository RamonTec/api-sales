import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const AuthRoles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

export interface IUser {
  id: string
  email: string;
  fullName: string;
  role: string;
}

export interface IUserCreated {
  user: IUser;
}

export type UserPayloadType = IUser;