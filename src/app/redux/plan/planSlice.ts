import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { message } from "antd";
import { Plan } from "app/model/plan";
import { DataResponse } from "app/model/PayloadResponse";
import { AppRootState } from "../store";

export interface PlanState {
	loading: boolean;
	list: Plan[];
	editingPlan: Plan;
}

const initialState: PlanState = {
	loading: false,
	list: [],
	editingPlan: null,
};

const planSlice = createSlice({
	name: "plan",
	initialState,
	reducers: {
		setEditingPlan(state, action: PayloadAction<Plan>) {
			state.editingPlan = action.payload;
		},
		fetchPlanList(state) {
			state.loading = true;
		},
		fetchPlanListSuccess(
			state,
			action: PayloadAction<DataResponse<Plan[]>>,
		) {
			state.list = action.payload.data.reverse();
			state.loading = false;
		},
		fetchPlanListFailed(state) {
			state.loading = false;
		},
		fetchAllPlanList(state) {
			// fetch gerne from thinh movie and the movid db
			state.loading = true;
		},
		fetchAllPlanListSuccess(
			state,
			action: PayloadAction<DataResponse<Plan[]>>,
		) {
			state.list = action.payload.data;
			state.loading = false;
		},
		fetchAllPlanListFailed(state) {
			state.loading = false;
		},
		fetchPlanListFromTheMovieDB(state) {
			state.loading = true;
		},
		fetchPlanListFromTheMovieDBSuccess(state, action: PayloadAction<DataResponse<Plan[]>>) {
			state.list = [...state.list, ...action.payload.data];
			state.loading = false;
		},
		fetchPlanListFromTheMovieDBFailed(state) {
			state.loading = true;
		},
		deletePlan(state, action: PayloadAction<string>) {
			state.loading = true;
		},
		deletePlanSuccess(state, action: PayloadAction<string>) {
			state.loading = false;
			console.log(action.payload);
			state.list = state.list.filter(plan => plan.id !== action.payload);
			message.success("Delete Plan Successfully");
		},
		deletePlanFailed(state) {
			state.loading = false;
			message.error("Delete Plan Failed");
		}


	},
});

// Actions
export const planActions = planSlice.actions;

// Selectors
export const selectPlanList = (state: AppRootState) => state.rootReducer.plan.list;
export const selectPlanLoading = (state: AppRootState) => state.rootReducer.plan.loading;
export const selectEditingPlan = (state: AppRootState) => state.rootReducer.plan.editingPlan;

// Reducer
const planReducer = planSlice.reducer;
export default planReducer;
