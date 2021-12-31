import { reLogin } from "app/redux/actions";
import { selectIsLoggedIn } from "app/redux/slices/adminAuthThunk";
import { useAppDispatch,AppRootState, useAppSelector } from "app/redux/store";
import NotFoundPage from "pages/notfound";
import React, { ReactElement, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	BrowserRouter as Router, Navigate, Route, Routes, useLocation
} from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "./routes.const";

const AdminPage = React.lazy(() => import("pages/admin/index"));
const SignInPage = React.lazy(() => import("pages/sign-in/index"));

export default function AppRoutes(): ReactElement {
	const dispatch = useAppDispatch();
	const isLoggedIn = useAppSelector(selectIsLoggedIn);
	useEffect(() => {
		dispatch(reLogin());
	}, []);
	// if (isLoggedIn === undefined) return <div>Loading</div>;
	return (
		<Suspense fallback={<div>loading</div>}>
			<Router>
				<Routes>
					<Route>
						<Route path="/" element={
							<Navigate to={APP_ROUTE.ADMIN} />
						} />
						<Route path={APP_ROUTE.SIGN_IN} element={<SignInPage />}/>
						<Route path={`${APP_ROUTE.ADMIN}/*`} element={
							<RequireAuth>
								<div>
									<AdminPage />
								</div>
							</RequireAuth>
						}/>
						<Route path="*" element={<NotFoundPage />}/>
					</Route>
				</Routes>
			</Router>
		</Suspense>
	);
}

function RequireAuth({ children }: { children: JSX.Element }) {
	const location = useLocation();

	console.log("first location",location);
	const isLoggedIn = useSelector(
		(state:AppRootState) => state.rootReducer.adminAuthThunk.isLoggedIn,
	);

	console.log(isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to={APP_ROUTE.SIGN_IN} state={{ from: location }} />;
	} 
	console.log("auutttthhhhhhh",location);
	return children;
}