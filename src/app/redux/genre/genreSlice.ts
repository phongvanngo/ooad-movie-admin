import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface GenreState {
    loading: boolean;
    list: Genre[];
}

const initialState: GenreState = {
	loading: false,
	list: [],
};

const genreSlice = createSlice({
	name: "genre",
	initialState,
	reducers: {
		fetchGenreList(state) {
			state.loading = true;
		},
		fetchGenreListSuccess(
			state,
			action: PayloadAction<DataResponse<Genre[]>>,
		) {
			state.list = action.payload.data;
			state.loading = false;
		},
		fetchGenreListFailed(state) {
			state.loading = false;
		},
	},
});

// Actions
export const genreActions = genreSlice.actions;

// Selectors
export const selectGenreList = (state: AppRootState) => state.rootReducer.genre.list;
export const selectStudenLoading = (state: AppRootState) => state.rootReducer.genre.loading;

// Reducer
const genreReducer = genreSlice.reducer;
export default genreReducer;
