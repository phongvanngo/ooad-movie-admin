import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { CommentModel, GetCommentParameters } from "app/model/comment";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface CommentState {
	loading: boolean;
	list: CommentModel[];
	editingComment: CommentModel;
	updatingLoading:boolean;
}

const initialState: CommentState = {
	loading: false,
	list: [],
	editingComment: null,
	updatingLoading:false
};

const commentSlice = createSlice({
	name: "comment",
	initialState,
	reducers: {
		setEditingComment(state, action: PayloadAction<CommentModel>) {
			state.editingComment = action.payload;
		},
		fetchCommentList(state,action:PayloadAction<GetCommentParameters>) {
			state.list=[];
			state.loading = true;
		},
		fetchCommentListSuccess(
			state,
			action: PayloadAction<DataResponse<CommentModel[]>>,
		) {
			state.list = action.payload.data.reverse();
			state.loading = false;
		},
		fetchCommentListFailed(state) {
			state.loading = false;
		},
		fetchAllCommentList(state) {
			// fetch gerne from thinh movie and the movid db
			state.loading = true;
		},
		fetchAllCommentListSuccess(
			state,
			action: PayloadAction<DataResponse<CommentModel[]>>,
		) {
			state.list = action.payload.data;
			state.loading = false;
		},
		fetchAllCommentListFailed(state) {
			state.loading = false;
		},
		deleteComment(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deleteCommentSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			console.log(action.payload);
			state.list = state.list.filter(comment => comment.id !== action.payload);
			message.success("Delete CommentModel Successfully");
		},
		deleteCommentFailed(state) {
			state.loading = false;
			message.error("Delete CommentModel Failed");
		},
		updateComment(state, action: PayloadAction<Partial<CommentModel>>) {
			state.updatingLoading = true;
		},
		updateCommentSuccess(state, action: PayloadAction<Partial<CommentModel>>) {
			state.updatingLoading = false;
			console.log(action.payload);
			state.list = state.list.filter(comment => comment.id !== action.payload.id);
			message.success("Update Comment Successfully");
		},
		updateCommentFailed(state) {
			state.updatingLoading = false;
			message.error("Update Comment Failed");
		},
		

	},
});

// Actions
export const commentActions = commentSlice.actions;

// Selectors
export const selectCommentList = (state: AppRootState) => state.rootReducer.comment.list;
export const selectCommentLoading = (state: AppRootState) => state.rootReducer.comment.loading;
export const selectUpdatingLoading = (state: AppRootState) => state.rootReducer.comment.updatingLoading;
export const selectEditingComment = (state: AppRootState) => state.rootReducer.comment.editingComment;

// Reducer
const commentReducer = commentSlice.reducer;
export default commentReducer;
