
import { BASE_URL_API, COOKIE_USER } from "app/constants";
import { getCookie } from "app/utils/cookie";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import queryString from "query-string";
import { AdminModel } from "app/model/User";

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
	let token;
	const adminUser = getCookie(COOKIE_USER);
	if(adminUser) {
		const user: AdminModel = JSON.parse(adminUser);
		token = user.token;
	}
	config.headers.Authorization = `Bearer ${token}`;
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
