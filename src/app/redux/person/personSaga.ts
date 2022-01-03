import { DataResponse, PaginationParams } from "app/model/PayloadResponse";
import { Person } from "app/model/person";
import { call, debounce, delay, put, takeLatest } from "redux-saga/effects";
import { personActions, PersonSearchParams } from "./personSlice";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { message } from "antd";



function* fetchPersonListFromThePersonDB(
	action: PayloadAction<PersonSearchParams>,
) {
	let response: DataResponse<Person[]>;
	try {
		response = yield call(theMovieDBApi.person.getPersonPopular);

		yield put(personActions.fetchPersonListFromThePersonDBSuccess(response));
	} catch (error) {

		yield put(personActions.fetchPersonListFromThePersonDBFailed());
	}
}
function* searchPersonFromThePersonDB(action: PayloadAction<string>) {
	yield put(
		push(`${APP_ROUTE.ADMIN}`),
	);
}

export default function* personSaga() {
	// yield takeLatest(personActions.fetchPersonList, fetchPersonList);
	yield takeLatest(
		personActions.fetchPersonListFromThePersonDB,
		fetchPersonListFromThePersonDB,
	);
	yield debounce(
		500,
		personActions.searchPersonFromThePersonDBByName,
		searchPersonFromThePersonDB,
	);
}
