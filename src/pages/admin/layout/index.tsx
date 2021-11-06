import React, { ReactElement } from "react";
import { Link,Outlet } from "react-router-dom";
import { ADMIN_ROUTE } from "routes/routes.const";


export default function AdminLayout(): ReactElement {
	return (
		<div>
            this is admin layout
			<ul>
				<li><Link to={ADMIN_ROUTE.HOME}>home</Link></li>
				<li><Link to={ADMIN_ROUTE.MOVIE}>movie</Link></li>
				<li><Link to={ADMIN_ROUTE.GENRE}>genre</Link></li>
			</ul>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
