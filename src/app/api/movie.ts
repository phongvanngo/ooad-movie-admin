import { MovieModel, MovieModelCamelCase, MovieModelMapPattern } from "app/model/movie";
import { DataResponse } from "app/model/PayloadResponse";
import { MapVariable } from "app/utils/mapVariable";
import axiosClient from "./axiosClient";

export const movieApi = {
	getAll: (): Promise<DataResponse<MovieModel[]>> => {
		const url = "/movies";
		return axiosClient.get(url);
	},
	getById: (id: string): Promise<DataResponse<MovieModel>> => {
		const url = "/movie?id="+id;
		return axiosClient.get(url);
	},
	add: (movie: Partial<MovieModel>): Promise<DataResponse<MovieModel>> => {
		const url = "/movie";
		const newMovie = MapVariable(movie,MovieModelMapPattern);
		return axiosClient.post(url, newMovie);
	},
	update: (movie: Partial<MovieModel>): Promise<DataResponse<MovieModel>> => {
		const url = "/movie";
		return axiosClient.put(url, movie);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/movie?id="+id;
		return axiosClient.delete(url);
	},
};
