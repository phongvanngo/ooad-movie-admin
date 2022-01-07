import { THEMOVIEDB_API_KEY, THEMOVIEDB_BASEURL } from "app/constants";
import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
import { Credits, Person } from "app/model/person";
import { PersonSearchParams } from "app/redux/person/personSlice";
import axiosClient from "../axiosClient";

export interface ThePersonDB_GenrePayload {
    genres: Genre[];
}

export const person = {
	getCreditsByPerson: (personId:string): Promise<Credits> => {
		const url = `/person/${personId}/credits?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getPersonById: (id:string): Promise<Person> => {
		const url = `/person/${id}?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getPersonPopular: (pageNumber:number): Promise<DataResponse<Person[]>> => {
		const url = `/person/popular?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL,params:{page:pageNumber} });
	},
};
