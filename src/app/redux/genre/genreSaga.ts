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

export default function* genreSaga() {
	yield takeLatest(genreActions.fetchGenreListFromTheMovieDB, fetchGenreListFromTheMovieDB);
	yield takeLatest(genreActions.fetchGenreList, fetchGenreList);
}
