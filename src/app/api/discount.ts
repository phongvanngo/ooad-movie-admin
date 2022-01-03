import { Discount } from "app/model/discount";
import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const discountApi = {
	getAll: (): Promise<DataResponse<Discount[]>> => {
		const url = "/discounts";
		return axiosClient.get(url);
	},
	add: (discount: Partial<Discount>): Promise<DataResponse<Discount>> => {
		const url = "/discount";
		return axiosClient.post(url, discount);
	},
	update: (discount: Partial<Discount>): Promise<DataResponse<Discount>> => {
		const url = "/discount";
		return axiosClient.put(url, discount);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/discount?id=" + id;
		return axiosClient.delete(url);
	},
};
