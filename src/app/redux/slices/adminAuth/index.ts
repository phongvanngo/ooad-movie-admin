import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { adminAuthApi } from "app/api/adminAuthApi";
import { COOKIE_USER } from "app/constants";
import { AdministratorModel } from "app/definitions/User";
import { Thunk } from "app/redux/reducers";
import { getCookie, removeCookie, setCookie } from "app/utils/cookie";
import { ISignInPayload, ISignInResponsePayload } from "./types";

interface IAdminAuth {
    isLoggedIn: boolean;
}

const initialState: IAdminAuth = {
	isLoggedIn:false
};

const counterSlice = createSlice({
	name: "adminAuth",
	initialState,
	reducers: {
		signInSuccess: (state: IAdminAuth,action : PayloadAction<ISignInResponsePayload>) => {
			const user = {} as AdministratorModel;
			user.token = action.payload.token;
			setCookie(COOKIE_USER,JSON.stringify(user));
			state.isLoggedIn = true;
		},
		reLogin:(state:IAdminAuth) =>{
			try {
				const user =JSON.parse(getCookie(COOKIE_USER)) as AdministratorModel;
				if (user) {
					state.isLoggedIn = true;
				}
			} catch (error) {
				console.log("reLogin error",error);
			}
		},
		signOut: (state:IAdminAuth) => {
			state.isLoggedIn = false;
			removeCookie(COOKIE_USER);
		},
	},
});

export const { signInSuccess,signOut,reLogin } = counterSlice.actions;

export const signIn = (ISignInPayload : ISignInPayload,callback:VoidFunction): Thunk => {
	return async (dispatch) => {
		try {
			const response = await adminAuthApi.signIn(ISignInPayload) as ISignInResponsePayload;
			console.log(response);
			if(response) {
				dispatch(signInSuccess(response));
				callback();
			}
		} catch (e) {
			console.log("signInError",e);
		}
	};
};




export default counterSlice.reducer;
