import { Order } from "app/model/order";
import { DataResponse } from "app/model/PayloadResponse";
import axiosClient from "./axiosClient";

export const orderApi = {
	getAll: (): Promise<DataResponse<Order[]>> => {
		const url = "/orders";
		return axiosClient.get(url);
	},
	add: (order: Partial<Order>): Promise<DataResponse<Order>> => {
		const url = "/order";
		return axiosClient.post(url, order);
	},
	update: (order: Partial<Order>): Promise<DataResponse<Order>> => {
		const url = "/order";
		return axiosClient.put(url, order);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/order?id=" + id;
		return axiosClient.delete(url);
	},
};
