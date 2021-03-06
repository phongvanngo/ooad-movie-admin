import { ResponseStatus } from "app/definitions/Enum";
import { ISignInPayload } from "app/redux/slices/adminAuthThunk/types";
import { callAPI } from "./fakeApi";

export const adminAuthApi = {
	signIn: async (payload:ISignInPayload):Promise<any> => {
		return await callAPI("/signin",{status:ResponseStatus.s200,data:payload.password,response:{
			status:200,
			token:"this is token",
			hello: 3
		}});
	}
};