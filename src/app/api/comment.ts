import { CommentModel, GetCommentParameters } from "app/model/comment";
import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const commentApi = {
	getAll: (params: GetCommentParameters): Promise<DataResponse<CommentModel[]>> => {
		const url = "/comments";
		return axiosClient.get(url, { params: params });
	},
	add: (comment: Partial<CommentModel>): Promise<DataResponse<CommentModel>> => {
		const url = "/comment";
		return axiosClient.post(url, comment);
	},
	update: (comment: Partial<CommentModel>): Promise<DataResponse<CommentModel>> => {
		const url = "/comment";
		return axiosClient.put(url, comment);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/comment?id=" + id;
		return axiosClient.delete(url);
	},
};
