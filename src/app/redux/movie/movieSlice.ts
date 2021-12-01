import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MovieModel } from "app/model/movie";
import { DataResponse } from "app/model/PayloadResponse";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface MovieState {
    list: MovieModel[];
    loading:boolean;
}

const initialState: MovieState = {
	list: [],
	loading:false,
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
		fetchMovieListSuccess(state, action: PayloadAction<DataResponse<MovieModel[]>>) {
			state.loading = false;
			state.list = action.payload.data;
		},
	},
});

// Actions
export const movieActions = movieSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

// Reducer
const movieReducer = movieSlice.reducer;
export default movieReducer;
