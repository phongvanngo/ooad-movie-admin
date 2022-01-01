import { DataResponse, PaginationParams } from "app/model/PayloadResponse";
import { MovieModel } from "app/model/movie";
import { call, debounce, delay, put, takeLatest } from "redux-saga/effects";
import { movieActions, MovieSearchParams } from "./movieSlice";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { movieApi } from "app/api/movie";
import { message } from "antd";

function* fetchMovieList() {
	try {
		const response: DataResponse<MovieModel[]> = yield call(
			movieApi.getAll
		);
		yield put(movieActions.fetchMovieListSuccess(response));
	} catch (error) {
		console.log("Failed to fetch city list", error);
		yield put(movieActions.fetchMovieListFailed());
	}
}
function* deleteMovie(action: PayloadAction<string>) {
	try {
		const response: DataResponse<MovieModel[]> = yield call(
			movieApi.delete,
			action.payload
		);
		message.success("Xóa thành công");
		yield put(movieActions.deleteMovieSuccess(action.payload));
	} catch (error) {
		console.log("Failed to fetch city list", error);
		message.error(" Xóa thất bại");
		yield put(movieActions.deleteMovieFaield());
	}
}
function* fetchMovieListFromTheMovieDB(
	action: PayloadAction<MovieSearchParams>,
) {
	let response: DataResponse<MovieModel[]>;
	try {
		console.log("action payload ne ",action.payload);
		if (action.payload.query !== undefined) {
			response = yield call(
				theMovieDBApi.movie.searchByName,
				action.payload,
			);
		} else {
			response = yield call(theMovieDBApi.movie.get, action.payload);
		}

		yield put(movieActions.fetchMovieListFromTheMovieDBSuccess(response));
	} catch (error) {
		console.log("Failed to fetch city list", error);
		yield put(movieActions.fetchMovieListFromTheMovieDBFailed());
	}
}
function* searchMovieFromTheMovieDB(action: PayloadAction<string>) {
	yield put(
		push(`${APP_ROUTE.ADMIN}`),
	);
}

export default function* movieSaga() {
	// yield takeLatest(movieActions.fetchMovieList, fetchMovieList);
	yield takeLatest(
		movieActions.fetchMovieListFromTheMovieDB,
		fetchMovieListFromTheMovieDB,
	);
	yield takeLatest(
		movieActions.deleteMovie,
		deleteMovie,
	);
	yield takeLatest(
		movieActions.fetchMovieList,
		fetchMovieList,
	);
	yield debounce(
		500,
		movieActions.searchMovieFromTheMovieDBByName,
		searchMovieFromTheMovieDB,
	);
}
