import { THEMOVIEDB_API_KEY, THEMOVIEDB_BASEURL } from "app/constants";
import { MovieModel } from "app/model/movie";
import axiosClient from "../axiosClient";

export const theMovieDBApi = {
	get : () : Promise<MovieModel> => {
		const url = `/discover/movie?apiKey=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url,{baseURL:THEMOVIEDB_BASEURL});
	}
};

