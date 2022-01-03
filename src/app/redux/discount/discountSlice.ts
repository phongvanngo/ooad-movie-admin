import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { Discount } from "app/model/discount";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface DiscountState {
	loading: boolean;
	list: Discount[];
	editingDiscount: Discount;
}

const initialState: DiscountState = {
	loading: false,
	list: [],
	editingDiscount: null,
};

const discountSlice = createSlice({
	name: "discount",
	initialState,
	reducers: {
		setEditingDiscount(state, action: PayloadAction<Discount>) {
			state.editingDiscount = action.payload;
		},
		fetchDiscountList(state) {
			state.loading = true;
		},
		fetchDiscountListSuccess(
			state,
			action: PayloadAction<DataResponse<Discount[]>>,
		) {
			state.list = action.payload.data.reverse();
			state.loading = false;
		},
		fetchDiscountListFailed(state) {
			state.loading = false;
		},
		fetchAllDiscountList(state) {
			// fetch gerne from thinh movie and the movid db
			state.loading = true;
		},
		fetchAllDiscountListSuccess(
			state,
			action: PayloadAction<DataResponse<Discount[]>>,
		) {
			state.list = action.payload.data;
			state.loading = false;
		},
		fetchAllDiscountListFailed(state) {
			state.loading = false;
		},
		deleteDiscount(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deleteDiscountSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			console.log(action.payload);
			state.list = state.list.filter(discount => discount.id !== action.payload);
			message.success("Delete Discount Successfully");
		},
		deleteDiscountFailed(state) {
			state.loading = false;
			message.error("Delete Discount Failed");
		}


	},
});

// Actions
export const discountActions = discountSlice.actions;

// Selectors
export const selectDiscountList = (state: AppRootState) => state.rootReducer.discount.list;
export const selectDiscountLoading = (state: AppRootState) => state.rootReducer.discount.loading;
export const selectEditingDiscount = (state: AppRootState) => state.rootReducer.discount.editingDiscount;

// Reducer
const discountReducer = discountSlice.reducer;
export default discountReducer;
