import { Discount } from "app/model/discount";
import { AuthRequestPayload, AuthResponsePayload, DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const authApi = {
	login: (data: AuthRequestPayload): Promise<DataResponse<AuthResponsePayload>> => {
		const url = "/login";
		return axiosClient.post(url,data);
	},
};
