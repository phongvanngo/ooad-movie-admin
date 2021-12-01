import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AdminModel } from "app/model/User";

export interface LoginPayload {
    username: string;
    password: string;
}

export interface AdminAuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: AdminModel;
}

const initialState: AdminAuthState = {
	isLoggedIn: false,
	logging: false,
	currentUser: undefined,
};

const adminAuthSlice = createSlice({
	name: "adminAuth",
	initialState,
	reducers: {
		login(state, action: PayloadAction<LoginPayload>) {
			state.logging = true;
		},
		loginSuccess(state, action: PayloadAction<AdminModel>) {
			state.isLoggedIn = true;
			state.logging = false;
			state.currentUser = action.payload;
		},
		loginFailed(state, action: PayloadAction<string>) {
			state.logging = false;
		},

		logout(state) {
			state.isLoggedIn = false;
			state.currentUser = undefined;
		},
	},
});

// Actions
export const authActions = adminAuthSlice.actions;

// Selectors
export const selectIsLoggedIn = (state: any) => state.auth.isLoggedIn;
export const selectIsLogging = (state: any) => state.auth.logging;

// Reducer
const authReducer = adminAuthSlice.reducer;
export default authReducer;
