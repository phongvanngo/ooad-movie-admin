import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const genreApi = {
	getAll: (): Promise<DataResponse<Genre[]>> => {
		const url = "/genres";
		return axiosClient.get(url);
	},
	add: (genre: Partial<Genre>): Promise<DataResponse<Genre>> => {
		const url = "/genre";
		return axiosClient.post(url, genre);
	},
	update: (genre: Partial<Genre>): Promise<DataResponse<Genre>> => {
		const url = "/genre";
		return axiosClient.put(url, genre);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/genre?id=" + id;
		return axiosClient.delete(url);
	},
};
