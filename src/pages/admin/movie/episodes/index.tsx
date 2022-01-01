import React, { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import EpisodeDetail from "./EpisodeDetail";
import EpisodeManagementLayout from "./Layout";

export default function EpisodeManagement(): ReactElement {
	return (
		<div>
			<Routes>
				<Route path="/" element={<EpisodeManagementLayout />}>
					<Route path={"/:episodeId"} element={<EpisodeDetail />} />
				</Route>
			</Routes>
		</div>
	);
}
