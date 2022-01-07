import { PayloadAction } from "@reduxjs/toolkit";
import { userApi } from "app/api/user";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { User } from "app/model/User";
import { DataResponse } from "app/model/PayloadResponse";
import { call, put, takeLatest,delay } from "redux-saga/effects";
import { userActions } from "./userSlice";

function* fetchUserList() {
	try {
		const response: DataResponse<User[]> = yield call(
			userApi.getAll,
		);
		yield put(userActions.fetchUserListSuccess(response));
	} catch (error) {
		
		yield put(userActions.fetchUserListFailed());
	}
}
function* deleteUser(action:PayloadAction<string>) {
	try {
		const response = yield call(
			userApi.delete,
			action.payload
		);
		yield put(userActions.deleteUserSuccess(action.payload));
	} catch (error) {
		yield put(userActions.deleteUserFailed());
	}
}


export default function* userSaga() {
	yield takeLatest(userActions.fetchUserList, fetchUserList);
	yield takeLatest(userActions.deleteUser, deleteUser);
}
