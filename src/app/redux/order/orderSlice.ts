import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { Order } from "app/model/order";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface OrderState {
	loading: boolean;
	list: Order[];
	editingOrder: Order;
}

const initialState: OrderState = {
	loading: false,
	list: [],
	editingOrder: null,
};

const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		setEditingOrder(state, action: PayloadAction<Order>) {
			state.editingOrder = action.payload;
		},
		fetchOrderList(state) {
			state.loading = true;
		},
		fetchOrderListSuccess(
			state,
			action: PayloadAction<DataResponse<Order[]>>,
		) {
			state.list = action.payload.data.reverse();
			state.loading = false;
		},
		fetchOrderListFailed(state) {
			state.loading = false;
		},
		fetchAllOrderList(state) {
			// fetch gerne from thinh movie and the movid db
			state.loading = true;
		},
		fetchAllOrderListSuccess(
			state,
			action: PayloadAction<DataResponse<Order[]>>,
		) {
			state.list = action.payload.data;
			state.loading = false;
		},
		fetchAllOrderListFailed(state) {
			state.loading = false;
		},
		deleteOrder(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deleteOrderSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			console.log(action.payload);
			state.list = state.list.filter(order => order.id !== action.payload);
			message.success("Delete Order Successfully");
		},
		deleteOrderFailed(state) {
			state.loading = false;
			message.error("Delete Order Failed");
		}


	},
});

// Actions
export const orderActions = orderSlice.actions;

// Selectors
export const selectOrderList = (state: AppRootState) => state.rootReducer.order.list;
export const selectOrderLoading = (state: AppRootState) => state.rootReducer.order.loading;
export const selectEditingOrder = (state: AppRootState) => state.rootReducer.order.editingOrder;

// Reducer
const orderReducer = orderSlice.reducer;
export default orderReducer;
