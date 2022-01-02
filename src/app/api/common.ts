import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const commonApi = {
	generateDownloadLink: (path:string): Promise<DataResponse<string>> => {
		const url = "/download?path="+path;
		return axiosClient.get(url);
	},

};
