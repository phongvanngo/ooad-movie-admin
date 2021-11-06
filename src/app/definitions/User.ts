import { AdminRole } from "./Enum";

export interface UserModel {
    name: string;
}

export interface AdministratorModel extends UserModel {
    role:AdminRole;
    token:string;
}