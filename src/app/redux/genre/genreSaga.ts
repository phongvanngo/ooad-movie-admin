import { genreApi } from "app/api/genres";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { TheMovieDB_GenrePayload } from "app/api/theMovieDBApi/genre";
import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
import { call, put, takeLatest,delay } from "redux-saga/effects";
import { genreActions } from "./genreSlice";

function* fetchGenreList() {
	try {
		yield delay(1000);
		const response: DataResponse<Genre[]> = yield call(
			genreApi.getAll,
		);
		yield put(genreActions.fetchGenreListSuccess(response));
	} catch (error) {
		console.log("Failed to fetch student list", error);
		yield put(genreActions.fetchGenreListFailed());
	}
}
function* fetchGenreListFromTheMovieDB() {
	try {
		yield delay(1000);
		const response: TheMovieDB_GenrePayload = yield call(
			theMovieDBApi.genre.getAll,
		);
		const result : DataResponse<Genre[]> = {data:response.genres}; 
		yield put(genreActions.fetchGenreListFromTheMovieDBSuccess(result));
	} catch (error) {
		console.log("Failed to fetch student list", error);
		yield put(genreActions.fetchGenreListFromTheMovieDBFailed());
	}
}
function* fetchAllGenreList() {
	try {
		const genre1: DataResponse<Genre[]> = yield call (genreApi.getAll);
		const genre2: TheMovieDB_GenrePayload = yield call(
			theMovieDBApi.genre.getAll,
		);
		const result : DataResponse<Genre[]> = {data:[...genre1.data, ...genre2.genres]}; 
		yield put(genreActions.fetchAllGenreListSuccess(result));
	} catch (error) {
		console.log("Failed to fetch genre list", error);
		yield put(genreActions.fetchAllGenreListFailed());
	}
}

export default function* genreSaga() {
	yield takeLatest(genreActions.fetchGenreListFromTheMovieDB, fetchGenreListFromTheMovieDB);
	yield takeLatest(genreActions.fetchGenreList, fetchGenreList);
	yield takeLatest(genreActions.fetchAllGenreList, fetchAllGenreList);
}
