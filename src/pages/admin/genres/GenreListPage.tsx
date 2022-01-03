import {
	PlusCircleOutlined
} from "@ant-design/icons";
import { Button, Input, List } from "antd";
import { Genre } from "app/model/genre";
import { genreActions, selectGenreList, selectGenreLoading } from "app/redux/genre/genreSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import GenreItem from "./GenreItem";

export interface IGenreItem extends Genre {
	loading?: boolean;
}

const skeletonGenreList: IGenreItem[] = [... new Array(5)].map(() => ({ loading: true, id: "", name: "" }));

export default function GenreList(): ReactElement {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const loading = useAppSelector(selectGenreLoading);
	const listGenreData = useAppSelector(selectGenreList);
	const [listGenres, setListGenres] = useState<IGenreItem[]>(skeletonGenreList);
	const [initLoading, setInitLoading] = useState(true);
	
	useEffect(() => {
		if (!loading) {
			setInitLoading(false);
		}
	}, [loading]);

	useEffect(() => {
		if (listGenreData.length > 0) {
			setListGenres(listGenreData);
		}
	}, [listGenreData]);

	useEffect(() => {
		dispatch(genreActions.fetchGenreList());
		dispatch(genreActions.setEditingGenre(null));
	}, []);

	const onLoadMore = () => {
		setListGenres([...listGenres, ...skeletonGenreList]);
		dispatch(genreActions.fetchGenreListFromTheMovieDB());
	};

	const loadMore =
		!initLoading && !loading ? (
			<div
				style={{
					textAlign: "center",
					marginTop: 12,
					height: 32,
					lineHeight: "32px",
				}}
			>

				<Button onClick={() => { onLoadMore(); }}>LOAD MORE</Button>
			</div>
		) : null;

	const Header = (): ReactElement => {
		return (
			<div className="w-full flex justify-between items-center">
				<div className="text-lg font-bold">
					GENRES
				</div>
				<div className="flex items-center">
					<Input.Search className="mr-2" placeholder="input search text" enterButton size="middle" loading={false} />
					<Button type="primary" onClick={() => {
						
						navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.GENRE_CREATE}`);
					}} icon={<PlusCircleOutlined />}>
						CREATE
					</Button>
				</div>
			</div>
		);
	};


	return (
		<div>
			<List
				header={<Header />}
				className="list-genre"
				loading={initLoading}
				itemLayout="horizontal"
				dataSource={listGenres}
				loadMore={loadMore}
				renderItem={item =>
					(
						<GenreItem genre={item} />
					)
				}
			/>
		</div>
	);
}