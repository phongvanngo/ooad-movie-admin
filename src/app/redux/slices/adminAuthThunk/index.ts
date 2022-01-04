import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { adminAuthApi } from "app/api/adminAuthApi";
import { authApi } from "app/api/authApi";
import { COOKIE_USER } from "app/constants";
import { AuthRequestPayload, AuthResponsePayload, DataResponse } from "app/model/PayloadResponse";
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

const adminAuthThunkSlice = createSlice({
	name: "adminAuthThunk",
	initialState,
	reducers: {
		signInSuccess: (state: IAdminAuth,action : PayloadAction<AuthResponsePayload>) => {
			const user = {} as AdminModel;
			user.token = action.payload.accessToken;
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

export const { signInSuccess,signOut,reLogin } = adminAuthThunkSlice.actions;

export const signIn = (signInPayload : AuthRequestPayload,callback:VoidFunction): AppThunk =>async (dispatch,ThunkApi)=> {
	console.log(ThunkApi);
	try {
		const response: DataResponse<AuthResponsePayload> = await authApi.login(signInPayload) ;
		
		if(response) {
			dispatch(signInSuccess(response.data));
			callback();
		}
	} catch (e) {
		message.error("Can not sign in!");
	} finally {
		console.log();
	}
};

export const selectIsLoggedIn = (state: AppRootState) =>
	state.rootReducer.adminAuthThunk.isLoggedIn;





export default adminAuthThunkSlice.reducer;
