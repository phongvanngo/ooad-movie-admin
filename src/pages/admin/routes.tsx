import React, { ReactElement } from "react";
import { Route, Routes } from "react-router";
import { ADMIN_ROUTE } from "routes/routes.const";
import EpisodeManagement from "./movie/episodes";

const AdminDashboard = React.lazy(() => import("./dashboard"));
const GenresManagementPage = React.lazy(() => import("./genres"));
const GenreCreate = React.lazy(() => import("./genres/AddEditPage"));
const AdminLayout = React.lazy(() => import("./layout"));
const MovieManagementPage = React.lazy(() => import("./movie"));
const CreateMovie = React.lazy(() => import("./movie/create"));
const DiscountManagementPage = React.lazy(() => import("./discount"));
const AddEditDiscountPage = React.lazy(() => import("./discount/AddEditPage"));
const PlanManagementPage = React.lazy(() => import("./plan"));
const AddEditPlanPage = React.lazy(() => import("./plan/AddEditPage"));
const CompanyManagementPage = React.lazy(() => import("./company"));
const AddEditCompanyPage = React.lazy(() => import("./company/AddEditPage"));
const CastManagementPage = React.lazy(() => import("./company"));
const AddEditCastPage = React.lazy(() => import("./company/AddEditPage"));
const CommentManagementPage = React.lazy(() => import("./comment"));
const UserManagementPage = React.lazy(() => import("./user"));

import Test from "./_test/index";

export default function AdminRoutes(): ReactElement {
	return (
		<Routes>
			<Route element={<AdminLayout />}>
				<Route
					path={`${ADMIN_ROUTE.DASHBOARD}`}
					element={<AdminDashboard />}
				/>
				<Route
					path={`${ADMIN_ROUTE.MOVIE}`}
					element={<MovieManagementPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.MOVIE}/:movieId`}
					element={<CreateMovie />}
				/>
				<Route
					path={`${ADMIN_ROUTE.MOVIE}/:movieId/episode/*`}
					element={<EpisodeManagement />}
				/>
				<Route
					path={`${ADMIN_ROUTE.GENRE}`}
					element={<GenresManagementPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.GENRE_CREATE}`}
					element={<GenreCreate />}
				/>
				<Route
					path={`${ADMIN_ROUTE.GENRE}/:genreId`}
					element={<GenreCreate />}
				/>
				<Route
					path={`${ADMIN_ROUTE.DISCOUNT}`}
					element={<DiscountManagementPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.DISCOUNT_CREATE}`}
					element={<AddEditDiscountPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.DISCOUNT}/:discountId`}
					element={<AddEditDiscountPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.PLAN}`}
					element={<PlanManagementPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.PLAN_CREATE}`}
					element={<AddEditPlanPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.PLAN}/:planId`}
					element={<AddEditPlanPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.COMPANY}`}
					element={<CompanyManagementPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.COMPANY_CREATE}`}
					element={<AddEditCompanyPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.COMPANY}/:companyId`}
					element={<AddEditCompanyPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.CAST}`}
					element={<CastManagementPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.CAST_CREATE}`}
					element={<AddEditCastPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.CAST}/:castId`}
					element={<AddEditCastPage />}
				/>
				<Route
					path={`${ADMIN_ROUTE.COMMENTS}`}
					element={<CommentManagementPage />}
				/>
				
				<Route
					path={`${ADMIN_ROUTE.MOVIE_CREATE}`}
					element={<CreateMovie />}
				/>
				<Route path={`${ADMIN_ROUTE.USER}`} element={<UserManagementPage />} />
				<Route path={`${ADMIN_ROUTE.DASHBOARD}`} element={<Test />} />
			</Route>
		</Routes>
	);
}
