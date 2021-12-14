
import { DataResponse } from "app/model/PayloadResponse";
import { MovieModel } from "app/model/movie";
import { call, put, takeLatest } from "redux-saga/effects";
import { movieActions } from "./movieSlice";
import { theMovieDBApi } from "app/api/theMovieDBApi";

function* fetchMovieList() {
	try {
		const response: DataResponse<MovieModel[]> = yield call(
			theMovieDBApi.movie.get
		);
		yield put(movieActions.fetchMovieListSuccess(response));
	} catch (error) {
		console.log("Failed to fetch city list", error);
		yield put(movieActions.fetchMovieListFailed());
	}
}
function* fetchMovieListFromTheMovieDB() {
	try {
		const response: DataResponse<MovieModel[]> = yield call(
			theMovieDBApi.movie.get
		);
		console.log("response movie list",response);
		yield put(movieActions.fetchMovieListFromTheMovieDBSuccess(response));
	} catch (error) {
		console.log("Failed to fetch city list", error);
		yield put(movieActions.fetchMovieListFromTheMovieDBFailed());
	}
}

export default function* movieSaga() {
	console.log("helloo nmovie saga");
	yield takeLatest(movieActions.fetchMovieList, fetchMovieList);
	yield takeLatest(movieActions.fetchMovieListFromTheMovieDB, fetchMovieListFromTheMovieDB);
}
