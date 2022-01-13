import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieModel, MovieModelMapPattern } from "app/model/movie";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";
import { PaginationParams } from "app/model/PayloadResponse";
import { MapVariable } from "app/utils/mapVariable";

export interface LoginPayload {
    username: string;
    password: string;
}

export type TablePagination = {
    current: number;
    pageSize: number;
    total: number;
};

export interface MovieState {
    list: MovieModel[];
    loading: boolean;
    editingMovie: MovieModel;
    pagination: TablePagination;
	topRatingMovie:MovieModel[];
}

const initialState: MovieState = {
	list: [],
	pagination: undefined,
	loading: false,
	editingMovie: undefined,
	topRatingMovie:[]
};

export type MovieSearchParams = {
    page?: number;
    include_video?: boolean;
	query?:string;
};

const movieSlice = createSlice({
	name: "movieList",
	initialState,
	reducers: {
		setEditingMovie(state, action: PayloadAction<MovieModel>) {
			state.editingMovie = action.payload;
		},
		setEmptyEditingMovie(state) {
			state.editingMovie = undefined;
		},
		fetchMovieList(state) {
			state.loading = true;
		},
		fetchMovieListFailed(state) {
			state.loading = false;
		},
		fetchTopRatingMovie(state) {
			state.loading = true;
		},
		fetchTopRatingMovieSuccess(state, action: PayloadAction<DataResponse<MovieModel[]>>,) {
			state.loading = false;
			state.topRatingMovie = action.payload.data;
		},
		fetchTopRatingMovieFailed(state) {
			state.loading = false;
		},
		deleteMovie(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deleteMovieSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			state.list = state.list.filter(
				(movie) => movie.id !== action.payload,
			);
		},
		deleteMovieFaield(state) {
			state.loading = false;
		},
		fetchMovieListSuccess(
			state,
			action: PayloadAction<DataResponse<MovieModel[]>>,
		) {
			state.loading = false;
			state.list = [
				...action.payload.data.map(e=>MapVariable<MovieModel>(e,MovieModelMapPattern)).reverse().filter(e=>e.enabled)
			];
		},
		fetchMovieListFromTheMovieDB(
			state,
			action: PayloadAction<MovieSearchParams>,
		) {
			state.loading = true;
		},
		fetchMovieListFromTheMovieDBSuccess(
			state,
			action: PayloadAction<DataResponse<MovieModel[]>>,
		) {
			const { page, total_results, results } = action.payload;
			state.list = results;
			state.pagination = {
				current: page,
				pageSize: 20,
				total: total_results,
			};
			state.loading = false;
		},
		fetchMovieListFromTheMovieDBFailed(state) {
			state.loading = true;
		},
		searchMovieFromTheMovieDBByName(state, action: PayloadAction<string>) {
			state.loading = false;
		},
	},
});

// Actions
export const movieActions = movieSlice.actions;

// Selectors
export const selectMovieList = (state: AppRootState) =>
	state.rootReducer.movie.list;
export const selectMovieLoading = (state: AppRootState) =>
	state.rootReducer.movie.loading;
export const selectTopRatingMovie = (state: AppRootState) =>
	state.rootReducer.movie.topRatingMovie;
export const selectEditingMovie = (state: AppRootState) =>
	state.rootReducer.movie.editingMovie;
export const selectTablePagination = (state: AppRootState) =>
	state.rootReducer.movie.pagination;

// Reducer
const movieReducer = movieSlice.reducer;
export default movieReducer;
