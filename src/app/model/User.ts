import { AdminRole } from "../definitions/Enum";

export interface AdminModel {
    role:AdminRole;
    token:string;
}

export interface User {
    id:string;
    username:string;
    fullname:string;
    role:string;
}