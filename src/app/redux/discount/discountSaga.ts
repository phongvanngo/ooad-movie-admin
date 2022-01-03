import { PayloadAction } from "@reduxjs/toolkit";
import { discountApi } from "app/api/discount";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { Discount } from "app/model/discount";
import { DataResponse } from "app/model/PayloadResponse";
import { call, put, takeLatest,delay } from "redux-saga/effects";
import { discountActions } from "./discountSlice";

function* fetchDiscountList() {
	try {
		const response: DataResponse<Discount[]> = yield call(
			discountApi.getAll,
		);
		yield put(discountActions.fetchDiscountListSuccess(response));
	} catch (error) {
		
		yield put(discountActions.fetchDiscountListFailed());
	}
}
function* deleteDiscount(action:PayloadAction<string>) {
	try {
		const response = yield call(
			discountApi.delete,
			action.payload
		);
		yield put(discountActions.deleteDiscountSuccess(action.payload));
	} catch (error) {
		yield put(discountActions.deleteDiscountFailed());
	}
}


export default function* discountSaga() {
	yield takeLatest(discountActions.fetchDiscountList, fetchDiscountList);
	yield takeLatest(discountActions.deleteDiscount, deleteDiscount);
}
