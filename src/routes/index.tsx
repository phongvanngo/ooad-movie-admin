import { reLogin } from "app/redux/actions";
import { useAppDispatch,AppRootState } from "app/redux/store";
import NotFoundPage from "pages/notfound";
import React, { ReactElement, Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import {
	BrowserRouter as Router, Navigate, Route, Routes, useLocation
} from "react-router-dom";
import { ADMIN_ROUTE, PUBLIC_ROUTE } from "./routes.const";

const AdminPage = React.lazy(() => import("pages/admin/index"));
const SignInPage = React.lazy(() => import("pages/sign-in/index"));

export default function AppRoutes(): ReactElement {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(reLogin());
	}, []);
	return (
		<Suspense fallback={<div>loading</div>}>
			<Router>
				<Routes>
					<Route>
						<Route path="/" element={
							<Navigate to={ADMIN_ROUTE.HOME} />
						} />
						<Route path={PUBLIC_ROUTE.SIGN_IN} element={<SignInPage />}/>
						<Route path={`${ADMIN_ROUTE.HOME}/*`} element={
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


	const isLoggedIn = useSelector(
		(state:AppRootState) => state.rootReducer.adminAuth.isLoggedIn,
	);

	console.log(isLoggedIn);

	if (!isLoggedIn) {
		return <Navigate to={PUBLIC_ROUTE.SIGN_IN} state={{ from: location }} />;
	} 
	return children;
}