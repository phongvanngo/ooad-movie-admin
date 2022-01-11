import { THEMOVIEDB_API_KEY, THEMOVIEDB_BASEURL } from "app/constants";
import { MovieModel } from "app/model/movie";
import { DataResponse, PaginationParams } from "app/model/PayloadResponse";
import { MovieSearchParams } from "app/redux/movie/movieSlice";
import axiosClient from "../axiosClient";
import queryString from "query-string";
import { VidoesOfMovie } from "app/model/video";
import axios from "axios";

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
	getMovieAndVideosById: async (id: string): Promise<MovieModel> => {
		const url_movie = `/movie/${id}?api_key=${THEMOVIEDB_API_KEY}`;
		const url_video = `/movie/${id}/videos?api_key=${THEMOVIEDB_API_KEY}`;
		const one = axiosClient.get(url_movie, { baseURL: THEMOVIEDB_BASEURL });
		const two = axiosClient.get(url_video, { baseURL: THEMOVIEDB_BASEURL });
		const movie =
			await axios.all([one, two]).then(axios.spread((...responses) => {
				const responseOne = responses[0] ;
				const responseTwo = responses[1] as any;
				return { ...responseOne, videos: responseTwo.results };
				// use/access the results 
			})).catch(errors => {
				console.log(errors);
				return undefined;
			});
		return movie;
	},

	searchByName: (
		params: MovieSearchParams,
	): Promise<DataResponse<MovieModel[]>> => {
		const url = `/search/movie?api_key=${THEMOVIEDB_API_KEY}&${queryString.stringify(
			params,
		)}`;

		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	},
	getVideosOfMovie: (id: string): Promise<VidoesOfMovie> => {
		const url = `/movie/${id}/videos?api_key=${THEMOVIEDB_API_KEY}`;
		return axiosClient.get(url, { baseURL: THEMOVIEDB_BASEURL });
	}
};

