import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "@redux-saga/core";

import rootReducer from "./reducers";
import rootSaga from "./rootSaga";
import { history } from "app/utils/history";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
	reducer: {
		rootReducer,
		router: connectRouter(history),
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			sagaMiddleware,
			routerMiddleware(history),
		),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type AppRootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppRootState,
    unknown,
    Action<string>
>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector;

export default store;
