import { PayloadAction } from "@reduxjs/toolkit";
import { orderApi } from "app/api/order";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { Order } from "app/model/order";
import { DataResponse } from "app/model/PayloadResponse";
import { call, put, takeLatest,delay } from "redux-saga/effects";
import { orderActions } from "./orderSlice";

function* fetchOrderList() {
	try {
		const response: DataResponse<Order[]> = yield call(
			orderApi.getAll,
		);
		yield put(orderActions.fetchOrderListSuccess(response));
	} catch (error) {
		
		yield put(orderActions.fetchOrderListFailed());
	}
}
function* deleteOrder(action:PayloadAction<string>) {
	try {
		const response = yield call(
			orderApi.delete,
			action.payload
		);
		yield put(orderActions.deleteOrderSuccess(action.payload));
	} catch (error) {
		yield put(orderActions.deleteOrderFailed());
	}
}


export default function* orderSaga() {
	yield takeLatest(orderActions.fetchOrderList, fetchOrderList);
	yield takeLatest(orderActions.deleteOrder, deleteOrder);
}
