import { User } from "app/model/User";
import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const userApi = {
	getAll: (): Promise<DataResponse<User[]>> => {
		const url = "/users";
		return axiosClient.get(url);
	},
	add: (user: Partial<User>): Promise<DataResponse<User>> => {
		const url = "/user";
		return axiosClient.post(url, user);
	},
	update: (user: Partial<User>): Promise<DataResponse<User>> => {
		const url = "/user";
		return axiosClient.put(url, user);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/user?id=" + id;
		return axiosClient.delete(url);
	},
};
