import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Button, Image, Input, message, Space, Table, Form } from "antd";
import movieDbApiConfig from "app/api/theMovieDBApi/config";
import { MovieModelMapPattern } from "app/model/movie";
import { movieActions, MovieSearchParams, selectMovieList, selectMovieLoading, selectTablePagination } from "app/redux/movie/movieSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import { MapVariable } from "app/utils/mapVariable";
import ButtonItemDelete from "components/common/ButtonItemDelete";
import { debounce } from "lodash";
import React, { ReactElement, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";


type TableFilter = {
	pagination: {
		current: number;
		pageSize: number;
		total: number;
	}
}




export default function MovieList(): ReactElement {
	const dispatch = useAppDispatch();
	const movies = useAppSelector(selectMovieList);
	const pagination = useAppSelector(selectTablePagination);
	const loading = useAppSelector(selectMovieLoading);
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();
	const inputSearchRef = useRef(null);
	const [form] = Form.useForm();

	console.log("MapVariable",movies[0],MapVariable(movies[0],MovieModelMapPattern));

	const [keyword, setKeyword] = useState<string>();

	const debouceSearch = useCallback(debounce((nextValue) => handleSearchDebouce(nextValue), 1000), []);

	const columns = [
		{
			title: "",
			dataIndex: "poster_path",
			sorter: true,
			render: poster_path => <div><Image preview height={100} src={movieDbApiConfig.originalImage(poster_path)} /> </div>,
			width: "10%",
		},
		{
			title: "Title",
			dataIndex: "title",
			sorter: true,
			render: name => `${name}`,
			width: "20%",
		},
		{
			title: "Overview",
			dataIndex: "overview",

		},
		{
			title: "Release Date",
			dataIndex: "release_date",
			width: "20%",
		},
		{
			title: "Action",
			render: (text, record) => (
				<Space size="middle">
					{/* <a>Invite {record.name}</a>
					<a>Delete</a> */}
					<Button
						onClick={() => {
							// dispatch(genreActions.setEditingGenre(genre));
							navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE}/${record.id}`);
						}}
						key="delete-genre"
						type="ghost"
						size="small"
						icon={<EditOutlined />}
					/>
					<ButtonItemDelete
						message="Are your sure ?"
						key="genre-item-delete"
						onDelete={() => {
							dispatch(movieActions.deleteMovie(record.id));
							message.success("Xóa thành công");

						}}
					/>
				</Space>
			),
		},
	];

	console.log("search params", searchParams);

	console.log("re render", movies);

	const getParams = (): MovieSearchParams => {
		return {
			page: parseInt(searchParams.get("page")) || 1,
			include_video: true,
			query: searchParams.get("query") ? searchParams.get("query") : undefined
		};
	};

	useEffect(() => {
		console.log("use effect", searchParams.get("query"));
		const params = getParams();
		if (params.query) {
			form.setFieldsValue({ searchKeyword:params.query});
		}
		dispatch(movieActions.fetchMovieListFromTheMovieDB(params));
		window.scrollTo(0, 0);
	}, [searchParams]);

	const handleTableChange = (pagination) => {
		const params = getParams();
		console.log("params ne", params);
		setSearchParams({ ...searchParams, query: params.query, page: pagination.current });
	};

	const handleSearchDebouce = (keyword) => {
		setSearchParams({ ...searchParams, query: keyword });
	};


	const Header = (): ReactElement => {
		return (
			<div className="w-full flex justify-between items-center mb-5">
				<div className="text-lg font-bold">
					MOVIES
				</div>
				<div className="flex items-center" >
					<Form

						form={form}
						
					>
						<Form.Item
							noStyle
							name="searchKeyword"
						>
							<Input.Search ref={inputSearchRef} onChange={(e) => {
								console.log(e.target.value);
								debouceSearch(e.target.value);
							}} className="mr-2" placeholder="input search text" enterButton size="middle" loading={false} />
						</Form.Item>
					</Form>

					<Button type="primary" className="ml-2" onClick={() => {
						console.log("hi");
						navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.MOVIE_CREATE}`);
					}} icon={<PlusCircleOutlined />}>
						CREATE
					</Button>
				</div>
			</div>
		);
	};

	return (
		<div>
			<Header />
			<Table

				columns={columns}
				rowKey={record => record.id}
				dataSource={movies}
				pagination={pagination}
				loading={loading || pagination === undefined}
				onChange={handleTableChange}
			/>
		</div>
	);
}

