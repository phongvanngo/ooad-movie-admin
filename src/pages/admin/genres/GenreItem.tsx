import { EditOutlined } from "@ant-design/icons";
import { Button, List, Skeleton } from "antd";
import { genreActions } from "app/redux/genre/genreSlice";
import { useAppDispatch } from "app/redux/store";
import ButtonItemDelete from "components/common/ButtonItemDelete";
import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { IGenreItem } from "./GenreListPage";

interface Props {
    genre:IGenreItem
}
export default function GenreItem({genre}: Props): ReactElement {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	return (
		<List.Item
			actions={
				[<Button
					onClick={() => {
						dispatch(genreActions.setEditingGenre(genre));
						navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.GENRE}/${genre.id}`);
					}}
					key="delete-genre"
					type="ghost"
					size="small"
					icon={<EditOutlined/>} 
				/>,
				<ButtonItemDelete
					message="Are your sure ?"
					key="genre-item-delete"
					onDelete={() => { dispatch(genreActions.deleteGenre(genre.id)); }}
				/>]}
		>
			<Skeleton avatar title={false} active loading={genre.loading}>
				<List.Item.Meta
					title={genre.name}
				/>
			</Skeleton>
		</List.Item>
	);
}
