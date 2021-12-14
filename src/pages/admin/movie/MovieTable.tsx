import { movieActions, selectMovieList, selectMovieLoading } from "app/redux/movie/movieSlice";
import { useAppDispatch, useAppSelector } from "app/redux/store";
import React, { ReactElement, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Table } from "antd";

type TablePagination = {
	current: number;
	pageSize:number;
}

export default function MovieList(): ReactElement {
	const dispatch = useAppDispatch();
	const movies = useAppSelector(selectMovieList);
	const loading = useAppSelector(selectMovieLoading);
	const [searchParams, setSearchParams] = useSearchParams();

	console.log(searchParams);
	
	console.log(movies);
	useEffect(() => {
		dispatch(movieActions.fetchMovieListFromTheMovieDB());
	}, []);
	return (
		<div>
			{/* <Table
				columns={columns}
				rowKey={record => record.login.uuid}
				dataSource={data}
				pagination={pagination}
				loading={loading}
				onChange={this.handleTableChange}
			/> */}
		</div>
	);
}
