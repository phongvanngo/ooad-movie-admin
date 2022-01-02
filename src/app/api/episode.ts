import { Episode } from "app/model/episode";
import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const episodeApi = { 
	getAllByMovie: (id:string): Promise<DataResponse<Episode[]>> => {
		const url = "/episodes?movieId="+id;
		return axiosClient.get(url);
	},
	getById: (id:string): Promise<DataResponse<Episode>> => {
		const url = "/episode?id="+id;
		return axiosClient.get(url);
	},
	
	add: (episode: Partial<Episode>): Promise<DataResponse<Episode>> => {
		const url = "/episode";
		return axiosClient.post(url, episode);
	},
	update: (episode: Partial<Episode>): Promise<DataResponse<Episode>> => {
		const url = "/episode";
		return axiosClient.put(url, episode);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/episode?id="+id;
		return axiosClient.delete(url);
	},
};
