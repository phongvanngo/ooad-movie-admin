import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { User } from "app/model/User";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface UserState {
	loading: boolean;
	list: User[];
	editingUser: User;
}

const initialState: UserState = {
	loading: false,
	list: [],
	editingUser: null,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setEditingUser(state, action: PayloadAction<User>) {
			state.editingUser = action.payload;
		},
		fetchUserList(state) {
			state.loading = true;
		},
		fetchUserListSuccess(
			state,
			action: PayloadAction<DataResponse<User[]>>,
		) {
			state.list = action.payload.data.reverse();
			state.loading = false;
		},
		fetchUserListFailed(state) {
			state.loading = false;
		},
		fetchAllUserList(state) {
			// fetch gerne from thinh movie and the movid db
			state.loading = true;
		},
		fetchAllUserListSuccess(
			state,
			action: PayloadAction<DataResponse<User[]>>,
		) {
			state.list = action.payload.data;
			state.loading = false;
		},
		fetchAllUserListFailed(state) {
			state.loading = false;
		},
		deleteUser(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deleteUserSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			console.log(action.payload);
			state.list = state.list.filter(user => user.id !== action.payload);
			message.success("Delete User Successfully");
		},
		deleteUserFailed(state) {
			state.loading = false;
			message.error("Delete User Failed");
		}


	},
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const selectUserList = (state: AppRootState) => state.rootReducer.user.list;
export const selectUserLoading = (state: AppRootState) => state.rootReducer.user.loading;
export const selectEditingUser = (state: AppRootState) => state.rootReducer.user.editingUser;

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;
