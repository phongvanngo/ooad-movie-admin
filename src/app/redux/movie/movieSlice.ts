import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieModel } from "app/model/movie";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface MovieState {
    list: MovieModel[];
    loading:boolean;
	editingMovie: MovieModel[]
}

const initialState: MovieState = {
	list: [],
	loading:false,
	editingMovie:undefined,
};

const movieSlice = createSlice({
	name: "movieList",
	initialState,
	reducers: {
		fetchMovieList(state) {
			state.loading = true;
		},
		fetchMovieListFailed(state) {
			state.loading = false;
		},
		fetchMovieListSuccess(
			state,
			action: PayloadAction<DataResponse<MovieModel[]>>,
		) {
			state.loading = false;
			state.list = action.payload.data;
		},
		fetchMovieListFromTheMovieDB(state) {
			state.loading = true;
		},
		fetchMovieListFromTheMovieDBSuccess(
			state,
			action: PayloadAction<DataResponse<MovieModel[]>>,
		) {
			state.list = [...state.list, ...action.payload.results];
			state.loading = false;
		},
		fetchMovieListFromTheMovieDBFailed(state) {
			state.loading = true;
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
export const selectEditingMovie = (state: AppRootState) =>
	state.rootReducer.movie.editingMovie;

// Reducer
const movieReducer = movieSlice.reducer;
export default movieReducer;
