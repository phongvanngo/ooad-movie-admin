import {theMovieDBApi} from "app/api/theMovieDBApi/movie";
import { DataResponse } from "app/model/PayloadResponse";
import { MovieModel } from "app/model/movie";
import { call, put, takeLatest } from "redux-saga/effects";
import { movieActions } from "./movieSlice";

function* fetchMovieList() {
	try {
		const response: DataResponse<MovieModel[]> = yield call(
			theMovieDBApi.get,
		);
		yield put(movieActions.fetchMovieListSuccess(response));
	} catch (error) {
		console.log("Failed to fetch city list", error);
		yield put(movieActions.fetchMovieListFailed());
	}
}

export default function* movieSaga() {
	yield takeLatest(movieActions.fetchMovieList.type, fetchMovieList);
}
