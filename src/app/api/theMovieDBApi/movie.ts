import { THEMOVIEDB_API_KEY, THEMOVIEDB_BASEURL } from "app/constants";
import { MovieModel } from "app/model/movie";
import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "../axiosClient";

export const movie = {
	get : () : Promise<DataResponse<MovieModel[]>> => {
		const url = `/discover/movie?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url,{baseURL:THEMOVIEDB_BASEURL});
	}
};

