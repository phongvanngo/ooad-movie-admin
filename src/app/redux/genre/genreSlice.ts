import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface GenreState {
	loading: boolean;
	list: Genre[];
	editingGenre: Genre;
}

const initialState: GenreState = {
	loading: false,
	list: [],
	editingGenre: null,
};

const genreSlice = createSlice({
	name: "genre",
	initialState,
	reducers: {
		setEditingGenre(state, action: PayloadAction<Genre>) {
			state.editingGenre = action.payload;
		},
		fetchGenreList(state) {
			state.loading = true;
		},
		fetchGenreListSuccess(
			state,
			action: PayloadAction<DataResponse<Genre[]>>,
		) {
			state.list = action.payload.data.reverse();
			state.loading = false;
		},
		fetchGenreListFailed(state) {
			state.loading = false;
		},
		fetchAllGenreList(state) {
			// fetch gerne from thinh movie and the movid db
			state.loading = true;
		},
		fetchAllGenreListSuccess(
			state,
			action: PayloadAction<DataResponse<Genre[]>>,
		) {
			state.list = action.payload.data;
			state.loading = false;
		},
		fetchAllGenreListFailed(state) {
			state.loading = false;
		},
		fetchGenreListFromTheMovieDB(state) {
			state.loading = true;
		},
		fetchGenreListFromTheMovieDBSuccess(state, action: PayloadAction<DataResponse<Genre[]>>) {
			state.list = [...state.list, ...action.payload.data];
			state.loading = false;
		},
		fetchGenreListFromTheMovieDBFailed(state) {
			state.loading = true;
		},
		deleteGenre(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deleteGenreSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			console.log(action.payload);
			state.list = state.list.filter(genre => genre.id !== action.payload);
			message.success("Delete Genre Successfully");
		},
		deleteGenreFailed(state) {
			state.loading = false;
			message.error("Delete Genre Failed");
		}


	},
});

// Actions
export const genreActions = genreSlice.actions;

// Selectors
export const selectGenreList = (state: AppRootState) => state.rootReducer.genre.list;
export const selectGenreLoading = (state: AppRootState) => state.rootReducer.genre.loading;
export const selectEditingGenre = (state: AppRootState) => state.rootReducer.genre.editingGenre;

// Reducer
const genreReducer = genreSlice.reducer;
export default genreReducer;
