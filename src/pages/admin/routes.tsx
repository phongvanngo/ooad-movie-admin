import React, { ReactElement } from "react";
import {
	Route,
	Routes
} from "react-router";
import AdminDashboard from "./dashboard";
import GenresManagementPage from "./genres";
import AdminLayout from "./layout";
import MovieManagementPage from "./movie";
import Test from "./_test/index";

export default function AdminRoutes(): ReactElement {
	return (
		<Routes>
			<Route element={<AdminLayout />}>
				<Route path="/" element={<AdminDashboard />}/>
				<Route path="/movie" element={<MovieManagementPage />}/>
				<Route path="/genre" element={<GenresManagementPage />}/>
				<Route path="/test" element={<Test />}/>
			</Route>
		</Routes>
	);
}
