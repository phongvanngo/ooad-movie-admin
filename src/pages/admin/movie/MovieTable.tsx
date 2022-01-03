import { EditOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Button, Form, Image, Space, Table, Tag, Tooltip } from "antd";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { MovieModel, MovieModelMapPattern } from "app/model/movie";
import {
	movieActions,
	MovieSearchParams,
	selectMovieList,
	selectMovieLoading,
	selectTablePagination,
} from "app/redux/movie/movieSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { MapVariable } from "app/utils/mapVariable";
import { filterArrayBySearchTerm } from "app/utils/my-library";
import ButtonItemDelete from "components/common/ButtonItemDelete";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";

type TableFilter = {
    pagination: {
        current: number;
        pageSize: number;
        total: number;
    };
};

interface Props {
    searchTerm: string;
}

export default function MovieList({ searchTerm }: Props): ReactElement {
	const dispatch = useAppDispatch();
	const movies = useAppSelector(selectMovieList);
	const loading = useAppSelector(selectMovieLoading);
	const navigate = useNavigate();

	const currentListMovie = filterArrayBySearchTerm(
		movies,
		searchTerm,
	) as MovieModel[];


	const columns = [
		{
			title: "",
			dataIndex: "poster_path",
			sorter: true,
			render: (poster_path) => (
				<div>
					<Image
						preview
						height={100}
						src={movieDbApiConfig.originalImage(poster_path)}
					/>{" "}
				</div>
			),
			width: "10%",
		},
		{
			title: "Title",
			dataIndex: "title",
			sorter: true,
			render: (name) => `${name}`,
			width: "20%",
		},
		{
			ellipsis: true,
			title: "Overview",
			dataIndex: "overview",
			render: (overview) => (
				<>
					<Tooltip placement="topLeft" title={overview}>
						<span>{overview}</span>
					</Tooltip>
				</>
			),
		},
		{
			title: "Type",
			dataIndex: "isTVSeries",
			render: (isTVSeries) =>
				isTVSeries ? (
					<Tag color="magenta">TV Series</Tag>
				) : (
					<Tag color="cyan">Movie</Tag>
				),
			filters: [
				{
					text: "Movie",
					value: false,
				},
				{
					text: "TV Series",
					value: true,
				},
			],
			onFilter: (value, record) => record.isTVSeries === value,

			width: "20%",
		},
		{
			title: "Action",
			render: (text, record) => (
				<Space size="middle">
					{/* <a>Invite {record.name}</a>
					<a>Delete</a> */}
					<Tooltip placement="topLeft" title="Edit Movie">
						<Button
							onClick={() => {
								// dispatch(genreActions.setEditingGenre(genre));
								dispatch(movieActions.setEditingMovie(record));
								navigate(
									`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}/${record.id}`,
								);
							}}
							key="delete-genre"
							type="ghost"
							size="small"
							icon={<EditOutlined />}
						/>
					</Tooltip>
					<Tooltip placement="topLeft" title="Manage Episode">
						<Button
							onClick={() => {
								// dispatch(genreActions.setEditingGenre(genre));
								dispatch(movieActions.setEditingMovie(record));
								navigate(
									`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}/${record.id}/episode`,
								);
							}}
							key="delete-genre"
							type="ghost"
							size="small"
							icon={<VideoCameraOutlined />}
						/>
					</Tooltip>
					<Tooltip placement="topLeft" title="Delete Movie">
						<ButtonItemDelete
							message="Are your sure ?"
							key="genre-item-delete"
							onDelete={() => {
								dispatch(movieActions.deleteMovie(record.id));
							}}
						/>
					</Tooltip>
				</Space>
			),
		},
	];

	useEffect(() => {
		dispatch(movieActions.setEditingMovie(undefined));
		dispatch(movieActions.fetchMovieList());

		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<Table
				columns={columns}
				scroll={{ x: 1500 }}
				rowKey={(record) => record.id}
				dataSource={currentListMovie}
				pagination={{ pageSize: 5 }}
				loading={loading}
				// onChange={handleTableChange}
			/>
		</div>
	);
}
