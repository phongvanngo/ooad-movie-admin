import { genreActions } from "app/redux/genre/genreSlice";
import { useAppDispatch } from "app/redux/store";
import React, { ReactElement, useEffect } from "react";


export default function GenresManagementPage(): ReactElement {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(genreActions.fetchGenreList());
	}, []);
	return (
		<div>
            genre
		</div>
	);
}
