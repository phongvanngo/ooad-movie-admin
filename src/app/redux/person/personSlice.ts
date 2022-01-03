import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Person } from "app/model/person";
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

export interface PersonState {
    list: Person[];
    loading: boolean;
    editingPerson: Person;
    pagination: TablePagination;
}

const initialState: PersonState = {
	list: [],
	pagination: undefined,
	loading: false,
	editingPerson: undefined,
};

export type PersonSearchParams = {
    page?: number;
    include_video?: boolean;
	query?:string;
};

const personSlice = createSlice({
	name: "personList",
	initialState,
	reducers: {
		setEditingPerson(state, action: PayloadAction<Person>) {
			state.editingPerson = action.payload;
		},
		setEmptyEditingPerson(state) {
			state.editingPerson = undefined;
		},
		deletePerson(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deletePersonSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			state.list = state.list.filter(
				(person) => person.id !== action.payload,
			);
		},
		deletePersonFaield(state) {
			state.loading = false;
		},

		fetchPersonListFromThePersonDB(
			state,
			action: PayloadAction<PersonSearchParams>,
		) {
			state.loading = true;
		},
		fetchPersonListFromThePersonDBSuccess(
			state,
			action: PayloadAction<DataResponse<Person[]>>,
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
		fetchPersonListFromThePersonDBFailed(state) {
			state.loading = true;
		},
		searchPersonFromThePersonDBByName(state, action: PayloadAction<string>) {
			state.loading = false;
		},
	},
});

// Actions
export const personActions = personSlice.actions;

// Selectors
export const selectPersonList = (state: AppRootState) =>
	state.rootReducer.person.list;
export const selectPersonLoading = (state: AppRootState) =>
	state.rootReducer.person.loading;
export const selectEditingPerson = (state: AppRootState) =>
	state.rootReducer.person.editingPerson;
export const selectTablePagination = (state: AppRootState) =>
	state.rootReducer.person.pagination;

// Reducer
const personReducer = personSlice.reducer;
export default personReducer;
