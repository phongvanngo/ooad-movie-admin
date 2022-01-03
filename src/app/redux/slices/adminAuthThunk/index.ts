import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { adminAuthApi } from "app/api/adminAuthApi";
import { COOKIE_USER } from "app/constants";
import { AdminModel } from "app/model/User";
import { AppRootState, AppThunk } from "app/redux/store";
import { getCookie, removeCookie, setCookie } from "app/utils/cookie";
import { ISignInPayload, ISignInResponsePayload } from "./types";

interface IAdminAuth {
    isLoggedIn: boolean;
}

const initialState: IAdminAuth = {
	isLoggedIn:undefined
};

const counterSlice = createSlice({
	name: "adminAuthThunk",
	initialState,
	reducers: {
		signInSuccess: (state: IAdminAuth,action : PayloadAction<ISignInResponsePayload>) => {
			const user = {} as AdminModel;
			user.token = action.payload.token;
			setCookie(COOKIE_USER,JSON.stringify(user));
			state.isLoggedIn = true;
		},
		reLogin:(state:IAdminAuth) =>{
			try {
				const user =JSON.parse(getCookie(COOKIE_USER)) as AdminModel;
				if (user) {
					state.isLoggedIn = true;
				}
			} catch (error) {
				message.error(error);
			}
		},
		signOut: (state:IAdminAuth) => {
			state.isLoggedIn = false;
			removeCookie(COOKIE_USER);
		},
	},
});

export const { signInSuccess,signOut,reLogin } = counterSlice.actions;

export const signIn = (ISignInPayload : ISignInPayload,callback:VoidFunction): AppThunk =>async (dispatch)=> {
	try {
		const response = await adminAuthApi.signIn(ISignInPayload) as ISignInResponsePayload;
		
		if(response) {
			dispatch(signInSuccess(response));
			callback();
		}
	} catch (e) {
		message.error(e);
	}
};

export const selectIsLoggedIn = (state: AppRootState) =>
	state.rootReducer.adminAuthThunk.isLoggedIn;





export default counterSlice.reducer;
