import { PayloadAction } from "@reduxjs/toolkit";
import { commentApi } from "app/api/comment";
import { theMovieDBApi } from "app/api/theMovieDBApi";
import { CommentModel, GetCommentParameters } from "app/model/comment";
import { DataResponse } from "app/model/PayloadResponse";
import { call, put, takeLatest,delay } from "redux-saga/effects";
import { commentActions } from "./commentSlice";

function* fetchCommentList(action: PayloadAction<GetCommentParameters>) {
	try {
		const response: DataResponse<CommentModel[]> = yield call(
			commentApi.getAll,
			action.payload
		);
		yield put(commentActions.fetchCommentListSuccess(response));
	} catch (error) {
		
		yield put(commentActions.fetchCommentListFailed());
	}
}
function* deleteComment(action:PayloadAction<string>) {
	try {
		const response = yield call(
			commentApi.delete,
			action.payload
		);
		yield put(commentActions.deleteCommentSuccess(action.payload));
	} catch (error) {
		yield put(commentActions.deleteCommentFailed());
	}
}
function* updateComment(action: PayloadAction<Partial<CommentModel>>) {
	try {
		const response = yield call(
			commentApi.update,
			action.payload
		);
		yield put(commentActions.updateCommentSuccess(action.payload));
	} catch (error) {
		yield put(commentActions.updateCommentFailed());
	}
}


export default function* commentSaga() {
	yield takeLatest(commentActions.fetchCommentList, fetchCommentList);
	yield takeLatest(commentActions.deleteComment, deleteComment);
	yield takeLatest(commentActions.updateComment, updateComment);
}
