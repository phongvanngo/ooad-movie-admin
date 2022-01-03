import { THEMOVIEDB_API_KEY, THEMOVIEDB_BASEURL } from "app/constants";
import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
import { Credits, Person } from "app/model/person";
import { MovieSearchParams } from "app/redux/movie/movieSlice";
import axiosClient from "../axiosClient";

export interface TheMovieDB_GenrePayload {
    genres: Genre[];
}

export const person = {
	getCreditsByMovie: (movieId:string): Promise<Credits> => {
		const url = `/movie/${movieId}/credits?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getPersonById: (id:string): Promise<Person> => {
		const url = `/person/${id}?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getPersonPopular: (): Promise<DataResponse<Person[]>> => {
		const url = `/person/popular?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
};
