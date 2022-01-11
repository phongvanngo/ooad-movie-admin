import { THEMOVIEDB_API_KEY, THEMOVIEDB_BASEURL } from "app/constants";
import { MovieModel } from "app/model/movie";
import { DataResponse, PaginationParams } from "app/model/PayloadResponse";
import { MovieSearchParams } from "app/redux/movie/movieSlice";
import axiosClient from "../axiosClient";
import queryString from "query-string";
import { VidoesOfMovie } from "app/model/video";

export const movie = {
	get: (params: MovieSearchParams): Promise<DataResponse<MovieModel[]>> => {
		const url = `/discover/movie?api_key=${THEMOVIEDB_API_KEY}&${queryString.stringify(
			params,
		)}`;
		
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getById: (id: string): Promise<MovieModel> => {
		const url = `/movie/${id}?api_key=${THEMOVIEDB_API_KEY}`;
		
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	
	searchByName: (
		params: MovieSearchParams,
	): Promise<DataResponse<MovieModel[]>> => {
		const url = `/search/movie?api_key=${THEMOVIEDB_API_KEY}&${queryString.stringify(
			params,
		)}`;
		
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getVideosOfMovie:(id:string): Promise<VidoesOfMovie> => {
		const url = `/movie/${id}/videos?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	}
};

