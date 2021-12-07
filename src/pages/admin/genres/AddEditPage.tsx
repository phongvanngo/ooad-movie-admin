import { genreApi } from "app/api/genres";
import { Genre } from "app/model/genre";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import GenreForm from "./GenreForm";
import { message, Button } from "antd";
import { useAppSelector } from "app/redux/store";
import { selectEditingGenre } from "app/redux/genre/genreSlice";

export default function AddEditPage(): ReactElement {
	const navigate = useNavigate();
	const initialValue = useAppSelector(selectEditingGenre);
	function handleSubmit(genre: Partial<Genre>):void {
		(async ()=>{
			try {
				if(initialValue) {
					const response = await genreApi.update(genre);
				}else {
					const response = await genreApi.add(genre);
				}
				navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.GENRE}`);
			} catch (error) {
				message.error("Không thể thực hiện");
			}

		})();
	}
	const {genreId} = useParams();
	useEffect(() => {
		// if (genreId) {

		// }
	}, []);
	return (
		<div>
			<GenreForm onSubmit={handleSubmit} initialValue={initialValue}/>
		</div>
	);
}
