import { message } from "antd";
import { movieApi } from "app/api/movie";
import { MovieModel } from "app/model/movie";
import { genreActions } from "app/redux/genre/genreSlice";
import { selectEditingMovie } from "app/redux/movie/movieSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import React, { ReactElement, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import MovieForm from "./MovieForm/MovieForm";

export default function CreateMovie(): ReactElement {
	const navigate = useNavigate();
	const {movieId} = useParams();
	const initialValue = useAppSelector(selectEditingMovie);
	function handleSubmit(movie: Partial<MovieModel>): void {
		(async () => {
			try {
				if (initialValue) {
					const response = await movieApi.update({...movie,id:initialValue.id});
				} else {
					const response = await movieApi.add(movie);
				}
				navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}`);
			} catch (error) {
				message.error("Không thể thực hiện");
			}
		})();
	}
	const dispacth = useAppDispatch();
	useEffect(() => {
		dispacth(genreActions.fetchAllGenreList());
		// if (movieId) {
			
		// }
	}, []);
	return (
		<div>
			<MovieForm onSubmit={handleSubmit} initialValue={initialValue}/>
		</div>
	);
}
