import { genreApi } from "app/api/genres";
import { Genre } from "app/model/genre";
import { DataResponse } from "app/model/PayloadResponse";
import { call, put, takeLatest } from "redux-saga/effects";
import { genreActions } from "./genreSlice";

function* fetchGenreList() {
	try {
		const response: DataResponse<Genre[]> = yield call(
			genreApi.getAll,
		);
		yield put(genreActions.fetchGenreListSuccess(response));
	} catch (error) {
		console.log("Failed to fetch student list", error);
		yield put(genreActions.fetchGenreListFailed());
	}
}

export default function* genreSaga() {
	yield takeLatest(genreActions.fetchGenreList, fetchGenreList);
}
