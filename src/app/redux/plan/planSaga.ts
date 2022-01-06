import { PayloadAction } from "@reduxjs/toolkit";
import { planApi } from "app/api/plan";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { Plan } from "app/model/plan";
import { DataResponse } from "app/model/PayloadResponse";
import { call, put, takeLatest,delay } from "redux-saga/effects";
import { planActions } from "./planSlice";


function* fetchPlanList() {
	try {
		const response: DataResponse<Plan[]> = yield call(
			planApi.getAll,
		);
		yield put(planActions.fetchPlanListSuccess(response));
	} catch (error) {
		
		yield put(planActions.fetchPlanListFailed());
	}
}
function* deletePlan(action:PayloadAction<string>) {
	try {
		const response = yield call(
			planApi.delete,
			action.payload
		);
		yield put(planActions.deletePlanSuccess(action.payload));
	} catch (error) {
		yield put(planActions.deletePlanFailed());
	}
}



export default function* planSaga() {
	yield takeLatest(planActions.fetchPlanList, fetchPlanList);
	yield takeLatest(planActions.deletePlan, deletePlan);
}
