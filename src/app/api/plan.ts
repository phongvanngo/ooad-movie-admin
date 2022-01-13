import { DataResponse } from "app/model/PayloadResponse";
import { Plan, PlanStatistical } from "app/model/plan";
import axiosClient from "./axiosClient";

export const planApi = {
	getAll: (): Promise<DataResponse<Plan[]>> => {
		const url = "/plans";
		return axiosClient.get(url);
	},
	add: (plan: Partial<Plan>): Promise<DataResponse<Plan>> => {
		const url = "/plans";
		return axiosClient.post(url, plan);
	},
	update: (plan: Partial<Plan>): Promise<DataResponse<Plan>> => {
		const url = "/plan";
		return axiosClient.put(url, plan);
	},
	delete: (id: string): Promise<DataResponse<any>> => {
		const url = "/plan?id=" + id;
		return axiosClient.delete(url);
	},
	getStatistic: (): Promise<DataResponse<PlanStatistical[]>> => {
		const url = "/plans/order/top";
		return axiosClient.get(url);
	},
};
