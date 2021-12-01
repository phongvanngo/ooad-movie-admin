
import { BASE_URL_API } from "app/constants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
	baseURL: BASE_URL_API,
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
	// Do something before request is sent
	return config;
}, function (error) {
	// Do something with request error
	return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response :AxiosResponse) {
	// Any status code that lie within the range of 2xx cause this function to trigger
	// Do something with response data
	return response.data;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	// Do something with response error
	return Promise.reject(error);
});


export default axiosClient;
