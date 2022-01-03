import { THEMOVIEDB_API_KEY, THEMOVIEDB_BASEURL } from "app/constants";
import { Genre } from "app/model/genre";
import axiosClient from "../axiosClient";

export interface TheMovieDB_GenrePayload {
	genres: Genre[];
}

export const genre = {
	getAll: (): Promise<TheMovieDB_GenrePayload> => {
		const url = `/genre/movie/list?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getAllTVGenres: (): Promise<TheMovieDB_GenrePayload> => {
		const url = `/genre/tv/list?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
};
