
import { BASE_URL_API } from "app/constants";
import axios from "axios";
import queryString from "query-string";

const instance = axios.create({
	baseURL: BASE_URL_API,
	headers: {
		"content-type": "application/json",
	},
	paramsSerializer: (params) => queryString.stringify(params),
});

instance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("notoken");
		if (token) {
			// config.headers["Authorization"] = `${token}`;
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(err) => err,
);

// instance.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     return error.response;
//   }
// );
export default instance;
